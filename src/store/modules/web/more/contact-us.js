import { getPageData } from '@/api/web/page'

/** 
 * 个人资料编辑
 * 
 * @author jiemin
 * @since 2018-01-05
 */
export default {
    namespaced: true,
    state () {
        return {
        }
    },
    actions: {
        fetchData ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit('head/setData', result.data, { root: true });
                    } 
                    return response;
                })
        }
    }
}