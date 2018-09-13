import { getPageData } from '@/api/web/page'

import {
    insertUrlForSelfdefiningServiceList
} from '../util'
import { pushArray, getPropertyOfLast } from "@/util/common/array"
import { resolveUrl } from "@/util/common/url"
/** 
 * 各个生活服务列表页
 * 
 * @author wzw 
 * @since 2017-12-26
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
                        result.data.pageUrl = rootState.request.url;
                        commit("setData", result.data);
                        result.data.searchPageUrl = resolveUrl(rootState.request.url, "/n/w/life/selfdefiningservice/search?relId=" + rootState.request.query.relId);
                        dispatch("lifeIndexTemplateLifeservice/setData", result.data, { root: true });
                    }
                    return response;
                })
        },
        fetchMore ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request, { id: getPropertyOfLast(state.selfdefiningServiceList, "id") })
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url;
                        commit("addSelfdefiningServiceList", result.data);
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { list, pageUrl }) {
            state.selfdefiningServiceList = list || [];
            insertUrlForSelfdefiningServiceList(list, pageUrl);
        },
        addSelfdefiningServiceList (state, { list, pageUrl }) {
            if (list == null) {
                return;
            }
            insertUrlForSelfdefiningServiceList(list, pageUrl);
            pushArray(state.selfdefiningServiceList, list)
        }
    }
}