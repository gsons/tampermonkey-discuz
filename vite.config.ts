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
        name: '论坛tampermonkey',
        description: '论坛tampermonkey版本',
        license:'MIT',
        author: 'gsonhub',
        version: '3.06',
        icon: 'https://vitejs.dev/logo.svg',
        "run-at": 'document-end',
        namespace: 'npm/vite-plugin-monkey',
        match: [
          'https://jsonp.gitee.io/404.html*',
          'http://192.168.88.3:5173/dev/index.html*',
          'http://192.168.101.188:5173/dev/index.html*'
        ],
        connect: ['cunhua.click', 'www.cunhua.click']
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
          jQuery: cdn.jsdelivr('jQuery', 'dist/jquery.min.js'),
        },
      },
    }),
  ],
  //192.168.101.188 192.168.88.3
  server: {
    host: '192.168.88.3',
    open: false,
  },

});
