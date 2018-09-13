import { getPageData } from '@/api/web/page'
import { pushArray, getPropertyOfLast } from '@/util/common/array'
import {
    insertUrlForRecruitServiceList
} from '../util'


/** 
 * 招聘搜索页
 * 
 * @author wzw 
 * @since 2017-01-06
 */
export default {
    namespaced: true,
    state () {
        return {
            recruitServiceList: null // 招聘
        }
    },
    actions: {
        fetchRecruitService ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url
                        commit("setRecruitServiceList", result.data);
                        dispatch("lifeSearchTemplate/setData", result.data, { root: true });
                    }
                    return response;
                })
        },
        fetchMore ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request, { id: getPropertyOfLast(state.recruitServiceList, "id") })
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
        setRecruitServiceList (state, { list, pageUrl }) {
            state.recruitServiceList = list || [];
            insertUrlForRecruitServiceList(list, pageUrl);
        },
        addList (state, { list, pageUrl }) {
            if (list == null) {
                return;
            }
            insertUrlForRecruitServiceList(list, pageUrl);
            pushArray(state.recruitServiceList, list);
        }
    }
}