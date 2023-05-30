import { Logger } from '../lib/Logger';
import Discuz from './Discuz';


type ImageObj = {
    width?: number,
    height?: number,
    rate: number,
    status: 404 | 'timeout' | 200
};

export default class Img {

    static imgObjList: Record<string, ImageObj> = {};

    static load(image_link: string, func = (is_load: boolean,rate:number) => { }): Promise<ImageObj> {
        return new Promise((resolve, reject) => {
            const image_link_key = encodeURIComponent(image_link);
            const cache_image = Img.imgObjList[image_link_key];
            if (cache_image) {
                // Logger.warn('cache image',image_link);
                return resolve(cache_image);
            }
            let is_timeout = false;
            let img = new Image();
            img.src = image_link;
            let timer = setTimeout(() => {
                is_timeout = true;
                resolve({ status: 'timeout',rate:Discuz.ImgLoadRate });
                Logger.error('load image ' + image_link + ' failed on timeout 5s')
            }, 5000);
            img.onload = async () => {
                if (is_timeout) func.call(this, true,img.width / img.height);
                const imgobj: ImageObj = {
                    status: 200,
                    rate: img.width / img.height,
                    width: img.width,
                    height: img.height,
                };
                Img.imgObjList[image_link_key] = imgobj;
                clearTimeout(timer);
                // Logger.log('load image',image_link);
                resolve(imgobj);
            }
            img.onerror = () => {
                if (is_timeout) func.call(this, false,Discuz.Img404Rate);
                clearTimeout(timer);
                resolve({ status: 404,rate:Discuz.Img404Rate });
                Logger.error('load image ' + image_link + ' failed onerror')
            }
        });
    }
}