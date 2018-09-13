import { getPageData } from '@/api/wei/page'
import { pushArray, getPropertyOfLast } from '@/util/common/array'
/** 
 * 热门旅游攻略列表页
 * 
 * @author wzw 
 * @since 2018-02-07
 */
export default {
    namespaced: true,
    state () {
        return {
            list: null
        }
    },
    actions: {
        fetchData ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("setData", result.data);
                    }
                    return response;
                })
        },
        fetchMore ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request, { id: getPropertyOfLast(state.list, "strategyId") })
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("addList", result.data);
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { list }) {
            state.list = list || [];
        },
        addlist (state, { list }) {
            pushArray(state.list, list)
        }
    }
}