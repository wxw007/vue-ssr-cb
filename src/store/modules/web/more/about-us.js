import { getPageData } from '@/api/web/page'

/** 
 * 关于我们
 * 
 * @author jiemin
 * @since 2018-01-05
 */
export default {
    namespaced: true,
    state () {
        return {
            aboutTxt: ""
        }
    },
    actions: {
        fetchData ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit('head/setData', result.data, { root: true });
                        commit("setData", result.data);
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { infoContent }) {
            state.aboutTxt = infoContent;
        }
    }
}
