// ==UserScript==
// @name         vue3-discuz
// @namespace    npm/vite-plugin-monkey
// @version      3.0
// @author       monkey
// @description  vue3-discuz
// @icon         https://vitejs.dev/logo.svg
// @match        https://jsonp.gitee.io/404.html*
// @require      https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.global.prod.js
// @require      https://cdn.jsdelivr.net/npm/jquery@3.7.0/dist/jquery.min.js
// @connect      cunhua.click
// @connect      www.cunhua.click
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

(t=>{const a=document.createElement("style");a.dataset.source="vite-plugin-monkey",a.textContent=t,document.head.append(a)})(' @charset "UTF-8";:root{--vt-c-white: #ffffff;--vt-c-white-soft: #f8f8f8;--vt-c-white-mute: #f2f2f2;--vt-c-black: #181818;--vt-c-black-soft: #222222;--vt-c-black-mute: #282828;--vt-c-indigo: #2c3e50;--vt-c-divider-light-1: rgba(60, 60, 60, .29);--vt-c-divider-light-2: rgba(60, 60, 60, .12);--vt-c-divider-dark-1: rgba(84, 84, 84, .65);--vt-c-divider-dark-2: rgba(84, 84, 84, .48);--vt-c-text-light-1: var(--vt-c-indigo);--vt-c-text-light-2: rgba(60, 60, 60, .66);--vt-c-text-dark-1: var(--vt-c-white);--vt-c-text-dark-2: rgba(235, 235, 235, .64)}:root{--color-background: var(--vt-c-white);--color-background-soft: var(--vt-c-white-soft);--color-background-mute: var(--vt-c-white-mute);--color-border: var(--vt-c-divider-light-2);--color-border-hover: var(--vt-c-divider-light-1);--color-heading: var(--vt-c-text-light-1);--color-text: var(--vt-c-text-light-1);--section-gap: 160px}@media (prefers-color-scheme: dark){:root{--color-background: var(--vt-c-black);--color-background-soft: var(--vt-c-black-soft);--color-background-mute: var(--vt-c-black-mute);--color-border: var(--vt-c-divider-dark-2);--color-border-hover: var(--vt-c-divider-dark-1);--color-heading: var(--vt-c-text-dark-1);--color-text: var(--vt-c-text-dark-2)}}*,*:before,*:after{box-sizing:border-box;margin:0;font-weight:400}body{min-height:100vh;color:var(--color-text);background:var(--color-background);transition:color .5s,background-color .5s;line-height:1.6;font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size:15px;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}body{background-color:#3a3c40}#app{margin:0;padding:0;font-weight:400;min-height:100vh}.left-bar[data-v-0af51f5a]{width:125px;height:100vh;display:flex;background-color:#191919;padding-top:50px}.left-bar .bar[data-v-0af51f5a]{width:2px;height:14px;margin-left:20px;margin-top:4px;background-color:#fd8d29;transition:transform .1s}.left-bar .cate[data-v-0af51f5a]{flex:1;display:flex;flex-direction:column;cursor:pointer}.left-bar .cate .item[data-v-0af51f5a]{height:55px;color:#fff;font-size:14px;margin-left:10px}.left-bar .cate .item.active[data-v-0af51f5a]{color:#fd8d29}.top-bar[data-v-a00b83b5]{position:fixed;top:0;left:0;z-index:999;width:100%;height:50px;background:#3a3c40;display:flex}.top-bar .logo[data-v-a00b83b5]{flex:1;padding-left:20px}.top-bar .logo img[data-v-a00b83b5]{width:50px;height:50px;display:block;padding:10px}.top-bar .search-bar[data-v-a00b83b5]{width:500px;padding-left:10px}.top-bar .search-bar .bar[data-v-a00b83b5]{width:490px;margin:8px 0;padding-left:17px;border-radius:17px;background-color:#2b2c2f;display:flex}.top-bar .search-bar .bar .input[data-v-a00b83b5]{flex:1}.top-bar .search-bar .bar .input input[data-v-a00b83b5]{width:100%;background-color:#2b2c2f;height:34px;outline:none;border:none;color:#fff}.top-bar .search-bar .bar button[data-v-a00b83b5]{display:flex;justify-content:center;align-items:center;width:100px;height:30px;margin:2px;border:none;font-size:12px;outline:none;border-radius:15px;cursor:pointer;background-color:#4a4b4e;color:#fff}.top-bar .search-bar .bar button[data-v-a00b83b5]:active{background:#3a3c3f}.top-bar .search-bar .bar button .icon[data-v-a00b83b5]{display:inline-block;scale:.6}.top-bar .tool[data-v-a00b83b5]{flex:1;display:flex;flex-direction:row-reverse;align-items:center;margin-right:20px}.top-bar .tool .icon[data-v-a00b83b5]{margin-left:15px;color:#eee;scale:.9}@media (max-width: 768px){.top-bar .search-bar[data-v-a00b83b5]{width:300px}.top-bar .search-bar .bar[data-v-a00b83b5]{width:290px}.top-bar .tool[data-v-a00b83b5]{display:none}}.cate-bar[data-v-77b5ccb8]{width:100%;height:50px;position:fixed;display:flex;align-items:end;padding-left:20px;background:#3a3c40;z-index:999}.cate-bar .cate[data-v-77b5ccb8]{margin:10px;color:#fff;font-size:14px}.cate-bar .cate span[data-v-77b5ccb8]{padding-bottom:6px}.cate-bar .cate.active span[data-v-77b5ccb8]{border-bottom:2px solid #fd8d29;color:#fd8d29}.vo-item{text-decoration:none;display:block;border-radius:5px;overflow:hidden}.vo-item .img img{display:block;width:100%;opacity:1}.vo-item .text p{color:#fff;opacity:1}@keyframes rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.element{animation:rotate 1s linear infinite;color:#fff;position:fixed;bottom:0;left:50%;width:36px;height:36px;z-index:999}.list-bar{top:50px}@media (max-width: 768px){.list-bar{top:100px}}.container[data-v-d7a231c0]{display:flex}.container .left[data-v-d7a231c0]{width:125px;position:fixed;z-index:9999;left:0}.container .right[data-v-d7a231c0]{width:100%;padding-left:125px}.container .right .cate-bar[data-v-d7a231c0]{display:none}@media (max-width: 768px){.container .left[data-v-d7a231c0]{display:none}.container .right[data-v-d7a231c0]{padding-left:0}.container .right .cate-bar[data-v-d7a231c0]{display:flex;top:50px}} ');

(function (vue, jQuery) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  class Response {
    constructor(text) {
      __publicField(this, "str");
      this.str = text;
    }
    json() {
      let arr;
      try {
        if (this.str) {
          arr = JSON.parse(this.str);
        } else {
          throw new Error("数据为空");
        }
      } catch (error) {
        throw new Error("数据格式错误,解析成json失败:" + JSON.stringify(error));
      }
      return arr;
    }
    text() {
      return this.str;
    }
    toString() {
      return "" + this.str;
    }
  }
  class Http {
    static fetch(url, option = {}) {
      return new Promise((resolve, reject) => {
        const { method = "GET", headers = {}, body = "" } = option;
        const requestOptions = {
          method,
          headers,
          data: "",
          url,
          onload: (response) => {
            if (response.status >= 200 && response.status < 400) {
              resolve(new Response(response.responseText));
            } else {
              reject("Http status error:" + response.responseText);
            }
          },
          onerror: (err) => {
            reject("Http response error:" + JSON.stringify(err));
          }
        };
        if (method.toUpperCase() === "POST" || method.toUpperCase() === "PUT") {
          requestOptions.data = body;
        }
        _GM_xmlhttpRequest(requestOptions);
      });
    }
  }
  const _Discuz = class {
    static getCateList() {
      let res = /#(\d+)/.exec(location.hash);
      if (res && res[1]) {
        _Discuz.cid = +res[1];
      }
      let list = [
        {
          name: "国产资源",
          id: 38,
          active: false
        },
        {
          name: "直播资源",
          id: 39,
          active: false
        },
        {
          name: "亚洲无码",
          id: 40,
          active: false
        },
        {
          name: "亚洲有码",
          id: 41,
          active: false
        }
      ];
      list = list.map((vo) => {
        return { ...vo, ...{ active: _Discuz.cid == vo.id } };
      });
      return list;
    }
    static async getListByCate(page = 1, fid = 39) {
      const mobileOpt = { headers: { "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/113.0.0.0" } };
      let htmlString = await Http.fetch(`https://cunhua.click/forum.php?mod=forumdisplay&fid=${fid}&mobile=2&page=${page}`, mobileOpt);
      let html = htmlString.text().replace(/<img([^>]*)>/g, (m, match) => {
        return `<v-img${match}>`;
      });
      const objs = jQuery(html).find(".byg_threadlist_pic .byg_pic_img a").map(function() {
        let img_link = jQuery(this).find("v-img").attr("src") || "";
        img_link = img_link.includes("http") ? img_link : "https://cunhua.click/" + img_link;
        return {
          title: jQuery(this).attr("title") || "",
          href: "https://cunhua.click/" + (jQuery(this).attr("href") || ""),
          image_link: img_link,
          pre_image_link: "",
          img_rate: 1
        };
      }).get();
      return objs;
    }
  };
  let Discuz = _Discuz;
  __publicField(Discuz, "cid", 39);
  const _hoisted_1$a = { class: "left-bar" };
  const _hoisted_2$9 = { class: "cate" };
  const _hoisted_3$6 = ["onClick"];
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
    __name: "LeftBar",
    setup(__props) {
      let cate_list = vue.ref([]);
      let cate_index = vue.ref(1);
      let list = Discuz.getCateList();
      list.forEach((vo, index) => {
        if (vo.active)
          cate_index.value = index;
      });
      cate_list.value = list;
      async function initCate(id, index) {
        cate_index.value = index;
        cate_list.value = cate_list.value.map((vo) => {
          return { ...vo, ...{ active: id == vo.id } };
        });
        location.hash = `${id}`;
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$a, [
          vue.createElementVNode("div", {
            class: "bar",
            style: vue.normalizeStyle({ transform: "translateY(" + 55 * vue.unref(cate_index) + "px)" })
          }, null, 4),
          vue.createElementVNode("div", _hoisted_2$9, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(cate_list), (vo, index) => {
              return vue.openBlock(), vue.createElementBlock("div", {
                class: vue.normalizeClass(["item", { active: vo.active }]),
                key: index,
                onClick: ($event) => initCate(vo.id, index)
              }, vue.toDisplayString(vo.name), 11, _hoisted_3$6);
            }), 128))
          ])
        ]);
      };
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const LeftBar = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-0af51f5a"]]);
  const _sfc_main$9 = {};
  const _hoisted_1$9 = {
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    "aria-hidden": "true",
    role: "img",
    class: "iconify iconify--mdi",
    width: "24",
    height: "24",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 24 24"
  };
  const _hoisted_2$8 = /* @__PURE__ */ vue.createElementVNode("path", {
    d: "M20 18v-4h-3v1h-2v-1H9v1H7v-1H4v4h16M6.33 8l-1.74 4H7v-1h2v1h6v-1h2v1h2.41l-1.74-4H6.33M9 5v1h6V5H9m12.84 7.61c.1.22.16.48.16.8V18c0 .53-.21 1-.6 1.41c-.4.4-.85.59-1.4.59H4c-.55 0-1-.19-1.4-.59C2.21 19 2 18.53 2 18v-4.59c0-.32.06-.58.16-.8L4.5 7.22C4.84 6.41 5.45 6 6.33 6H7V5c0-.55.18-1 .57-1.41C7.96 3.2 8.44 3 9 3h6c.56 0 1.04.2 1.43.59c.39.41.57.86.57 1.41v1h.67c.88 0 1.49.41 1.83 1.22l2.34 5.39z",
    fill: "currentColor"
  }, null, -1);
  const _hoisted_3$5 = [
    _hoisted_2$8
  ];
  function _sfc_render$4(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$9, _hoisted_3$5);
  }
  const ToolingIcon = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$4]]);
  const _sfc_main$8 = {};
  const _hoisted_1$8 = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "20",
    fill: "currentColor"
  };
  const _hoisted_2$7 = /* @__PURE__ */ vue.createElementVNode("path", { d: "M11.447 8.894a1 1 0 1 0-.894-1.789l.894 1.789zm-2.894-.789a1 1 0 1 0 .894 1.789l-.894-1.789zm0 1.789a1 1 0 1 0 .894-1.789l-.894 1.789zM7.447 7.106a1 1 0 1 0-.894 1.789l.894-1.789zM10 9a1 1 0 1 0-2 0h2zm-2 2.5a1 1 0 1 0 2 0H8zm9.447-5.606a1 1 0 1 0-.894-1.789l.894 1.789zm-2.894-.789a1 1 0 1 0 .894 1.789l-.894-1.789zm2 .789a1 1 0 1 0 .894-1.789l-.894 1.789zm-1.106-2.789a1 1 0 1 0-.894 1.789l.894-1.789zM18 5a1 1 0 1 0-2 0h2zm-2 2.5a1 1 0 1 0 2 0h-2zm-5.447-4.606a1 1 0 1 0 .894-1.789l-.894 1.789zM9 1l.447-.894a1 1 0 0 0-.894 0L9 1zm-2.447.106a1 1 0 1 0 .894 1.789l-.894-1.789zm-6 3a1 1 0 1 0 .894 1.789L.553 4.106zm2.894.789a1 1 0 1 0-.894-1.789l.894 1.789zm-2-.789a1 1 0 1 0-.894 1.789l.894-1.789zm1.106 2.789a1 1 0 1 0 .894-1.789l-.894 1.789zM2 5a1 1 0 1 0-2 0h2zM0 7.5a1 1 0 1 0 2 0H0zm8.553 12.394a1 1 0 1 0 .894-1.789l-.894 1.789zm-1.106-2.789a1 1 0 1 0-.894 1.789l.894-1.789zm1.106 1a1 1 0 1 0 .894 1.789l-.894-1.789zm2.894.789a1 1 0 1 0-.894-1.789l.894 1.789zM8 19a1 1 0 1 0 2 0H8zm2-2.5a1 1 0 1 0-2 0h2zm-7.447.394a1 1 0 1 0 .894-1.789l-.894 1.789zM1 15H0a1 1 0 0 0 .553.894L1 15zm1-2.5a1 1 0 1 0-2 0h2zm12.553 2.606a1 1 0 1 0 .894 1.789l-.894-1.789zM17 15l.447.894A1 1 0 0 0 18 15h-1zm1-2.5a1 1 0 1 0-2 0h2zm-7.447-5.394l-2 1 .894 1.789 2-1-.894-1.789zm-1.106 1l-2-1-.894 1.789 2 1 .894-1.789zM8 9v2.5h2V9H8zm8.553-4.894l-2 1 .894 1.789 2-1-.894-1.789zm.894 0l-2-1-.894 1.789 2 1 .894-1.789zM16 5v2.5h2V5h-2zm-4.553-3.894l-2-1-.894 1.789 2 1 .894-1.789zm-2.894-1l-2 1 .894 1.789 2-1L8.553.106zM1.447 5.894l2-1-.894-1.789-2 1 .894 1.789zm-.894 0l2 1 .894-1.789-2-1-.894 1.789zM0 5v2.5h2V5H0zm9.447 13.106l-2-1-.894 1.789 2 1 .894-1.789zm0 1.789l2-1-.894-1.789-2 1 .894 1.789zM10 19v-2.5H8V19h2zm-6.553-3.894l-2-1-.894 1.789 2 1 .894-1.789zM2 15v-2.5H0V15h2zm13.447 1.894l2-1-.894-1.789-2 1 .894 1.789zM18 15v-2.5h-2V15h2z" }, null, -1);
  const _hoisted_3$4 = [
    _hoisted_2$7
  ];
  function _sfc_render$3(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$8, _hoisted_3$4);
  }
  const EcosystemIcon = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$3]]);
  const _sfc_main$7 = {};
  const _hoisted_1$7 = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    fill: "currentColor"
  };
  const _hoisted_2$6 = /* @__PURE__ */ vue.createElementVNode("path", { d: "M15 4a1 1 0 1 0 0 2V4zm0 11v-1a1 1 0 0 0-1 1h1zm0 4l-.707.707A1 1 0 0 0 16 19h-1zm-4-4l.707-.707A1 1 0 0 0 11 14v1zm-4.707-1.293a1 1 0 0 0-1.414 1.414l1.414-1.414zm-.707.707l-.707-.707.707.707zM9 11v-1a1 1 0 0 0-.707.293L9 11zm-4 0h1a1 1 0 0 0-1-1v1zm0 4H4a1 1 0 0 0 1.707.707L5 15zm10-9h2V4h-2v2zm2 0a1 1 0 0 1 1 1h2a3 3 0 0 0-3-3v2zm1 1v6h2V7h-2zm0 6a1 1 0 0 1-1 1v2a3 3 0 0 0 3-3h-2zm-1 1h-2v2h2v-2zm-3 1v4h2v-4h-2zm1.707 3.293l-4-4-1.414 1.414 4 4 1.414-1.414zM11 14H7v2h4v-2zm-4 0c-.276 0-.525-.111-.707-.293l-1.414 1.414C5.42 15.663 6.172 16 7 16v-2zm-.707 1.121l3.414-3.414-1.414-1.414-3.414 3.414 1.414 1.414zM9 12h4v-2H9v2zm4 0a3 3 0 0 0 3-3h-2a1 1 0 0 1-1 1v2zm3-3V3h-2v6h2zm0-6a3 3 0 0 0-3-3v2a1 1 0 0 1 1 1h2zm-3-3H3v2h10V0zM3 0a3 3 0 0 0-3 3h2a1 1 0 0 1 1-1V0zM0 3v6h2V3H0zm0 6a3 3 0 0 0 3 3v-2a1 1 0 0 1-1-1H0zm3 3h2v-2H3v2zm1-1v4h2v-4H4zm1.707 4.707l.586-.586-1.414-1.414-.586.586 1.414 1.414z" }, null, -1);
  const _hoisted_3$3 = [
    _hoisted_2$6
  ];
  function _sfc_render$2(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$7, _hoisted_3$3);
  }
  const CommunityIcon = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$2]]);
  const _sfc_main$6 = {};
  const _hoisted_1$6 = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    fill: "currentColor"
  };
  const _hoisted_2$5 = /* @__PURE__ */ vue.createElementVNode("path", { d: "M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.666.105 5.5 5.5 0 0 0-.114 7.665L10 18.78l8.39-8.4a5.5 5.5 0 0 0-.114-7.665 5.5 5.5 0 0 0-7.666-.105l-.61.61z" }, null, -1);
  const _hoisted_3$2 = [
    _hoisted_2$5
  ];
  function _sfc_render$1(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$6, _hoisted_3$2);
  }
  const SupportIcon = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$1]]);
  const _withScopeId = (n) => (vue.pushScopeId("data-v-a00b83b5"), n = n(), vue.popScopeId(), n);
  const _hoisted_1$5 = { class: "top-bar" };
  const _hoisted_2$4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "logo" }, [
    /* @__PURE__ */ vue.createElementVNode("img", {
      alt: "Vue logo",
      class: "logo",
      src: "https://m.mi.com/static/img/icon-header-logo3.ddf2a1c313.png"
    })
  ], -1));
  const _hoisted_3$1 = { class: "search-bar" };
  const _hoisted_4$2 = { class: "bar" };
  const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "input" }, [
    /* @__PURE__ */ vue.createElementVNode("input", {
      type: "text",
      placeholder: "请输入关键词搜索。。。"
    })
  ], -1));
  const _hoisted_6 = { class: "tool" };
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
    __name: "TopBar",
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$5, [
          _hoisted_2$4,
          vue.createElementVNode("div", _hoisted_3$1, [
            vue.createElementVNode("div", _hoisted_4$2, [
              _hoisted_5,
              vue.createElementVNode("button", null, [
                vue.createVNode(SupportIcon, { class: "icon" }),
                vue.createTextVNode(" 搜索帖子 ")
              ])
            ])
          ]),
          vue.createElementVNode("div", _hoisted_6, [
            vue.createVNode(ToolingIcon, { class: "icon" }),
            vue.createVNode(SupportIcon, { class: "icon" }),
            vue.createVNode(CommunityIcon, { class: "icon" }),
            vue.createVNode(EcosystemIcon, { class: "icon" })
          ])
        ]);
      };
    }
  });
  const TopBar = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-a00b83b5"]]);
  const _hoisted_1$4 = { class: "cate-bar" };
  const _hoisted_2$3 = ["onClick"];
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    __name: "CateBar",
    setup(__props) {
      let cate_list = vue.ref([]);
      let cate_index = vue.ref(1);
      cate_list.value = Discuz.getCateList();
      async function initCate(id, index) {
        cate_index.value = index;
        cate_list.value = cate_list.value.map((vo) => {
          return { ...vo, ...{ active: id == vo.id } };
        });
        location.hash = `${id}`;
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$4, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(cate_list), (vo, index) => {
            return vue.openBlock(), vue.createElementBlock("div", {
              class: vue.normalizeClass(["cate", { active: vo.active }]),
              key: index,
              onClick: ($event) => initCate(vo.id, index)
            }, [
              vue.createElementVNode("span", null, vue.toDisplayString(vo.name), 1)
            ], 10, _hoisted_2$3);
          }), 128))
        ]);
      };
    }
  });
  const CateBar = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-77b5ccb8"]]);
  const _hoisted_1$3 = ["href"];
  const _hoisted_2$2 = { class: "img" };
  const _hoisted_3 = ["src"];
  const _hoisted_4$1 = ["id"];
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "Item",
    props: {
      width: {},
      title: {},
      image_link: {},
      pre_image_link: {},
      img_rate: {},
      href: {},
      loaded: { type: Boolean },
      index: {}
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("a", {
          class: "vo-item",
          href: _ctx.href
        }, [
          vue.createElementVNode("div", _hoisted_2$2, [
            vue.createElementVNode("img", {
              src: _ctx.pre_image_link,
              alt: "",
              style: vue.normalizeStyle({ height: (_ctx.width || 150) / _ctx.img_rate + "px" })
            }, null, 12, _hoisted_3)
          ]),
          vue.createElementVNode("div", {
            class: "text",
            id: "vo-item-img-" + _ctx.index
          }, [
            vue.createElementVNode("p", null, vue.toDisplayString(_ctx.title), 1)
          ], 8, _hoisted_4$1)
        ], 8, _hoisted_1$3);
      };
    }
  });
  const _sfc_main$2 = {};
  const _hoisted_1$2 = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "36",
    height: "36",
    viewBox: "0 0 24 24",
    class: "element"
  };
  const _hoisted_2$1 = /* @__PURE__ */ vue.createStaticVNode('<defs><linearGradient id="mingcuteLoadingFill0" x1="50%" x2="50%" y1="5.271%" y2="91.793%"><stop offset="0%" stop-color="currentColor"></stop><stop offset="100%" stop-color="currentColor" stop-opacity=".55"></stop></linearGradient><linearGradient id="mingcuteLoadingFill1" x1="50%" x2="50%" y1="15.24%" y2="87.15%"><stop offset="0%" stop-color="currentColor" stop-opacity="0"></stop><stop offset="100%" stop-color="currentColor" stop-opacity=".55"></stop></linearGradient></defs><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"></path><path fill="url(#mingcuteLoadingFill0)" d="M8.749.021a1.5 1.5 0 0 1 .497 2.958A7.502 7.502 0 0 0 3 10.375a7.5 7.5 0 0 0 7.5 7.5v3c-5.799 0-10.5-4.7-10.5-10.5C0 5.23 3.726.865 8.749.021Z" transform="translate(1.5 1.625)"></path><path fill="url(#mingcuteLoadingFill1)" d="M15.392 2.673a1.5 1.5 0 0 1 2.119-.115A10.475 10.475 0 0 1 21 10.375c0 5.8-4.701 10.5-10.5 10.5v-3a7.5 7.5 0 0 0 5.007-13.084a1.5 1.5 0 0 1-.115-2.118Z" transform="translate(1.5 1.625)"></path></g>', 2);
  const _hoisted_4 = [
    _hoisted_2$1
  ];
  function _sfc_render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$2, _hoisted_4);
  }
  const IconLoading = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render]]);
  const _Img = class {
    static load(image_link) {
      return new Promise((resolve, reject) => {
        const image_link_key = encodeURIComponent(image_link);
        const cache_image = _Img.imgObjList[image_link_key];
        if (cache_image) {
          return resolve(cache_image);
        }
        let img = new Image();
        img.src = image_link;
        let timer = setTimeout(() => {
          resolve(null);
          console.error("load image " + image_link + " failed on timeout 5s");
        }, 5e3);
        img.onload = async () => {
          _Img.List.push(image_link_key);
          _Img.imgObjList[image_link_key] = img;
          clearTimeout(timer);
          resolve(img);
        };
        img.onerror = () => {
          clearTimeout(timer);
          resolve(null);
          console.error("load image " + image_link + " failed onerror");
        };
      });
    }
  };
  let Img = _Img;
  __publicField(Img, "List", []);
  __publicField(Img, "imgObjList", {});
  const _hoisted_1$1 = {
    class: "list-bar",
    id: "list-bar"
  };
  const loading_img_link = "https://jsonp.gitee.io/video/img/load.gif";
  const img_404_link = "https://jsonp.gitee.io/video/img/404.png";
  const offset = 10;
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "ListBar",
    setup(__props) {
      let item_list = vue.ref([]);
      let is_loading_data = vue.ref(false);
      let is_loading_img = vue.ref(false);
      let page_num = vue.ref(1);
      const item_width = window.innerWidth < 550 ? Math.floor((window.innerWidth - 20) / 2) : 250;
      let h_arr = [];
      async function load_article_img(vo) {
        const img = await Img.load(vo.image_link);
        vo.loaded = img ? true : false;
        vo.img_rate = img ? img.width / img.height : 1;
        vo.pre_image_link = vo.loaded ? vo.image_link : img_404_link;
        return vo;
      }
      async function load_more(page, cid) {
        if (is_loading_data.value || is_loading_img.value) {
          return false;
        } else {
          page_num.value = page;
          is_loading_data.value = true;
          is_loading_img.value = true;
        }
        console.log("load page start", { cid, page });
        const loading_img = await Img.load(loading_img_link);
        let list = await get_data(page, cid);
        let arr = list.map((vo) => {
          const rate = loading_img.width / loading_img.height;
          return {
            image_link: vo.image_link,
            img_rate: rate,
            pre_image_link: loading_img_link,
            title: vo.title,
            href: vo.href,
            position: "absolute",
            left: -item_width * 2,
            top: -item_width * 2,
            width: item_width
          };
        });
        let index = item_list.value.length;
        let start_item_list = item_list.value;
        item_list.value = [...start_item_list, ...arr];
        is_loading_data.value = false;
        await vue.nextTick();
        await update_list(index, true);
        let load_num = 0;
        for (let i = 0; i < arr.length; i++) {
          load_article_img(arr[i]).then(async (vo) => {
            item_list.value[i + index] = vo;
            load_num++;
          });
        }
        while (load_num < arr.length) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        await vue.nextTick();
        await update_list(index);
        is_loading_img.value = false;
        console.log("load page finished", { cid, page });
      }
      function init_water() {
        const container = document.getElementById("list-bar");
        container.style.position = "relative";
        const win_width = container.getBoundingClientRect().width;
        const row_count = Math.floor((win_width + offset) / (item_width + offset));
        const inner_w = (row_count - 1) * offset + row_count * item_width;
        container.style.width = inner_w + "px";
        container.style.margin = "0 auto";
        h_arr = Array.from({ length: row_count }, () => 0);
      }
      async function update_list(index = 0, is_try = false) {
        let last_h_arr = [...h_arr];
        let i = index;
        let lenght = item_list.value.length;
        while (i < lenght) {
          let vo = item_list.value[i];
          const h_i = h_arr.indexOf(Math.min(...h_arr));
          vo.top = h_arr[h_i];
          vo.left = h_i * (offset + item_width);
          const dom = document.getElementById(`vo-item-img-${i}`);
          const _height = item_width / vo.img_rate + dom.getBoundingClientRect().height + offset;
          h_arr[h_i] += _height;
          i++;
        }
        if (is_try)
          h_arr = last_h_arr;
      }
      async function get_data(page, cid) {
        let res = await Discuz.getListByCate(page, cid);
        console.log(res);
        return res;
      }
      vue.onMounted(async () => {
        await Img.load(loading_img_link);
        await Img.load(img_404_link);
        init_water();
        await load_more(page_num.value, Discuz.cid);
      });
      _unsafeWindow.addEventListener("hashchange", async () => {
        let res = /#(\d+)/.exec(location.hash);
        if (res && res[1]) {
          Discuz.cid = +res[1];
        }
        init_water();
        page_num.value = 1;
        item_list.value = [];
        await load_more(page_num.value, Discuz.cid);
      });
      _unsafeWindow.onscroll = async () => {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        if (scrollTop + windowHeight + 15 >= scrollHeight) {
          await load_more(page_num.value + 1, Discuz.cid);
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("div", _hoisted_1$1, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(item_list), (item, index) => {
              return vue.openBlock(), vue.createBlock(_sfc_main$3, {
                width: item.width,
                index,
                img_rate: item.img_rate,
                title: item.title,
                image_link: item.image_link,
                pre_image_link: item.pre_image_link,
                href: item.href,
                class: "li",
                key: index,
                id: "vo-item-" + index,
                style: vue.normalizeStyle({
                  width: item.width + "px",
                  height: item.height + "px",
                  left: item.left + "px",
                  top: item.top + "px",
                  position: item.position
                })
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString(item.title), 1)
                ]),
                _: 2
              }, 1032, ["width", "index", "img_rate", "title", "image_link", "pre_image_link", "href", "id", "style"]);
            }), 128))
          ]),
          vue.unref(is_loading_data) ? (vue.openBlock(), vue.createBlock(IconLoading, { key: 0 })) : vue.createCommentVNode("", true)
        ], 64);
      };
    }
  });
  const _hoisted_1 = { class: "container" };
  const _hoisted_2 = { class: "right" };
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
          vue.createVNode(LeftBar, { class: "left" }),
          vue.createElementVNode("div", _hoisted_2, [
            vue.createVNode(TopBar),
            vue.createVNode(CateBar, { class: "cate-bar" }),
            vue.createVNode(_sfc_main$1)
          ])
        ]);
      };
    }
  });
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d7a231c0"]]);
  if (document.body) {
    document.body.innerHTML = "";
  }
  vue.createApp(App).mount(
    (() => {
      const app = document.createElement("div");
      app.id = "app";
      document.body.append(app);
      return app;
    })()
  );

})(Vue, jQuery);
