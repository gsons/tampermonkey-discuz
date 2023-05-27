<script setup lang="ts">
import Item, { type ArticleDto } from "./Item.vue";
import { ref, onMounted, onUpdated, nextTick } from "vue";
import IconLoading from "../icons/IconLoading.vue";
import Discuz from '../lib/Discuz'
import Img from '../lib/Img'
import { unsafeWindow } from "$";

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

async function load_article_img(vo: ItemDto) {
  const img = await Img.load(vo.image_link);
  vo.loaded = img ? true : false;
  vo.img_rate=img?img.width/img.height :1;
  vo.pre_image_link = vo.loaded ? vo.image_link : img_404_link;
  return vo;
}

async function load_more(page: number, cid: number) {
  if (is_loading_data.value||is_loading_img.value) {
    return false;
  } else {
    page_num.value = page;
    is_loading_data.value = true;
    is_loading_img.value = true;
  }
  console.log('load page start', { cid, page });
  const loading_img=await Img.load(loading_img_link) as HTMLImageElement;
  let list = await get_data(page, cid);
  let arr: Array<ItemDto> = list.map((vo) => {
    const rate=loading_img.width/loading_img.height;
    return {
      image_link: vo.image_link,
      img_rate:rate,
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
    load_article_img(arr[i]).then(async (vo) => {
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
  console.log('load page finished', { cid, page });
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
    // await nextTick();
    const dom = document.getElementById(`vo-item-img-${i}`) as HTMLDivElement;
    const _height=(item_width/vo.img_rate) +dom.getBoundingClientRect().height+ offset;
    h_arr[h_i] += _height;
    //h_arr[h_i] += dom.getBoundingClientRect().height + offset;
    //if(!is_try)console.log({index:i,height:_height});
    i++;
  }
  if (is_try) h_arr = last_h_arr;
}

async function get_data(page: number, cid: number): Promise<Array<ArticleDto>> {
  let res = await Discuz.getListByCate(page, cid);
  console.log(res);
  return res;
}

onMounted(async () => {
  await Img.load(loading_img_link);
  await Img.load(img_404_link);
  init_water();
  await load_more(page_num.value, Discuz.cid);
});

unsafeWindow.addEventListener('hashchange', async () => {
  let res = /#(\d+)/.exec(location.hash);
  if (res && res[1]) {
    Discuz.cid = +res[1];
  }
  init_water();
  page_num.value = 1;
  item_list.value = [];
  await load_more(page_num.value, Discuz.cid);
})

unsafeWindow.onscroll = async () => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let windowHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  let scrollHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight;
  // console.log({scrollTop,windowHeight,scrollHeight});  
  if (scrollTop + windowHeight+15 >= scrollHeight) {
    await load_more(page_num.value + 1, Discuz.cid);
  }
};
</script>

<template>
  <div class="list-bar" id="list-bar">
    <Item :width="item.width" :index="index" :img_rate="item.img_rate" :title="item.title" :image_link="item.image_link" :pre_image_link="item.pre_image_link" :href="item.href"
      class="li" v-bind:key="index" v-for="(item, index) in item_list" :id="'vo-item-' + index" :style="{
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