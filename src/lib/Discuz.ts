import { type ArticleDto } from "../components/Item.vue";
import Http from "./Http";

import jQuery from 'jQuery';

type Cate = {
    name: string,
    id: number,
    active: boolean
};

export default class Discuz {


    static getCateList(): Array<Cate> {
        let list = [{
            name: '分类1',
            id: 39,
            active: true
        }, {
            name: '分类2',
            id: 40,
            active: false
        },
        {
            name: '分类3',
            id: 41,
            active: false
        },
        ]
        return list;
    }

    static async getListByCate(page = 1, fid = 39): Promise<Array<ArticleDto>> {
        const mobileOpt = { headers: { "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/113.0.0.0" } };
        let htmlString = await Http.fetch(`https://cunhua.click/forum.php?mod=forumdisplay&fid=${fid}&mobile=2&page=${page}`, mobileOpt);
        let html = htmlString.text().replace(/<img([^>]*)>/g, (m, match) => { return `<v-img${match}>` });
        const objs = jQuery(html).find('.byg_threadlist_pic .byg_pic_img a').map(function () {
            let img_link = jQuery(this).find('v-img').attr('src') || '';
            img_link = img_link.includes('http') ? img_link : ("https://cunhua.click/" + img_link);
            return {
                title: jQuery(this).attr('title') || '',
                href: "https://cunhua.click/" + (jQuery(this).attr('href') || ''),
                image_link: img_link,
                pre_image_link: ''
            }
        }).get();

        return objs;
    }
}