import { getPageData } from '@/api/web/page'

import { pushArray, getPropertyOfLast } from '@/util/common/array'
import {
    insertUrlForTongcityServiceList
} from '../util'


/** 
 * 同城服务搜索页
 * 
 * @author wzw 
 * @since 2017-01-06
 */
export default {
    namespaced: true,
    state () {
        return {
            tongcityServiceList: null // 同城服务
        }
    },
    actions: {
        fetchTongcityService ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url
                        commit("setTongcityServiceList", result.data);
                        dispatch("lifeSearchTemplate/setData", result.data, { root: true });
                    }
                    return response;
                })
        },
        fetchMore ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request, { id: getPropertyOfLast(state.tongcityServiceList, "id") })
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
        setTongcityServiceList (state, { list, pageUrl }) {
            state.tongcityServiceList = list || [];
            insertUrlForTongcityServiceList(list, pageUrl);
        },
        addList (state, { list, pageUrl }) {
            if (list == null) {
                return;
            }
            insertUrlForTongcityServiceList(list, pageUrl);
            pushArray(state.tongcityServiceList, list);
        }
    }
}