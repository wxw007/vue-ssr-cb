import { getLifeIndex } from '@/api/web'

import { insertUrlForLifeModuleList } from '../../util'

/** 
 * 生活各个首页布局文件数据
 * 
 * @author wzw 
 * @since 2017-12-26
 */
export default {
    namespaced: true,
    state () {
        return {
            lifeModuleList: null, // 生活模块列表
            bannerList: null, // banner
            embassy: null, // 大使馆信息
            searchPageUrl: null // 搜索页url
        }
    },
    actions: {
        setData ({ commit, dispatch, state, rootState }, data) {
            commit('head/setData', data, { root: true });
            data.pageUrl = rootState.request.url
            commit("setData", data);
        }
    },
    mutations: {
        setData (state, { bannerList, lifeModuleList, areaconfig, searchPageUrl, pageUrl }) {
            state.lifeModuleList = lifeModuleList;
            state.bannerList = bannerList;
            state.embassy = areaconfig;

            if (lifeModuleList != null) {
                insertUrlForLifeModuleList(lifeModuleList, pageUrl);
            }
            state.searchPageUrl = searchPageUrl || null;
        }
    }
}