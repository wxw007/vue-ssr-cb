import { getPageData } from '@/api/wei/page'

import { insertUrlForLifeModuleList, insertUrlForLifeTopList } from './util'

/** 
 * 生活首页
 * 
 * @author wzw 
 * @since 2017-02-06
 */
export default {
    namespaced: true,
    state () {
        return {
            nativeData:null,
            lifeModuleList: null, // 生活模块列表
            lifeTopInfoList: null, // 生活服务置顶 信息
            bannerList: null,// banner
            loopInfoList: null, // 汇率
            curArea: null, // 当前区域
            topTitle: null //顶部标题
        }
    },
    actions: {
        fetchData ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request)
                .then(response => {
                    console.log(response.toString())
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url;
                        commit("setData", result.data);
                        commit("save", result);
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { bannerList, lifeModuleList, lifeTopInfoList, loopInfoList, topTitle, area, pageUrl }) {
            state.curArea = area;

            
            state.lifeModuleList = lifeModuleList || [];

            if(state.lifeModuleList.length > 0){
                state.lifeModuleList.forEach( moduleItem => {
                    moduleItem.childList.forEach( item => {
                        item.moduleType = item.moduleList[0].moduleType
                    })
                })
                insertUrlForLifeModuleList(state.lifeModuleList, pageUrl);
            }


            state.bannerList = bannerList || [];
            state.lifeTopInfoList = lifeTopInfoList || [];
            insertUrlForLifeTopList(state.lifeTopInfoList, pageUrl);
            state.loopInfoList = loopInfoList;
            state.topTitle = topTitle;
        },
        save(state, data){
            state.nativeData = data
        }
       
        
    }
}