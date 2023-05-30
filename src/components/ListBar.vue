<script setup lang="ts">
import Item, { type ArticleDto } from "./Item.vue";
import { ref, onMounted, onUpdated, nextTick } from "vue";
import IconLoading from "../icons/IconLoading.vue";
import Discuz from '../lib/Discuz'
import Img from '../lib/Img'
import { unsafeWindow } from "$";
import { Logger } from '../lib/Logger';
import { store } from "../lib/Store";

//定义相关
interface Style {
  width: number;
  height?: number;
  left: number;
  top: number;
  position: string;
}
type ItemDto = ArticleDto & Style;

//视图变量
let item_list = ref<Array<ItemDto>>([]);
let is_loading_data = ref(false);
let is_loading_img = ref(false);
let page_num = ref(1);
const loading_img_link = 'https://jsonp.gitee.io/video/img/load.gif';
const img_404_link = 'https://jsonp.gitee.io/video/img/404.png';

//初始化变量
const item_width = window.innerWidth < 550 ? Math.floor((window.innerWidth - 20) / 2) : 250;
let h_arr: Array<number> = [];
const offset = 10;

async function load_article_img(vo: ItemDto, index: number) {
  if (store.route == 'cate') {
    const img = await Img.load(vo.image_link, (is_load, rate) => {
      Logger.log('callback', { is_load }, vo.image_link);
      const dom = document.getElementById(`vo-item-img-${index}`) as HTMLDivElement;
      vo.pre_image_link = is_load ? vo.image_link : Discuz.Img404Link;
      dom.setAttribute('src', vo.pre_image_link);
      dom.style.height = (item_width / rate) + 'px';
      item_list.value[index] = vo;
    });
    vo.loaded = img.status == 200;
    vo.img_rate = img.rate;
    if (img.status == 200) {
      vo.pre_image_link = vo.image_link;
    }
    else if (img.status == 404) {
      vo.pre_image_link = Discuz.Img404Link;
    }
  }
  else if (store.route == 'search') {
    load_search_img(vo,index).then(async (v) => {
      const dom = document.getElementById(`vo-item-img-${index}`) as HTMLDivElement;
      dom.setAttribute('src', v.image_link);
      dom.style.height = (item_width / v.img.rate) + 'px';
      // Logger.warn('搜索页加载图片成功',index,v.image_link);
    }).catch((err) => {
      Logger.error('end','搜索页加载图片失败'+index, JSON.stringify(err));
    })
  }
  return vo;
}

async function load_search_img(vo: ItemDto,index:number) {
  // Logger.log('start',{index,href:vo.href});
  let href = await Discuz.fetchRealUrl(vo.href);
  //Logger.log({href});
  let image_link = await Discuz.getImage(href);
  //Logger.log({image_link});
  const img = await Img.load(image_link);
  // Logger.log('end',index,{href,image_link});
  return {href,image_link,img};
}

async function load_more(page: number) {
  if (is_loading_data.value || is_loading_img.value) {
    return false;
  } else {
    page_num.value = page;
    is_loading_data.value = true;
    is_loading_img.value = true;
  }
  Logger.log('load page start', { route: store.route });

  let list: Array<ArticleDto> = [];
  try {
    list = await get_data(page);
  } catch (error) {
    let msg = '加载失败,请检查网络状况:';
    if (error instanceof Error) {
      msg += error.message;
    }
    else if (typeof error === 'string') {
      msg += error;
    }
    else {
      msg += JSON.stringify(error);
    }
    alert(msg);
  }

  Logger.log({ route: store.route, list });

  let arr: Array<ItemDto> = list.map((vo) => {

    return {
      image_link: vo.image_link,
      img_rate: Discuz.ImgLoadRate,
      pre_image_link: loading_img_link,
      title: vo.title,
      href: vo.href,
      position: "absolute",
      left: -item_width * 2,
      top: -item_width * 2,
      width: item_width,
    };
  });
  let index = item_list.value.length;
  let start_item_list = item_list.value;
  item_list.value = [...start_item_list, ...arr];
  is_loading_data.value = false;
  await nextTick();
  await update_list(index, true);

  let load_num = 0;
  for (let i = 0; i < arr.length; i++) {
    load_article_img(arr[i], i + index).then((vo) => {
      item_list.value[i + index] = vo;
      load_num++;
    });
  }
  while (load_num < arr.length) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  await nextTick();
  await update_list(index);
  is_loading_img.value = false;
  Logger.log('load page finished', store.route, { page, load_num });
}

function init_water() {
  const container = document.getElementById("list-bar") as HTMLDivElement;
  container.style.position = "relative";
  const win_width = container.getBoundingClientRect().width;
  const row_count = Math.floor((win_width + offset) / (item_width + offset));
  const inner_w = (row_count - 1) * offset + row_count * item_width;
  container.style.width = inner_w + "px";
  container.style.margin = "0 auto";
  h_arr = Array.from({ length: row_count }, () => 0);
}

async function update_list(index = 0, is_try = false) {
  let last_h_arr = [...h_arr];
  let i = index;
  let lenght = item_list.value.length;
  while (i < lenght) {
    let vo = item_list.value[i];
    const h_i = h_arr.indexOf(Math.min(...h_arr));
    vo.top = h_arr[h_i];
    vo.left = h_i * (offset + item_width);
    const dom = document.getElementById(`vo-item-p-${i}`) as HTMLDivElement;
    const _height = (item_width / vo.img_rate) + dom.getBoundingClientRect().height + offset;
    h_arr[h_i] += _height;
    i++;
  }
  if (is_try) h_arr = last_h_arr;
}

async function get_data(page: number): Promise<Array<ArticleDto>> {
  if (store.route == 'search') {
    Logger.log('serach page', { page, key: store.key });
    let res = await Discuz.search(store.key, page);
    return res;
  } else {
    Logger.log('cate page', { page, cid: store.cid });
    let res = await Discuz.getListByCate(page, store.cid);
    return res;
  }
}

onMounted(async () => {
  init_water();
  await load_more(page_num.value);
});

let win = location.port ? window : unsafeWindow;
win.addEventListener('hashchange', async () => {
  init_water();
  page_num.value = 1;
  item_list.value = [];
  await load_more(page_num.value);
})

win.onscroll = async () => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let windowHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  let scrollHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight;
  // Logger.log({scrollTop,windowHeight,scrollHeight});  
  if (scrollTop + windowHeight + 25 >= scrollHeight) {
    await load_more(page_num.value + 1);
  }
};
</script>

<template>
  <div class="list-bar" id="list-bar">
    <Item :width="item.width" :index="index" :img_rate="item.img_rate" :title="item.title" :image_link="item.image_link"
      :pre_image_link="item.pre_image_link" :href="item.href" class="li" v-bind:key="index"
      v-for="(item, index) in item_list" :id="'vo-item-' + index" :style="{
        width: item.width + 'px',
        height: item.height + 'px',
        left: item.left + 'px',
        top: item.top + 'px',
        position: item.position
      }">
      {{ item.title }}
    </Item>
  </div>
  <IconLoading v-if="is_loading_data"></IconLoading>
</template>

<style lang="scss">
.list-bar {
  top: 50px;
}

@media (max-width: 768px) {
  .list-bar {
    top: 100px;
  }
}
</style>