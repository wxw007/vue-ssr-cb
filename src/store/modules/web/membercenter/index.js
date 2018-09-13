import { getPageData } from '@/api/web/page'

import {
    insertUrlForInfoList
} from '../base/url/info-url-utils'
/** 
 * 会员中心新闻收藏 
 * 
 * @author wzw 
 * @since 2017-01-06
 */
export default {
    namespaced: true,
    state () {
        return {
            memberMarkList: null
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
                        commit('head/setData', result.data, { root: true });
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { memberMarkList, pageUrl }) {
            state.memberMarkList = memberMarkList;
            insertUrlForInfoList(memberMarkList, pageUrl);
        }
    }
}