import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn } from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name:'vue3-discuz',
        description:'vue3-discuz',
        version:'0.1',
        icon: 'https://vitejs.dev/logo.svg',
        "run-at":'document-start',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://jsonp.gitee.io/404.html*'],
        connect:['cunhua.click','www.cunhua.click']
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
          jquery: cdn.jsdelivr('jquery','dist/jquery.min.js'),
        },
      },
    }),
  ],
  server:{
    // host:'192.168.88.3',
    open:false,
  },

});
