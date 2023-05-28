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
        name:'村花论坛tampermonkey',
        description:'村花论坛tampermonkey版本',
        author:'gsonhub',
        version:'3.02',
        icon: 'https://vitejs.dev/logo.svg',
        "run-at":'document-end',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://jsonp.gitee.io/404.html*'],
        connect:['cunhua.click','www.cunhua.click']
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
          jQuery: cdn.jsdelivr('jQuery','dist/jquery.min.js'),
        },
      },
    }),
  ],
  server:{
    open:false,
  },

});
