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
            foodService: null,
            center: {},//经纬度
        }
    },
    actions: {
        fetchFoodService ({ commit, dispatch, state, rootState }, params) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("setFoodServiceDetail", result.data);
                        dispatch('lifeserviceDetailTemplate/setData', result.data, { root: true });
                    }
                    return response;
                })
        },
    },
    mutations: {
        setFoodServiceDetail (state, { model }) {
            state.foodService = model;
            state.center.lng = model.longitude || '';
            state.center.lat = model.latitude || '';
        }
    }
}