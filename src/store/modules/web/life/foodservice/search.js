import { getPageData } from '@/api/web/page'
import {
    insertUrlForFoodServiceList
} from '../util'
import { pushArray, getPropertyOfLast } from '@/util/common/array'

/** 
 * 美食天地搜索页
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
        fetchFoodService ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url
                        commit("setFoodServiceList", result.data);
                        dispatch("lifeSearchTemplate/setData", result.data, { root: true });
                    }
                    return response;
                })
        },
        fetchMore ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request, { id: getPropertyOfLast(state.foodServiceList, "id") })
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
        setFoodServiceList (state, { list, pageUrl }) {
            state.foodServiceList = list || [];
            insertUrlForFoodServiceList(list, pageUrl);
        },
        addList (state, { list, pageUrl }) {
            if (list == null) {
                return;
            }
            insertUrlForFoodServiceList(list, pageUrl);
            pushArray(state.foodServiceList, list);
        }
    }
}