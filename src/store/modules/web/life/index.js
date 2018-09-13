import { getPageData } from '@/api/web/page'

import { insertUrlForLifeModuleList, insertUrlForLifeTopList } from './util'

/** 
 * 生活首页
 * 
 * @author wzw 
 * @since 2017-12-26
 */
export default {
    namespaced: true,
    state () {
        return {
            lifeModuleList: null, // 生活模块列表
            lifeTopInfoList: null, // 生活服务置顶 信息
            bannerList: null, // banner
            embassy: null // 大使馆信息
        }
    },
    actions: {
        fetchData ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url
                        commit("setData", result.data);
                        dispatch("lifeIndexTemplate/setData", result.data, { root: true });
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { bannerList, lifeModuleList, lifeTopInfoList, embassy, pageUrl }) {
            state.lifeModuleList = lifeModuleList;
            state.bannerList = bannerList;
            state.lifeTopInfoList = lifeTopInfoList;
            state.embassy = embassy;

            if (lifeModuleList != null) {
                insertUrlForLifeModuleList(lifeModuleList, pageUrl);
            }

            if (lifeTopInfoList != null) {
                insertUrlForLifeTopList(lifeTopInfoList, pageUrl);
            }
        }
    }
}