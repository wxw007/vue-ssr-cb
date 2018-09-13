import { insertUrlForLifeModuleList } from '../../util'
/** 
 * 生活各个搜索页共用数据
 * 
 * @author wzw 
 * @since 2018-03-07
 */
export default {
    namespaced: true,
    state () {
        return {
            lifeModuleList: null // 生活模块列表
        }
    },
    actions: {
        setData ({ commit, dispatch, state, rootState }, data) {
            data.pageUrl = rootState.request.url;
            commit("setData", data)
            commit('head/setData', data, { root: true });
        }
    },
    mutations: {
        setData (state, { lifeModuleList, pageUrl }) {
            if (lifeModuleList != null) {
                insertUrlForLifeModuleList(lifeModuleList, pageUrl);
            }
            state.lifeModuleList = lifeModuleList;
        }
    }
}