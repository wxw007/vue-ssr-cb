import { getPageData } from '@/api/wei/page'

/** 
 * 生活首页
 * 
 * @author wxw 
 * @since 2018-07-12
 */
export default {
    namespaced: true,
    state () {
        return {
            allData: null,
            areaId: null, // 当前区域
            model: null,
            moduleId: null,
            rentalTypeList: null
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
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { areaId, model, moduleId, rentalTypeList }) {
            state.areaId = areaId;
            state.model = model;
            state.moduleId = moduleId;
            var arr = rentalTypeList;
            rentalTypeList.forEach(function(item, index){
                arr[index].label = item.dataName
                arr[index].value = item.dataValue
            });
            state.rentalTypeList = arr;
        },
        saveData(state, data){
            state.allData = data
        }
    }
}