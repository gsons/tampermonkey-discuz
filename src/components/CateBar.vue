<script setup lang="ts">
import { store } from "../lib/Store";

</script>


<template>
  <div class="cate-bar">
    <a :href="'#id=' + vo.id"  class="cate" v-bind:key="index" v-for="(vo, index) in store.cate_list"
      :class="{ active: vo.active }">
      <span>
        {{ vo.name }}
      </span>
    </a>
  </div>
</template>

<style scoped lang="scss">
.cate-bar {
  width: 100%;
  height: 50px;
  position: fixed;
  display: flex;
  align-items: end;
  padding-left: 20px;
  background: #3a3c40;
  z-index: 999;

  a.cate {
    display: block;
  text-decoration: none;
    margin: 10px;
    color: #FFF;
    font-size: 14px;

    span {
      padding-bottom: 6px;
    }

    &.active span {
      border-bottom: 2px solid #fd8d29;
      ;
      color: #fd8d29;
      ;
    }
  }
}
</style>
