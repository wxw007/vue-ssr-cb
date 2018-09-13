import { getPageData } from '@/api/web/page'

import {
    insertUrlForJobServiceList
} from '../util'

import { pushArray, getPropertyOfLast } from "@/util/common/array"

import { resolveUrl } from "@/util/common/url"
/** 
 * 求职首页
 * 
 * @author wzw 
 * @since 2017-12-26
 */
export default {
    namespaced: true,
    state () {
        return {
            jobServiceList: null // 求职
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
                        result.data.searchPageUrl = resolveUrl(rootState.request.url, "/n/w/life/jobservice/search");
                        dispatch("lifeIndexTemplateLifeservice/setData", result.data, { root: true });
                    }
                    return response;
                })
        },
        fetchMore ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request, { id: getPropertyOfLast(state.jobServiceList, "id") })
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url;
                        commit("addJobServiceList", result.data);
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { list, pageUrl }) {
            state.jobServiceList = list || [];
            insertUrlForJobServiceList(list, pageUrl);
        },
        addJobServiceList (state, { list }) {
            if (list == null) {
                return
            }
            pushArray(state.jobServiceList, list)
            insertUrlForJobServiceList(list, pageUrl);
        }
    }
}