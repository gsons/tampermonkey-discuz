import { createApp } from 'vue';
import './assets/main.css';
import App from './App.vue';

document.body.innerHTML = '';

createApp(App).mount(
  (() => {
    const app = document.createElement('div');
    app.id = 'app'
    document.body.append(app);
    return app;
  })(),
);
