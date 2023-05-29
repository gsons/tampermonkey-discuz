import { reactive } from 'vue'
import Discuz from './Discuz'

type Cate = {
    name: string,
    id: number
    active: boolean
};

type Store = {
    cate_list: Array<Cate>,
    cate_index: number,
    cid: number,
    key: string,
    initCate: () => void
    route: 'cate' | 'search',
    is_mobile: boolean
}
export const store = reactive<Store>({
    cate_list: [],
    cate_index: 0,
    cid: Discuz.defaultCid,
    is_mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    route: 'cate',
    key: '',
    initCate: () => {
        let [, cid] = /^#id=(\d+)$/.exec(location.hash) ?? [];
        if (cid) {
            store.cid = +cid;
            store.route = 'cate';
        }
        let [, key] = /^#key=(.*?)_=\d+$/.exec(location.hash) ?? [];
        if (key) {
            store.key = key;
            store.route = 'search';
        } else {
            store.key = '';
        }
        let list = Discuz.getCateList();
        store.cate_list = list.map((vo) => { return { ...vo, ...{ active: store.cid == vo.id && store.route == 'cate' } } });
        store.cate_index = store.cate_list.findIndex(vo => vo.active);
    }
})
