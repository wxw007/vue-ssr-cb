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

        }
    },
    actions: {
        setData ({ commit, dispatch, state, rootState }, data) {
            commit('head/setData', data, { root: true });
        }
    },
    mutations: {

    }
}