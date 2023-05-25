import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

document.head.innerHTML='';
document.body.innerHTML='';

createApp(App).mount(
  (() => {
    const app = document.createElement('div');
    document.body.append(app);
    return app;
  })(),
);
