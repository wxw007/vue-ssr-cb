import { getPageData } from '@/api/wei/page'

/** 
 * 生活发布-求职
 * 
 * @author wxw 
 * @since 2018-07-12
 */
export default {
    namespaced: true,
    state () {
        return {
            areaId: null, // 当前区域
            model: null,
            moduleId: null,
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
        }
    },
    mutations: {
        setData (state, { areaId, model, moduleId }) {
            state.areaId = areaId;
            state.model = model;
            state.moduleId = moduleId;
        }
    }
}