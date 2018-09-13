import { getPageData } from '@/api/wei/page'
import { pushArray, getPropertyOfLast } from '@/util/common/array'
import { hightlighKeyWord } from "../util"
/** 
 * 求职搜索页
 * 
 * @author wzw 
 * @since 2018-02-06
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
        fetchMore ({ commit, dispatch, state, rootState }, params) {
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
        setData (state, { list }) {
            state.list = list || [];
            hightlighKeyWord(list, "title");
        },
        addList (state, { list }) {
            pushArray(state.list, list);
            hightlighKeyWord(list, "title");
        }
    }
}