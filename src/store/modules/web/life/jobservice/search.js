import { getPageData } from '@/api/web/page'
import { pushArray, getPropertyOfLast } from '@/util/common/array'
import {
    insertUrlForJobServiceList
} from '../util'


/** 
 * 求职搜索页
 * 
 * @author wzw 
 * @since 2017-01-06
 */
export default {
    namespaced: true,
    state () {
        return {
            jobServiceList: null // 求职
        }
    },
    actions: {
        fetchJobService ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url
                        commit("setJobServiceList", result.data);
                        dispatch("lifeSearchTemplate/setData", result.data, { root: true });
                    }
                    return response;
                })
        },
        fetchMore ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request, { id: getPropertyOfLast(state.jobServiceList, "id") })
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
        setJobServiceList (state, { list, pageUrl }) {
            state.jobServiceList = list || [];
            insertUrlForJobServiceList(list, pageUrl);
        },
        addList (state, { list, pageUrl }) {
            if (list == null) {
                return;
            }
            insertUrlForJobServiceList(list, pageUrl);
            pushArray(state.jobServiceList, list);
        }
    }
}