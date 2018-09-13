import { getPageData } from '@/api/wei/page'
import { pushArray, getPropertyOfLast } from '@/util/common/array'

/** 
 * 新闻要闻页
 * 
 * @author wzw 
 * @since 2018-02-06
 */
export default {
    namespaced: true,
    state () {
        return {
            newsInOneDay: null,
            newsInTwoDays: null,
            newsMoreThanTwoDays: null
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
        fetchMore ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request, { id: getPropertyOfLast(state.newsMoreThanTwoDays, "infoCentreId") })
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("addList", result.data);
                    }
                    return response;
                })
        },
    },
    mutations: {
        setData (state, { newsInOneDay, newsMoreThanTwoDays, newsInTwoDays }) {
            state.newsInOneDay = newsInOneDay || null;
            state.newsInTwoDays = newsInTwoDays || null;
            state.newsMoreThanTwoDays = newsMoreThanTwoDays || [];
        },
        addList (state, data) {
            pushArray(state.newsMoreThanTwoDays, data);
        }
    }
}