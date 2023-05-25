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
        icon: 'https://vitejs.dev/logo.svg',
        require:'https://unpkg.com/jquery@2.2.1/dist/jquery.min.js',
        "run-at":'document-start',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.baidu.com/','https://10010.json'],
        connect:['cunhua.click','www.cunhua.click']
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
  server:{
    host:'0.0.0.0'
  }
});
