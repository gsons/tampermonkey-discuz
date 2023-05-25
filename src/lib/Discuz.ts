import { type ArticleDto } from "../components/Item.vue";
import Http from "./Http";

declare let $: any;//JQuery

export default class Discuz {
    static async getList(p = 1): Promise<Array<ArticleDto>> {
        const mobileOpt = { headers: { "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/113.0.0.0" } };
        let htmlString = await Http.fetch("https://cunhua.click/forum.php?mod=forumdisplay&fid=39&mobile=2&page=" + p, mobileOpt);
        let html = htmlString.text()?.replace(/<img([^>]*)>/g, (m, match) => { return `<v-img${match}>` });
        const objs = $(html).find('.byg_threadlist_pic .byg_pic_img a').map(function () {
            //@ts-ignore
            let img_link = $(this).find('v-img').attr('src');
            img_link = img_link.includes('http') ? img_link : ("https://cunhua.click/" + img_link);
            //@ts-ignore
            return { title: $(this).attr('title'), href: "https://cunhua.click/" + $(this).attr('href'), image_link: img_link }
        }).get();
        return objs;
    }
}