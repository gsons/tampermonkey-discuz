import { createApp } from 'vue';
import './assets/main.css';
import App from './App.vue';
import { Logger } from './lib/Logger';
import config from './config';

function initHead() {
  let metaElements = document.getElementsByTagName('meta');
  for (let i = metaElements.length - 1; i >= 0; i--) {
    let metaElement = metaElements[i];
    metaElement.parentNode?.removeChild(metaElement);
  }

  let charsetMeta = document.createElement('meta');
  charsetMeta.setAttribute('charset', 'UTF-8');
  document.head.appendChild(charsetMeta);

  let viewportMeta = document.createElement('meta');
  viewportMeta.setAttribute('name', 'viewport');
  viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
  document.head.appendChild(viewportMeta);

  document.title = config.app_name;
  document.body.innerHTML = '';
}

Logger.config({ debug: config.debug });

initHead();

createApp(App).mount(
  (() => {
    const app = document.createElement('div');
    app.id = 'app'
    document.body.append(app);
    return app;
  })(),
);
