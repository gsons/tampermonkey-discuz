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
}

</script>


<template>
  <div class="cate-bar">
    <div
        class="cate"
        v-bind:key="index"
        v-for="(vo, index) in cate_list"
        :class="{ active: vo.active }"
        @click="initCate(vo.id, index)"
      >
       <span>
        {{ vo.name }}
       </span>
      </div>
  </div>
</template>

<style scoped lang="scss">
  .cate-bar{
    width: 100%;
    height: 50px;
    position:fixed;
    display: flex;
    align-items: end;
    padding-left: 20px;
    background: #3a3c40;
    z-index: 999;
    .cate{
      margin: 10px;
      color: #FFF;
      font-size: 14px;
      span{
        padding-bottom:6px;
      }
      &.active span{
        border-bottom: 2px solid #fd8d29;;    
        color: #fd8d29;;    
      }
    }
  }
</style>
