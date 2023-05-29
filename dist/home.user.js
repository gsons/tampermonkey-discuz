// ==UserScript==
// @name         server:论坛tampermonkey-home
// @namespace    npm/vite-plugin-monkey
// @version      3.03
// @author       gsonhub
// @description  论坛tampermonkey版本
// @icon         https://vitejs.dev/logo.svg
// @match        https://jsonp.gitee.io/404.html*
// @match        http://192.168.88.3:5173/dist/index.html*
// @match        https://192.168.88.3/*
// @match        http://192.168.101.188:5173/dist/index.html*
// @match        https://192.168.101.188/*
// @connect      cunhua.click
// @connect      www.cunhua.click
// @grant        GM.addElement
// @grant        GM.addStyle
// @grant        GM.deleteValue
// @grant        GM.getResourceUrl
// @grant        GM.getValue
// @grant        GM.info
// @grant        GM.listValues
// @grant        GM.notification
// @grant        GM.openInTab
// @grant        GM.registerMenuCommand
// @grant        GM.setClipboard
// @grant        GM.setValue
// @grant        GM.xmlHttpRequest
// @grant        GM_addElement
// @grant        GM_addStyle
// @grant        GM_addValueChangeListener
// @grant        GM_cookie
// @grant        GM_deleteValue
// @grant        GM_download
// @grant        GM_getResourceText
// @grant        GM_getResourceURL
// @grant        GM_getTab
// @grant        GM_getTabs
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_listValues
// @grant        GM_log
// @grant        GM_notification
// @grant        GM_openInTab
// @grant        GM_registerMenuCommand
// @grant        GM_removeValueChangeListener
// @grant        GM_saveTab
// @grant        GM_setClipboard
// @grant        GM_setValue
// @grant        GM_unregisterMenuCommand
// @grant        GM_webRequest
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @grant        window.close
// @grant        window.focus
// @grant        window.onurlchange
// @run-at       document-end
// ==/UserScript==

;(({ entrySrc = `` }) => {
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
      "entrySrc": "http://192.168.101.188:5173/__vite-plugin-monkey.entry.js"
    }
  ]);
  
  