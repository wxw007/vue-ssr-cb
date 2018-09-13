import { getPageData } from '@/api/web/page'

/** 
 * 专题详情页
 * 
 * @author wzw 
 * @since 2017-12-20
 */
export default {
    namespaced: true,
    state () {
        return {
            adList: null, // 广告
            symposium: null, // 专题
            symposiumClassList: null // 专题分类列表
        }
    },
    actions: {
        fetchData ({ commit, dispatch, state, rootState }, params) {
            return getPageData( rootState.request)
                .then(response => {
                   
                    let result = response.data;
                    if (result.success) {
                        commit("setData", result.data);
                        commit('head/setData', result.data, { root: true });
                    } else {
                        return Promise.reject({ url: "/n/web/404" });
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { symposium, symposiumClassList, adList, symposiumImgList }) {
            state.adList = adList;
            state.symposium = symposium;
            state.symposiumClassList = symposiumClassList;
            state.symposiumImgList = symposiumImgList;
        }
    }
}