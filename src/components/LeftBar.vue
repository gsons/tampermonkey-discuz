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

cate_list.value=Discuz.getCateList();

async function initCate(id: number, index: number) {
  cate_index.value = index;
  cate_list.value = cate_list.value.map((vo) => {
    return { ...vo, ...{ active: id == vo.id } };
  });
  location.hash=`${id}`;
}
</script>

<template>
  <div class="left-bar">
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
  padding-top: 50px;
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
