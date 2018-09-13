import { getPageData } from '@/api/web/page'

/** 
 * 生活-美食发布
 * 
 * @author wxw 
 * @since 2017-8-1
 */
export default {
    namespaced: true,
    state () {
        return {
            allData: null,
            areaId: null, //区域id
            model: null, //回填时的初始数据
            moduleId: null, //模块id
        }
    },
    actions: {
        fetchData ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("setData", result.data);
                        commit("saveData", result.data);
                        dispatch("lifeIndexTemplate/setData", result.data, { root: true });
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, {area, model, moduleId}) {
            state.areaId = area.areaId
            state.model = model
            state.moduleId = moduleId
        },
        saveData(state, data){
            state.allData = data
        }
    }
}