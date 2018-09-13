import { getPageData } from '@/api/web/page'

import {
    insertUrlForHousingServiceList
} from '../util'
import { pushArray, getPropertyOfLast } from "@/util/common/array"
import { resolveUrl } from "@/util/common/url"
/** 
 * 房产信息首页
 * 
 * @author wzw 
 * @since 2017-12-26
 */
export default {
    namespaced: true,
    state () {
        return {
            housingServiceList: null // 房产信息
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
                        result.data.searchPageUrl = resolveUrl(rootState.request.url, "/n/w/life/housingservice/search");
                        dispatch("lifeIndexTemplateLifeservice/setData", result.data, { root: true });
                    }
                    return response;
                })
        },
        fetchMore ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request, { id: getPropertyOfLast(state.housingServiceList, "id") })
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url;
                        commit("addHousingServiceList", result.data);
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { list, pageUrl }) {
            state.housingServiceList = list || [];
            insertUrlForHousingServiceList(list, pageUrl);
        },
        addHousingServiceList (state, { list, pageUrl }) {
            if (list == null) {
                return
            }
            insertUrlForHousingServiceList(list, pageUrl);
            pushArray(state.housingServiceList, list)
        }
    }
}