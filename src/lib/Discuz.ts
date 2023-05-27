import { type ArticleDto } from "../components/Item.vue";
import config from "../config";
import Http from "./Http";
import jQuery from 'jQuery';
import { Logger } from "./Logger";

type Cate = {
    name: string,
    id: number,
    active: boolean,
};

export default class Discuz {

    static cid: number = 39;
    static key: string = '';

    static readonly host: string = config.host;

    static getCateList(): Array<Cate> {

        let res = /^#id=(\d+)$/.exec(location.hash);
        if (res && res[1]) {
            Discuz.cid = +res[1];
        }

        let res2 = /^#key=(.*?)$/.exec(location.hash);
        if (res2 && res2[1]) {
            Discuz.key = res2[1];
        }

        let list = [{
            name: '国产资源',
            id: 38,
            active: false
        }, {
            name: '直播资源',
            id: 39,
            active: false
        },
        {
            name: '亚洲无码',
            id: 40,
            active: false
        },
        {
            name: '亚洲有码',
            id: 41,
            active: false
        },
        ]

        list = list.map((vo) => {
            return { ...vo, ...{ active: Discuz.cid == vo.id && Discuz.key === '' } };
        });

        return list;
    }

    static async getListByCate(page = 1, fid = 39): Promise<Array<ArticleDto>> {
        const base_url = 'https://' + Discuz.host + '/';
        const mobileOpt = {
            headers: {
                "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/113.0.0.0",
            },
            timeout: 10000
        };
        let htmlString = await Http.fetch(`${base_url}forum.php?mod=forumdisplay&fid=${fid}&mobile=2&page=${page}`, mobileOpt);
        let html = htmlString.text().replace(/<img([^>]*)>/g, (m, match) => { return `<v-img${match}>` });
        const objs = jQuery(html).find('.byg_threadlist_pic .byg_pic_img a').map(function () {
            let img_link = jQuery(this).find('v-img').attr('src') || '';
            img_link = img_link.includes('http') ? img_link : (base_url + img_link);
            return {
                title: jQuery(this).attr('title') || '',
                href: base_url + (jQuery(this).attr('href') || ''),
                image_link: img_link,
                pre_image_link: '',
                img_rate: 1,
            }
        }).get();

        return objs;
    }

    static searchIdObj:Record<string,number> = {};

    static async search(key: string, page: number = 1): Promise<Array<ArticleDto>> {
        const base_url = 'https://' + Discuz.host + '/';
        const first_url = base_url + 'search.php?mod=forum&mobile=2';
        const _key=encodeURIComponent(key);
        const search_id=Discuz.searchIdObj[_key]?Discuz.searchIdObj[_key]:0;
        const keyid_url = `https://cunhua.click/search.php?mod=forum&searchid=${search_id}&orderby=lastpost&ascdesc=desc&searchsubmit=yes&page=${page}&mobile=2`;
        let _url = search_id ? keyid_url : first_url;
        let htmlString = await Http.fetch(_url, {
            method: 'POST',
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/113.0.0.0",
            },
            timeout: 10000,
            body: 'formhash=daebadd2&srchtxt=' + (key) + '&searchsubmit=yes'
        });
        let html = htmlString.text().replace(/<img([^>]*)>/g, (m, match) => { return `<v-img${match}>` });
        let res=/searchid=(\d+)/.exec(html);
        if(res&&res[1]){
            Discuz.searchIdObj[_key]=+res[1];
        }
        let promise_list = jQuery(html).find('h2.thread_tit + ul').find('li a').map(async function () {
            let url = base_url + (jQuery(this).attr('href') || '');
            let image_link = 'https://jsonp.gitee.io/video/img/404.png';
            try {
                url = await Discuz.fetchRealUrl(url);
                image_link = await Discuz.getImage(url);
            } catch (error) {
                Logger.error('load url img faile', { url }, error);
            }
            return {
                title: jQuery(this).text(),
                href: url,
                image_link: image_link,
                pre_image_link: '',
                img_rate: 1,
            }
        }).get();
        let list = await Promise.all(promise_list);
        Logger.log({ list });
        return list;
    }

    static async getImage(url: string) {
        const mobileOpt = {
            headers: { "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/113.0.0.0" },
            timeout: 5000
        };
        const pcOpt = {};
        const opt = url.includes('mobile=') ? mobileOpt : pcOpt;
        const resp = await Http.fetch(url, opt);
        const html = resp.text();
        let regex = /<img[^>]+id="aimg_\d+"[^>]*>/g;
        let matches = html.match(regex);
        if (matches) {
            let list = matches.map((htmlString) => {
                const regex = /<img.*?src=["'](.*?)["']/;
                const [, src] = regex.exec(htmlString) ?? [];
                const regex2 = /<img.*?zoomfile=["'](.*?)["']/;
                const [, zoomfile] = regex2.exec(htmlString) ?? [];
                return zoomfile ? zoomfile : src;
            });
            const image_link = list[Math.floor(Math.random() * list.length)];
            const base_url = 'https://' + Discuz.host + '/';
            return /^https?/.test(image_link) ? image_link : base_url + image_link;
        } else {
            return 'https://jsonp.gitee.io/video/img/404.png';
        }
    }

    static async fetchRealUrl(url: string) {
        const mobileOpt = { timeout: 3000, headers: { "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/113.0.0.0" } };
        const resp = await Http.fetch(url, mobileOpt);
        const html = resp.text();
        if (/<head>/.test(html)) return url;
        //@ts-ignore
        let [, jsStr] = /<script.*?>([\s\S]*?)<\/script>/gm.exec(html);
        const temp = `
        MuURL='';
        MuObj={
            href:'',replace:function(abc){MuURL=abc},
            assign:function(abc){MuURL=abc},
        };` ;
        jsStr = temp + jsStr.replaceAll('location', 'MuObj');
        // Logger.log(jsStr);
        let func = new Function(jsStr);
        func();
        //@ts-ignore
        MuURL = MuURL ? MuURL : (MuObj.href || MuObj);
        //@ts-ignore
        let [, _dsign] = /_dsign=(.*)/gm.exec(MuURL);
        const sign = url.includes('?') ? '&' : '?';
        const _url = `${url}${sign}_dsign=${_dsign}`;
        return _url;
    }
}