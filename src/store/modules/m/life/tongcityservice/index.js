import { getPageData } from '@/api/wei/page'
import { pushArray, getPropertyOfLast } from '@/util/common/array'
import { insertUrlForTopLifeModuleList } from '../util'
/** 
 * 同城服务首页
 * 
 * @author wzw 
 * @since 2018-02-06
 */
export default {
    namespaced: true,
    state () {
        return {
            list: null,
            selectList: null,
            childLifeModuleList: null
        }
    },
    actions: {
        fetchData ({ commit, dispatch, state, rootState }, params) {
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
            return getPageData(rootState.request, { id: getPropertyOfLast(state.list, "id") })
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
        setData (state, { list, selectList, childLifeModuleList, pageUrl }) {
            state.list = list || [];
            state.selectList = selectList || [];
            state.childLifeModuleList = childLifeModuleList || [];
            insertUrlForTopLifeModuleList(state.childLifeModuleList, pageUrl);
        },
        addList (state, { list }) {
            pushArray(state.list, list);
        }
    }
}