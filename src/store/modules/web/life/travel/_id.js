import { getPageData } from '@/api/web/page'

import { insertUrlForTravelList } from '../util'

/** 
 * 旅游套餐详情页
 * 
 * @author wzw 
 * @since 2017-12-26
 */
export default {
    namespaced: true,
    state () {
        return {
            travel: null, // 旅游套餐
            otherTravelList: null // 其他旅游套餐列表
        }
    },
    actions: {
        fetchData ({ commit, dispatch, state, rootState }, params) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url
                        commit("setData", result.data);
                        commit('head/setData', result.data, { root: true });
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { travel, otherTravelList, pageUrl }) {
            state.travel = travel;
            state.otherTravelList = otherTravelList;
            if (otherTravelList != null) {
                insertUrlForTravelList(otherTravelList, pageUrl);
            }
        }
    }
}