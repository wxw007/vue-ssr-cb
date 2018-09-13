import { getPageData } from '@/api/wei/page'
import { fetchLifeData } from '@/api/wei'
import { pushArray, getPropertyOfLast } from '@/util/common/array'
import { hightlighKeyWord } from "./util"
/** 
 * 生活搜索
 * 
 * @author wzw 
 * @since 2018-02-07
 */
export default {
    namespaced: true,
    state () {
        return {
            dataList: null,
            typeList: null,
            serviceTypeIds: null
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
        selecType ({ commit, dispatch, state, rootState }) {
            let params = {
                keyword: rootState.route.query.keyword,
                serviceTypeIds: state.serviceTypeIds
            }
            return fetchLifeData(params)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("setList", result.data);
                    }
                    return response;
                })
        },
        fetchMore ({ commit, dispatch, state, rootState }) {
            let params = {
                keyword: rootState.route.query.keyword,
                lastServiceId: getPropertyOfLast(state.dataList, "id"),
                lastDataType: getPropertyOfLast(state.dataList, "dataType")
            };
            return fetchLifeData(params)
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
        setData (state, { dataList, typeList }) {
            state.dataList = dataList || [];
            state.typeList = typeList || [];
            hightlighKeyWord(dataList, "title");
        },
        setList (state, { dataList, typeList }) {
            state.dataList = dataList || [];
            hightlighKeyWord(dataList, "title");
        },
        setServiceTypeIds (state, serviceTypeIds) {
            state.serviceTypeIds = serviceTypeIds;
        },
        addList (state, { dataList }) {
            pushArray(state.dataList, dataList);
            hightlighKeyWord(dataList, "title");
        }
    }
}