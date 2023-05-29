<script setup lang="ts">
import { store } from "../lib/Store";
</script>

<template>
  <div class="left-bar">
    <div class="logo">
      <img alt="Vue logo" class="logo" src="https://www.cunhua.click/template/bygsjw/image/logo.png" />
    </div>
    <div class="bar" :style="{ transform: 'translateY(' + (store.cate_index >= 0 ? (55 * store.cate_index) : -1000) + 'px)' }">
    </div>
    <div class="cate">
      <a :href="'#id=' + vo.id"  class="item" v-bind:key="index" v-for="(vo, index) in store.cate_list" :class="{ active: vo.active }">
        {{ vo.name }}
      </a>
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

  .logo {
    position: absolute;
    top: 5px;
    left: 5px;

    img {
      height: 40px;
    }
  }

  .bar {
    width: 2px;
    height: 14px;
    margin-left: 20px;
    margin-top: 4px;
    background-color: #fd8d29;
    transition: transform .1s;
  }

  .cate {
    flex: 1;
    display: flex;
    flex-direction: column;
    cursor: pointer;

    a.item {
      display: block;
      text-decoration: none;
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
