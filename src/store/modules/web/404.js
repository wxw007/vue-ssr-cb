import { getPageData } from '@/api/web/page'

/** 
 * 404
 * 
 * @author wzw 
 * @since 2017-12-20
 */
export default {
    namespaced: true,
    state () {
        return {
            subscriptionList: null,
            unSubscriptionList: null
        }
    },
    actions: {
        fetchData ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit('head/setData', result.data, { root: true });
                        commit('setData', result.data);
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { subscriptionList, unSubscriptionList }) {
            state.subscriptionList = subscriptionList
            state.unSubscriptionList = unSubscriptionList
        }
    }
}