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
            housingService: null,
            center: {},//经纬度
        }
    },
    actions: {
        fetchHousingService ({ commit, dispatch, state, rootState }, params) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    // console.log("服务端已经获取到数据了",JSON.stringify(result));
                    if (result.success) {
                        commit("setHousingServiceDetail", result.data);
                        dispatch('lifeserviceDetailTemplate/setData', result.data, { root: true });
                    }
                    return response;
                })
        },
    },
    mutations: {
        setHousingServiceDetail (state, { model }) {
            state.housingService = model;
            state.center.lng = model.longitude || '';
            state.center.lat = model.latitude || '';
        }
    }
}