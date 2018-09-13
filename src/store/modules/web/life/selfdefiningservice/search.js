import { getPageData } from '@/api/web/page'
import { pushArray, getPropertyOfLast } from '@/util/common/array'

import {
    insertUrlForSelfdefiningServiceList
} from '../util'


/** 
 * 自定义服务搜索页
 * 
 * @author wzw 
 * @since 2017-01-06
 */
export default {
    namespaced: true,
    state () {
        return {
            selfdefiningServiceList: null // 自定义
        }
    },
    actions: {
        fetchSelfdefiningService ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url
                        commit("setSelfdefiningServiceList", result.data);
                        dispatch("lifeSearchTemplate/setData", result.data, { root: true });
                    }
                    return response;
                })
        },
        fetchMore ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request, { id: getPropertyOfLast(state.selfdefiningServiceList, "id") })
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url
                        commit("addList", result.data);
                    }
                    return response;
                })
        }
    },
    mutations: {
        setSelfdefiningServiceList (state, { list, pageUrl }) {
            state.selfdefiningServiceList = list || [];
            insertUrlForSelfdefiningServiceList(list, pageUrl );
        },
        addList (state, { list, pageUrl }) {
            if (list == null) {
                return;
            }
            insertUrlForSelfdefiningServiceList(list, pageUrl);
            pushArray(state.selfdefiningServiceList, list);
        }
    }
}