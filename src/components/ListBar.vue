<script setup lang="ts">
import Item, { type ArticleDto } from "./Item.vue";
import { ref, onMounted, onUpdated, nextTick } from "vue";
import IconLoading from "../icons/IconLoading.vue";
import Discuz from '../lib/Discuz'

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
let is_loading = ref(false);
let page = ref(1);

//初始化变量
const item_width = window.innerWidth < 550 ? Math.floor((window.innerWidth - 20) / 2) : 250;
let h_arr: Array<number> = [];
const offset = 10;
let last_h_arr = [...h_arr];

function preload_image(image_link: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = image_link;
    let timer = setTimeout(() => {
      resolve(false);
      console.error('load image ' + image_link + ' failed on timeout 3s')
    }, 3000);
    img.onload = async () => {
      clearTimeout(timer);
      resolve(true);
    }
    img.onerror = () => {
      clearTimeout(timer);
      resolve(false);
      console.error('load image ' + image_link + ' failed onerror')
    }
  });
}

async function load_more(page: number) {
  console.log('load page:' + page);
  const loading_img_link = 'https://jsonp.gitee.io/video/img/load.gif';
  await preload_image(loading_img_link);
  is_loading.value = true;
  let list = await get_data(page);
  let arr = list.map((vo) => {
    return {
      image_link: vo.image_link,
      pre_image_link: loading_img_link,
      title: vo.title,
      href: vo.href,
      position: "absolute",
      left: -item_width * 2,
      top: -item_width * 2,
      width: item_width,
    };
  });
  const index = item_list.value.length;
  let start_item_list = item_list.value;
  item_list.value = [...start_item_list, ...arr];
  await update_list(index);
  let new_arr = await Promise.all(arr.map((vo) => load_item_image(vo)));
  item_list.value = [...start_item_list, ...new_arr];
  await update_list(index, true);
  is_loading.value = false;
}

async function load_item_image(vo: ItemDto) {
  let is_load = await preload_image(vo.image_link);
  vo.loaded = is_load;
  vo.pre_image_link = is_load ? vo.image_link : 'https://jsonp.gitee.io/video/img/404.png';
  return vo;
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

async function update_list(index = 0, retry = false) {
  if (retry) {
    h_arr = [...last_h_arr];
  } else {
    last_h_arr = [...h_arr];
  }
  // console.log(retry, h_arr);
  await nextTick();
  let i = index,
    lenght = item_list.value.length;
  while (i < lenght) {
    let vo = item_list.value[i];
    const h_i = h_arr.indexOf(Math.min(...h_arr));
    vo.top = h_arr[h_i];
    vo.left = h_i * (offset + item_width);
    await nextTick();
    await preload_image(vo.image_link);
    const dom = document.getElementById(`vo-item-${i}`) as HTMLDivElement;
    h_arr[h_i] += dom.getBoundingClientRect().height + offset;
    i++;
  }
}

async function get_data(page: number): Promise<Array<ArticleDto>> {
  let res = await Discuz.getList(page);
  return res;
}

onMounted(async () => {
  init_water();
  await load_more(page.value++);
});

window.onscroll = async () => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let windowHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  let scrollHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight;
  if (scrollTop + windowHeight >= scrollHeight) {
    await load_more(page.value++);
  }
};
</script>

<template>
  <div class="list-bar" id="list-bar">
    <Item :title="item.title" :image_link="item.image_link" :pre_image_link="item.pre_image_link" :href="item.href"
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
  <IconLoading v-if="is_loading"></IconLoading>
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