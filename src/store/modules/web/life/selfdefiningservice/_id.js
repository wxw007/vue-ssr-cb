import { getPageData } from '@/api/web/page'



/** 
 * 各个生活服务详情页
 * 
 * @author jiemin 
 * @since 2018-01-05
 */
export default {
    namespaced: true,
    state () {
        return {
            selfdefining: null,
            center: {},//经纬度
        }
    },
    actions: {
        fetchSelfdefiningService ({ commit, dispatch, state, rootState }, params) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("setSelfdefiningServiceDetail", result.data);
                        commit('head/setData', result.data, { root: true });
                    }
                    return response;
                })
        },
    },
    mutations: {
        setSelfdefiningServiceDetail (state, { model }) {
            state.selfdefining = model;
            state.center.lng = model.longitude || '';
            state.center.lat = model.latitude || '';
        }
    }
}