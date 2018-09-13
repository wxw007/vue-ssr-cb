import { getPageData } from '@/api/wei/page'
import { updateSubscription } from '@/api/wei'


/** 
 * 新闻订阅页面
 * 
 * @author wzw 
 * @since 2018-02-06
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
        fetchData ({ commit, dispatch, state, rootState }, params) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("setData", result.data);
                    }
                    return response;
                })
        },
        update ({ commit, dispatch, state, rootState }, params) {
            return updateSubscription(params);
        }
    },
    mutations: {
        setData (state, { subscriptionList, unSubscriptionList }) {
            state.subscriptionList = subscriptionList || [];
            state.unSubscriptionList = unSubscriptionList || [];
        },
        removeUnSubscription (state, index) {
            let subscription = state.unSubscriptionList[index];
            state.unSubscriptionList.splice(index, 1);
            state.subscriptionList.push(subscription);
        },
        removeSubscription (state, index) {
            let subscription = state.subscriptionList[index];
            if (subscription.readonly) {
                return;
            }
            state.subscriptionList.splice(index, 1);
            state.unSubscriptionList.push(subscription);
        }
    }
}