import { getPageData } from '@/api/wei/page'
import { pushArray, getPropertyOfLast } from '@/util/common/array'
import { insertUrlForTopLifeModuleList } from '../util'
/** 
 * 旅游套餐列表页
 * 
 * @author wzw 
 * @since 2018-02-06
 */
export default {
    namespaced: true,
    state () {
        return {
            travelList: null, // 旅游列表
            childLifeModuleList: null
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
            return getPageData(rootState.request, { id: getPropertyOfLast(state.travelList, "id") })
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("addTravelList", result.data);
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { travelList, childLifeModuleList, pageUrl }) {
            state.travelList = travelList || [];
            state.childLifeModuleList = childLifeModuleList || [];
            insertUrlForTopLifeModuleList(state.childLifeModuleList, pageUrl);
        },
        addTravelList (state, { travelList }) {
            pushArray(state.travelList, travelList);
        }
    }
}