import { getPageData } from '@/api/web/page'
import { insertUrlForLifeModuleList, insertUrlForLifeTopList } from './util'

/** 
 * 生活首页
 * 
 * @author wzw 
 * @since 2017-12-26
 */
export default {
    namespaced: true,
    state () {
        return {
            nativeData: null,
            lifeModuleList: null, // 生活模块列表
            lifeTopInfoList: null, // 生活服务置顶 信息
            bannerList: null, // banner
            searchDataList: null, // 搜索结果数据列表
            noData: false, //是否能加载数据
            embassy: null // 大使馆信息
        }
    },
    actions: {
        fetchData ({ commit, dispatch, state, rootState }) {
          
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url
                        commit("setData", result.data);
                        commit("saveData", result.data);
                        dispatch("lifeIndexTemplate/setData", result.data, { root: true });
                    }
                    return response;
                })
        },
         /**
         * 加载更多
         */
        fetchMore ({ commit, dispatch, state, rootState }) {
            if(state.noData){
                return
            }
            let len = state.searchDataList.length - 1;
            let lastItem = state.searchDataList[len];
            let lastServiceId = lastItem.serviceId;
            let lastDataType = lastItem.dataType;
            return getPageData(rootState.request, { lastServiceId, lastDataType})
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("addList", result.data);
                    }
                    return response;
                })
        },
    },
    mutations: {
        setData (state, { bannerList, lifeModuleList, lifeTopInfoList, embassy, pageUrl, life }) {
            state.lifeModuleList = lifeModuleList;
            state.bannerList = bannerList;
            state.lifeTopInfoList = lifeTopInfoList;
            state.searchDataList = life.dataList;
            state.embassy = embassy;

            if (lifeModuleList != null) {
                insertUrlForLifeModuleList(lifeModuleList, pageUrl);
            }

            if (lifeTopInfoList != null) {
                insertUrlForLifeTopList(lifeTopInfoList, pageUrl);
            }
        },
        saveData(state, data){
            state.nativeData = data;
        },
        addList(state, {life}){
            if(life.dataList.length>0){
                 state.searchDataList = state.searchDataList.concat(life.dataList);
            } else {
                state.noData = true
            }
        }
    }
}