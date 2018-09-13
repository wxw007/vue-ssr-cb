import { getPageData } from '@/api/web/page'

import { insertUrlForTravelList } from '../util'
import { pushArray, getPropertyOfLast } from "@/util/common/array"
/** 
 * 旅游套餐列表页
 * 
 * @author wzw 
 * @since 2017-12-26
 */
export default {
    namespaced: true,
    state () {
        return {
            travelList: null // 旅游列表
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
                        dispatch("lifeIndexTemplateTravel/setData", result.data, { root: true });
                    }
                    return response;
                })
        },
        fetchMore ({ commit, dispatch, state, rootState }, params) {
            return getPageData(rootState.request, { id: getPropertyOfLast(state.travelList, "travelId") })
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url;
                        commit("addTravelList", result.data);
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { travelList, pageUrl }) {
            state.travelList = travelList || [];
            insertUrlForTravelList(travelList, pageUrl);
        },
        addTravelList (state, { travelList, pageUrl }) {
            if (travelList == null) {
                return;
            }
            insertUrlForTravelList(travelList, pageUrl);
            pushArray(state.travelList, travelList)
        }
    }
}