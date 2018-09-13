import { getPageData } from '@/api/web/page'



/** 
 * 各个生活服务详情页
 * 
 * @author wzw 
 * @since 2017-12-27
 */
export default {
    namespaced: true,
    state () {
        return {
            jobService: null,
            center: {},//经纬度
        }
    },
    actions: {
        fetchJobService ({ commit, dispatch, state, rootState }, params) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("setJobService", result.data);
                        dispatch('lifeserviceDetailTemplate/setData', result.data, { root: true });
                    }
                    return response;
                })
        },
    },
    mutations: {
        setJobService (state, { model }) {
            state.jobService = model;
            state.center.lng = model.longitude || '';
            state.center.lat = model.latitude || '';
        }
    }
}