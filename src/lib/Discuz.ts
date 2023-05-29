import { type ArticleDto } from "../components/Item.vue";
import config from "../config";
import Http from "./Http";
import jQuery from 'jQuery';
import { Logger } from "./Logger";
import { GM_getValue, GM_setValue } from "$";
declare let MuURL: any;
declare let MuObj: any;

type Cate = {
    name: string,
    id: number,
    active_index?:number
};

export default class Discuz {

    static cid: number = 39;

    static key: string = '';

    static readonly Img404Link = 'https://jsonp.gitee.io/video/img/404.png';

    static readonly ImgLoadingLink = 'https://jsonp.gitee.io/video/img/load.gif';

    static readonly Host: string = config.host;

    static readonly BaseUrl: string = `https://${config.host}/`;

    static searchIdObj: Record<string, number> = {};

    static searchFormHash: string = '';

    static initRoute() {
        let [, cid] = /^#id=(\d+)$/.exec(location.hash) ?? [];
        if (cid) Discuz.cid = +cid;
        else Discuz.key='';

        let [, key] = /^#key=(.*?)_=\d+$/.exec(location.hash) ?? [];
        if (key) Discuz.key = key;
    }

    static getCateList(): Array<Cate> {
        Discuz.initRoute();

        let list:Array<Cate> = [{
            name: '国产资源',
            id: 38,
        }, {
            name: '直播资源',
            id: 39,
        },
        {
            name: '亚洲无码',
            id: 40,
        },
        {
            name: '亚洲有码',
            id: 41,
        },
        ]


        list = list.map((vo,index) => {
            const active=Discuz.cid == vo.id && Discuz.key === '';
            return { ...vo, ...{active_index:active?index:-1}};
        });
        return list;
    }

    static async getListByCate(page = 1, fid = 39): Promise<Array<ArticleDto>> {
        const mobileOpt = {
            headers: {
                "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/113.0.0.0",
            },
            timeout: 30000
        };
        let htmlString = await Http.fetch(`${Discuz.BaseUrl}forum.php?mod=forumdisplay&fid=${fid}&mobile=2&page=${page}`, mobileOpt);
        let html = htmlString.text().replace(/<img([^>]*)>/g, (m, match) => { return `<v-img${match}>` });
        const objs = jQuery(html).find('.byg_threadlist_pic .byg_pic_img a').map(function () {
            let img_link = jQuery(this).find('v-img').attr('src') || '';
            img_link = img_link.includes('http') ? img_link : (Discuz.BaseUrl + img_link);
            return {
                title: jQuery(this).attr('title') || '',
                href: Discuz.BaseUrl + (jQuery(this).attr('href') || ''),
                image_link: img_link,
                pre_image_link: '',
                img_rate: 0.72,
            }
        }).get();

        return objs;
    }

    static async initFormHash() {
        if (Discuz.searchFormHash) return;
        const _url = Discuz.BaseUrl + 'search.php?mod=forum&mobile=2';
        const res = await Http.fetch(_url);
        let hash = jQuery(res.text()).find('input[name="formhash"]').val() as string;
        Logger.log('searchFormHash:' + hash);
        Discuz.searchFormHash = hash;
    }

    static async search(key: string, page: number = 1): Promise<Array<ArticleDto>> {
        await Discuz.initFormHash();
        const first_url = Discuz.BaseUrl + 'search.php?mod=forum&mobile=2';
        const _dkey = decodeURIComponent(key);
        const _key = encodeURIComponent(key);
        const search_id = Discuz.searchIdObj[_key] ? Discuz.searchIdObj[_key] : 0;
        const keyid_url = `https://cunhua.click/search.php?mod=forum&searchid=${search_id}&orderby=lastpost&ascdesc=desc&searchsubmit=yes&page=${page}&mobile=2`;
        let _url = search_id ? keyid_url : first_url;
        let htmlString = await Http.fetch(_url, {
            method: 'POST',
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/113.0.0.0",
            },
            timeout: 3000,
            body: `formhash=${Discuz.searchFormHash}&srchtxt=${_dkey}&searchsubmit=yes`,
        });
        //  Logger.log(htmlString.text());
        let html = htmlString.text().replace(/<img([^>]*)>/g, (m, match) => { return `<v-img${match}>` });

        let hash = jQuery(html).find('input[name="formhash"]').val() as string;
        Discuz.searchFormHash = hash;
    
        let res = /searchid=(\d+)/.exec(html) ?? [];
        //let [,searchid] =res;
        if (res && res[1]) {
            Discuz.searchIdObj[_key] = +res[1];
        } else {
            Logger.error('can not fetch searchid');
            throw new Error('can not fetch searchid');
        }

        Logger.log({ _dkey, 'searchId': res[1] });

        let promise_list = jQuery(html).find('h2.thread_tit + ul').find('li a').map(async function () {
            let url: string = Discuz.BaseUrl + (jQuery(this).attr('href') || '');
            let image_link = Discuz.Img404Link;
            try {
                url = await Discuz.fetchRealUrl(url);
                // image_link = await Discuz.getImage(url);
            } catch (error) {
                Logger.error('load url img failed', url, error);
            }
            return {
                title: jQuery(this).text(),
                href: url,
                image_link: image_link,
                pre_image_link: '',
                img_rate: 0.72,
            }
        }).get();
        let list = await Promise.all(promise_list);
        Logger.log('search list', { list });
        return list;
    }

    static async getImage(url: string) {
        const mobileOpt = {
            headers: { "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/113.0.0.0" },
            timeout: 3000
        };
        const pcOpt = {};
        const opt = url.includes('mobile=') ? mobileOpt : pcOpt;
        const resp = await Http.fetch(url, opt);
        const html = resp.text();
        let regex = /<img[^>]+id="aimg_\d+"[^>]*>/g;
        let matches = html.match(regex);
        Logger.log({matches});
        if (matches) {
            let list = matches.map((htmlString) => {
                const regex = /<img.*?src=["'](.*?)["']/;
                const [, src] = regex.exec(htmlString) ?? [];
                const regex2 = /<img.*?zoomfile=["'](.*?)["']/;
                const [, zoomfile] = regex2.exec(htmlString) ?? [];
                return zoomfile ? zoomfile : src;
            });
            const image_link = list[Math.floor(Math.random() * list.length)];
            return /^https?/.test(image_link) ? image_link : Discuz.BaseUrl + image_link;
        } else {
            return Discuz.Img404Link;
        }
    }


    static async fetchRealUrl(url: string) {
        const mobileOpt = { timeout: 3000, headers: { "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/113.0.0.0" } };
        const resp = await Http.fetch(url, mobileOpt);
        const html = resp.text();
        if (/<head>/.test(html)) return url;
        let [, jsStr] = /<script.*?>([\s\S]*?)<\/script>/gm.exec(html) ?? [];
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

        MuURL = MuURL ? MuURL : (MuObj.href || MuObj);

        let [, _dsign] = /_dsign=(.*)/gm.exec(MuURL) ?? [];
        const sign = url.includes('?') ? '&' : '?';
        const _url = `${url}${sign}_dsign=${_dsign}`;
        return _url;
    }
}