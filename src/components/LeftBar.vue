<script setup lang="ts">
import { ref } from "vue";
import Discuz from "../lib/Discuz";

interface Cate {
  name: string;
  id: number;
  active: boolean;
}

let cate_list = ref<Array<Cate>>([]);
let cate_index = ref(1);

let list=Discuz.getCateList();

list.forEach((vo,index)=>{
   if(vo.active) cate_index.value=index;
});

cate_list.value=list;

async function initCate(id: number, index: number) {
  cate_index.value = index;
  cate_list.value = cate_list.value.map((vo) => {
    return { ...vo, ...{ active: id == vo.id } };
  });
  Discuz.key='';
  location.hash=`id=${id}`;
}
</script>

<template>

  <div class="left-bar">
    <div class="logo">
      <img alt="Vue logo" class="logo" src="https://www.cunhua.click/template/bygsjw/image/logo.png" />
  </div>
    <div
      class="bar"
      :style="{ transform: 'translateY(' + 55 * cate_index + 'px)' }"
    ></div>
    <div class="cate">
      <div
        class="item"
        v-bind:key="index"
        v-for="(vo, index) in cate_list"
        :class="{ active: vo.active }"
        @click="initCate(vo.id, index)"
      >
        {{ vo.name }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.left-bar {
  width: 125px;
  height: 100vh;
  display: flex;
  background-color: #191919;
  position: relative;
  padding-top: 100px;
  .logo{
    position:absolute;
    top:5px;
    left:5px;
    img{
      height: 40px;
    }
  }
  .bar {
    width: 2px;
    height: 14px;
    margin-left: 20px;
    margin-top: 4px;
    background-color: #fd8d29;
    transition:transform .1s;
  }

  .cate {
    flex: 1;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    .item {
      height: 55px;
      color: #fff;
      font-size: 14px;
      margin-left: 10px;
      &.active {
        color: #fd8d29;
      }
    }
  }
}
</style>
