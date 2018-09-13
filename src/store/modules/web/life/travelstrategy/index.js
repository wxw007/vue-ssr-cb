import { getPageData } from '@/api/web/page'

import { insertUrlForTravelStrategyList } from '../util'
import { pushArray, getPropertyOfLast } from "@/util/common/array"
/** 
 * 旅游攻略列表页
 * 
 * @author wzw 
 * @since 2017-12-26
 */
export default {
    namespaced: true,
    state () {
        return {
            bannerList: null, // 旅游banner
            travelIntroduction: null, // 城市介绍
            travelStrategyTopList: null, // 热门旅游攻略
            travelStrategyList: null// 全部旅游攻略
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
            return getPageData(rootState.request, { id: getPropertyOfLast(state.travelStrategyList, "strategyId") })
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url;
                        commit("addTravelStrategyList", result.data);
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { bannerList, travelIntroduction, travelStrategyTopList, travelStrategyList, pageUrl }) {
            state.bannerList = bannerList;
            state.travelIntroduction = travelIntroduction;
            state.travelStrategyTopList = travelStrategyTopList;
            state.travelStrategyList = travelStrategyList || [];

            insertUrlForTravelStrategyList(travelStrategyTopList, pageUrl);

            insertUrlForTravelStrategyList(travelStrategyList, pageUrl);
        },
        addTravelStrategyList (state, { travelStrategyList, pageUrl }) {
            if (travelStrategyList == null) {
                return;
            }
            insertUrlForTravelStrategyList(travelStrategyList, pageUrl);
            pushArray(state.travelStrategyList, travelStrategyList)
        }
    }
}