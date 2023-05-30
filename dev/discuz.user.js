// ==UserScript==
// @name       server:monkey-vue-discuz
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @author     monkey
// @icon       https://vitejs.dev/logo.svg
// @match      https://www.baidu.com/
// @connect    cunhua,click
// @connect    www.cunhua,click
// @require    https://unpkg.com/jquery@2.2.1/dist/jquery.min.js
// @grant      GM.addElement
// @grant      GM.addStyle
// @grant      GM.deleteValue
// @grant      GM.getResourceUrl
// @grant      GM.getValue
// @grant      GM.info
// @grant      GM.listValues
// @grant      GM.notification
// @grant      GM.openInTab
// @grant      GM.registerMenuCommand
// @grant      GM.setClipboard
// @grant      GM.setValue
// @grant      GM.xmlHttpRequest
// @grant      GM_addElement
// @grant      GM_addStyle
// @grant      GM_addValueChangeListener
// @grant      GM_cookie
// @grant      GM_deleteValue
// @grant      GM_download
// @grant      GM_getResourceText
// @grant      GM_getResourceURL
// @grant      GM_getTab
// @grant      GM_getTabs
// @grant      GM_getValue
// @grant      GM_info
// @grant      GM_listValues
// @grant      GM_log
// @grant      GM_notification
// @grant      GM_openInTab
// @grant      GM_registerMenuCommand
// @grant      GM_removeValueChangeListener
// @grant      GM_saveTab
// @grant      GM_setClipboard
// @grant      GM_setValue
// @grant      GM_unregisterMenuCommand
// @grant      GM_webRequest
// @grant      GM_xmlhttpRequest
// @grant      unsafeWindow
// @grant      window.close
// @grant      window.focus
// @grant      window.onurlchange
// @run-at     document-start
// ==/UserScript==

; (({ entrySrc = `` }) => {

  // 移除所有脚本元素
  var scriptTags = document.getElementsByTagName('script');
  for (var i = scriptTags.length - 1; i >= 0; i--) {
    scriptTags[i].parentNode.removeChild(scriptTags[i]);
  }

  // 移除所有样式元素
  var styleTags = document.getElementsByTagName('style');
  for (i = styleTags.length - 1; i >= 0; i--) {
    styleTags[i].parentNode.removeChild(styleTags[i]);
  }

  // 移除所有链接的样式表
  var linkTags = document.getElementsByTagName('link');
  for (i = linkTags.length - 1; i >= 0; i--) {
    var linkTag = linkTags[i];
    if (linkTag.rel === 'stylesheet') {
      linkTag.parentNode.removeChild(linkTag);
    }
  }

  const head =
    `<meta charset="UTF-8">
<link rel="icon" href="/favicon.ico">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>Vite App</title>`;

  document.head.innerHTML = head;
  document.body.innerHTML = '';

  // 获取 body 元素
  var body = document.getElementsByTagName('body')[0];

  // 获取 body 中的所有元素
  var elements = body.getElementsByTagName('*');

  // 移除每个元素的行内样式
  for (i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('style');
  }
  console.clear();

  window.GM;
  const key = `__monkeyWindow-` + new URL(entrySrc).origin;
  document[key] = window;
  console.log(`[vite-plugin-monkey] mount monkeyWindow to document`);
  const entryScript = document.createElement("script");
  entryScript.type = "module";
  entryScript.src = entrySrc;
  document.head.insertBefore(entryScript, document.head.firstChild);
  console.log(`[vite-plugin-monkey] mount entry module to document.head`);
})(...[
  {
    "entrySrc": "http://127.0.0.1:5173/__vite-plugin-monkey.entry.js"
  }
]);

