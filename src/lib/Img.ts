import { Logger } from '../lib/Logger';

export default class Img {
    static List: Array<string> = [];
    static imgObjList: Record<string, HTMLImageElement> = {};
    static load(image_link: string,func=(is_load:boolean)=>{}): Promise<HTMLImageElement | null> {
        return new Promise((resolve, reject) => {
            const image_link_key = encodeURIComponent(image_link);
            const cache_image = Img.imgObjList[image_link_key];
            if (cache_image) {
                // Logger.warn('cache image',image_link);
                return resolve(cache_image);
            }
            let is_timeout=false;
            let img = new Image();
            img.src = image_link;
            let timer = setTimeout(() => {
                is_timeout=true;
                resolve(null);
                Logger.error('load image ' + image_link + ' failed on timeout 10s')
            }, 30000);
            img.onload = async () => {
                if(is_timeout)func.call(this,true);
                Img.List.push(image_link_key);
                Img.imgObjList[image_link_key] = img;
                clearTimeout(timer);
                // Logger.log('load image',image_link);
                resolve(img);
            }
            img.onerror = () => {
                if(is_timeout)func.call(this,false);
                clearTimeout(timer);
                resolve(null);
                Logger.error('load image ' + image_link + ' failed onerror')
            }
        });
    }
}