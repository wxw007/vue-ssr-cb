import { getPageData } from '@/api/web/page'

import { insertUrlForSymposiumList } from '../base/url/info-url-utils'
import { pushArray, getPropertyOfLast } from '@/util/common/array'

/** 
 * 专题列表页
 * 
 * @author wzw 
 * @since 2017-12-20
 */
export default {
    namespaced: true,
    state () {
        return {
            symposiumList: null // 专题列表
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
                        console.log(result.data)
                        dispatch("infoIndexTemplate/setData", result.data, { root: true });
                    }
                    return response;
                })
        },
        fetchMore ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request, { symposiumId: getPropertyOfLast(state.symposiumList, "symposiumId") })
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url
                        commit("addSymposiumList", result.data);
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { symposiumList, pageUrl }) {
            insertUrlForSymposiumList(symposiumList, pageUrl)
            state.symposiumList = symposiumList || []
        },
        addSymposiumList (state, { symposiumList, pageUrl }) {
            insertUrlForSymposiumList(symposiumList, pageUrl)
            pushArray(state.symposiumList, symposiumList)
        }
    }
}