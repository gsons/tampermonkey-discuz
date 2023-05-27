
export default class Img {
    static List: Array<string> = [];
    static imgObjList: Record<string, HTMLImageElement> = {};
    static load(image_link: string): Promise<HTMLImageElement | null> {
        return new Promise((resolve, reject) => {
            const image_link_key = encodeURIComponent(image_link);
            const cache_image = Img.imgObjList[image_link_key];
            if (cache_image) {
                // console.warn('cache image',image_link);
                return resolve(cache_image);
            }
            let img = new Image();
            img.src = image_link;
            let timer = setTimeout(() => {
                resolve(null);
                console.error('load image ' + image_link + ' failed on timeout 5s')
            }, 5000);
            img.onload = async () => {
                Img.List.push(image_link_key);
                Img.imgObjList[image_link_key] = img;
                clearTimeout(timer);
                // console.log('load image',image_link);
                resolve(img);
            }
            img.onerror = () => {
                clearTimeout(timer);
                resolve(null);
                console.error('load image ' + image_link + ' failed onerror')
            }
        });
    }
}