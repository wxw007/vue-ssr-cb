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
            recruitService: null,
            center: {},//经纬度
        }
    },
    actions: {
        fetchRecruitService ({ commit, dispatch, state, rootState }, params) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    // console.log("服务器中请求");
                    // console.log(JSON.stringify(result));
                    if (result.success) {
                        commit("setRecruitServiceDetail", result.data);
                        commit('head/setData', result.data, { root: true });
                    }
                    return response;
                })
        },
    },
    mutations: {
        setRecruitServiceDetail (state, { model }) {
            state.recruitService = model;
            state.center.lng = model.longitude || '';
            state.center.lat = model.latitude || '';

        }
    }
}