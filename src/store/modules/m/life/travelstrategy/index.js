import { getPageData } from '@/api/wei/page'
import { pushArray, getPropertyOfLast } from '@/util/common/array'
import { insertUrlForTopLifeModuleList } from '../util'
/** 
 * 旅游攻略列表页
 * 
 * @author wzw 
 * @since 2018-02-07
 */
export default {
    namespaced: true,
    state () {
        return {
            bannerList: null, // 旅游banner
            cityIntroduction: null, // 城市介绍
            travelStrategyTopList: null, // 热门旅游攻略
            travelStrategyList: null,// 全部旅游攻略
            childLifeModuleList: null,
            haveMoreTravelStrategyTopList: null
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
                    }
                    return response;
                })
        },
        fetchMore ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request, { id: getPropertyOfLast(state.travelStrategyList, "id") })
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("addTravelStrategyList", result.data);
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { bannerList, cityIntroduction, travelStrategyTopList, travelStrategyList, childLifeModuleList, haveMoreTravelStrategyTopList, pageUrl }) {
            state.bannerList = bannerList || [];
            state.cityIntroduction = cityIntroduction;
            state.travelStrategyTopList = travelStrategyTopList || [];
            state.travelStrategyList = travelStrategyList || [];
            state.childLifeModuleList = childLifeModuleList || [];
            insertUrlForTopLifeModuleList(state.childLifeModuleList, pageUrl);
        },
        addTravelStrategyList (state, { travelStrategyList }) {
            pushArray(state.travelStrategyList, travelStrategyList)
        }
    }
}