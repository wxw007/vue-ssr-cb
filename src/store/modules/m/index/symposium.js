import { getPageData } from '@/api/wei/page'
import { getInfoIndexUrl, getSymposiumIndexUrl } from '../base/url/info-url-utils'
import { pushArray, getPropertyOfLast } from '@/util/common/array'
/** 
 * 专题列表页
 * 
 * @author wzw 
 * @since 2018-02-06
 */
export default {
    namespaced: true,
    state () {
        return {
            list: null, // 专题列表
            lastId: null
        }
    },
    actions: {
        fetchData ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url;
                        commit("setData", result.data);
                        commit("index/setData", result.data, { root: true });
                    }
                    return response;
                })
        },
        fetchMore ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request, { id: state.lastId })
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("addList", result.data);
                    }
                    return response;
                })
        },
        refreshMore ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request, { id: state.lastId })
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("preAddList", result.data);
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { list, subscriptionList, area, topTitle, pageUrl }) {
            state.list = list || [];
            if (list != null && list.length > 0) {
                state.lastId = getPropertyOfLast(list, "symposiumId");
            }
        },
        addList (state, { list }) {
            if (list != null && list.length > 0) {
                state.lastId = getPropertyOfLast(list, "symposiumId");
            }
            pushArray(state.list, list);
        },
        preAddList (state, { list }) {
            if (list != null && list.length > 0) {
                state.lastId = getPropertyOfLast(list, "symposiumId");
            }
            list = list || [];
            state.list = list.concat(state.list);
        }
    }
}