import { getPageData } from '@/api/wei/page'


/** 
 * 区域选择页
 * 
 * @author wzw 
 * @since 2018-02-07
 */
export default {
    namespaced: true,
    state () {
        return {
            continents: null,
            curArea: null
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

    },
    mutations: {
        setData (state, { list, area }) {
            state.continents = list;
            state.curArea = area;
        }
    }
}