import { getLifeIndex } from '@/api/web'

import { insertUrlForTopLifeModuleList } from '../../util'

/** 
 * 生活服务首页布局文件数据
 * 
 * @author wzw 
 * @since 2017-12-26
 */
export default {
    namespaced: true,
    state () {
        return {
            topLifeModuleList: null, // 顶部模块列表
            selectList: null // 下拉框列表
        }
    },
    actions: {
        setData ({ commit, dispatch, state, rootState }, data) {
            dispatch('lifeIndexTemplate/setData', data, { root: true });
            data.pageUrl = rootState.request.url;
            commit("setData", data);
        }
    },
    mutations: {
        setData (state, { selectList, childLifeModuleList, pageUrl }) {
            state.topLifeModuleList = childLifeModuleList;
            state.selectList = selectList;

            if (childLifeModuleList != null) {
                insertUrlForTopLifeModuleList(childLifeModuleList, pageUrl);
            }
        }
    }
}