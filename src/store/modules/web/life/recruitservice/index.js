import { getPageData } from '@/api/web/page'

import { insertUrlForRecruitServiceList } from '../util'
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
            recruitServiceList: null // 招聘
        }
    },
    actions: {
        fetchRecruitService ({ commit, dispatch, state, rootState }, params) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url;
                        commit("setData", result.data);
                        result.data.searchPageUrl = resolveUrl(rootState.request.url, "/n/w/life/recruitservice/search");
                        dispatch("lifeIndexTemplateLifeservice/setData", result.data, { root: true });
                    }
                    return response;
                })
        },
        fetchMore ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request, { id: getPropertyOfLast(state.recruitServiceList, "id") })
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url;
                        commit("addRecruitServiceList", result.data);
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { list, pageUrl }) {
            state.recruitServiceList = list || [];
            insertUrlForRecruitServiceList(list, pageUrl);
        },
        addRecruitServiceList (state, { list, pageUrl }) {
            if (list == null) {
                return;
            }
            insertUrlForRecruitServiceList(list, pageUrl);
            pushArray(state.recruitServiceList, list)
        }
    }
}