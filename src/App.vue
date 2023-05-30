<script setup lang="ts">
import LeftBar from "./components/LeftBar.vue";
import TopBar from "./components/TopBar.vue";
import CateBar from "./components/CateBar.vue";
import ListBar from "./components/ListBar.vue";
import { unsafeWindow } from "$";
import { store } from "./lib/Store";
import { onBeforeMount, onMounted, ref } from "vue";
import Discuz from "./lib/Discuz";


let port = ref(location.port ? true : false);
let win = port.value ? window : unsafeWindow;

win.addEventListener('hashchange', async () => {
  store.initCate();
})

onBeforeMount(() => {
  store.initCate();
});

onMounted(async () => {
  await Discuz.init();
});

</script>

<template>
  <div class="container" :style="{ opacity: port ? 0.2 : 1 }">
    <LeftBar class="left"></LeftBar>
    <div class="right">
      <TopBar></TopBar>
      <CateBar class="cate-bar"></CateBar>
      <ListBar></ListBar>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;

  .left {
    width: 125px;
    position: fixed;
    z-index: 9999;
    left: 0;
  }

  .right {
    width: 100%;
    padding-left: 125px;

    .cate-bar {
      display: none;
    }
  }
}

@media (max-width: 768px) {
  .container {
    .left {
      display: none;
    }

    .right {
      padding-left: 0px;

      .cate-bar {
        display: flex;
        top: 50px
      }
    }
  }
}
</style>

