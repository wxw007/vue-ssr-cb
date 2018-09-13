import { getPageData } from '@/api/web/page'

import {
    insertUrlForFoodServiceList
} from '../util'

import { pushArray, getPropertyOfLast } from "@/util/common/array"
import { resolveUrl } from "@/util/common/url"
/** 
 * 美食天地首页
 * 
 * @author wzw 
 * @since 2017-12-26
 */
export default {
    namespaced: true,
    state () {
        return {
            foodServiceList: null // 美食天地
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
                        result.data.searchPageUrl = resolveUrl(rootState.request.url, "/n/w/life/foodservice/search");
                        dispatch("lifeIndexTemplateLifeservice/setData", result.data, { root: true });
                    }
                    return response;
                })
        },
        fetchMore ({ commit, dispatch, state, rootState }, params) {
            return getPageData(rootState.request, { id: getPropertyOfLast(state.foodServiceList, "id") })
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url
                        commit("addFoodServiceList", result.data);
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { list, pageUrl }) {
            state.foodServiceList = list || [];
            insertUrlForFoodServiceList(list, pageUrl);
        },
        addFoodServiceList (state, { list, pageUrl }) {
            if (list == null) {
                return;
            }

            insertUrlForFoodServiceList(list, pageUrl);
            pushArray(state.foodServiceList, list)
        }
    }
}