import { getLifeIndex } from '@/api/web'

import { insertUrlForTopLifeModuleList } from '../../util'

/** 
 * 旅游首页布局文件数据
 * 
 * @author wzw 
 * @since 2017-12-26
 */
export default {
    namespaced: true,
    state () {
        return {
            topLifeModuleList: null// 顶部模块列表
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

            if (childLifeModuleList != null) {
                insertUrlForTopLifeModuleList(childLifeModuleList, pageUrl);
            }
        }
    }
}