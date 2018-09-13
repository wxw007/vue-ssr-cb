import { getPageData } from '@/api/web/page'


/** 
 * 旅游攻略详情页
 * 
 * @author wzw 
 * @since 2017-12-26
 */
export default {
    namespaced: true,
    state () {
        return {
            travelStrategy: null // 旅游攻略
        }
    },
    actions: {
        fetchData ({ commit, dispatch, state, rootState }, params) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("setData", result.data);
                        commit('head/setData', result.data, { root: true });
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { model }) {
            state.travelStrategy = model;
        }
    }
}