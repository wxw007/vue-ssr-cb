import { getPageData } from '@/api/wei/page'

import { pushArray, getPropertyOfLast } from '@/util/common/array'
/**
 * 排除掉重复的新闻
 */
const removeDuplicate = (infoList, infoId) => {
    for (let i = 0; i < infoList.length; i++) {
        let infoCentreId = [infoList[i].infoCentreId];
        if (infoId[infoCentreId]) {
            infoList.splice(i, 1);
            i--;
            continue;
        }
        
        infoId[infoCentreId] = true;
    }
}
/** 
 * 历史浏览页面
 * @author wzw 
 * @since 2018-7-18
 */
export default {
    namespaced: true,
    state () {
        return {
            infosMap: null,// 新闻列表
            stickInfoList: null,
            parameterJson: null,
            infoId: {},
            infoList: [],
            bannerList: null,
            flashNewsList: null,
            show: true
        }
    },
    actions: {
        fetchData ({ commit, dispatch, state, rootState }) {
            commit("refreshData", {})// 清空数据
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url;
                        commit("setData", result.data);
                        commit("index/setData", result.data, { root: true });
                    }
                    return response;
                })
        },
        /**
         * 加载更多
         */
        fetchMore ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request, { parameterJson: state.parameterJson })
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url;
                        commit("addInfoList", result.data);
                    }
                    return response;
                })
        },
        /**
         * 刷新 
         */
        refreshMore ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request, { parameterJson: state.parameterJson })
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("preAddInfoList", result.data);
                    }
                    return response;
                })
        }
    },
    mutations: {
        refreshData (state, { stickInfoList, parameterJson, infoId, infoList, bannerList, flashNewsList }) {
            state.stickInfoList = stickInfoList || [];
            state.parameterJson = parameterJson || null;
            state.infoId = infoId || {};
            state.infoList = infoList || [];
            state.bannerList = bannerList || [];
            state.flashNewsList = flashNewsList || [];
        },
        setData (state, { infosMap, parameterJson, subscriptionList, bannerList, flashNewsList, area, topTitle }) {
            state.infoId = {};
            state.parameterJson = parameterJson || null;
            if (infosMap != null && infosMap.infoList != null) {
                let infoList = infosMap.infoList;
                state.infoList = infoList;
                removeDuplicate(infoList, state.infoId);
            }

            if (infosMap != null && infosMap.stickInfoList != null) {
                let stickInfoList = infosMap.stickInfoList;
                state.stickInfoList = stickInfoList || null;
            }
            state.bannerList = bannerList || [];
            state.flashNewsList = flashNewsList || null;
        },
        addInfoList (state, { infosMap, parameterJson }) {
            if (infosMap == null || infosMap.infoList == null) {
                return;
            }
            removeDuplicate(infosMap.infoList, state.infoId);
            pushArray(state.infoList, infosMap.infoList);
            state.parameterJson = parameterJson || null;
        },
        preAddInfoList (state, { infosMap, parameterJson }) {
            if (infosMap == null || infosMap.infoList == null) {
                return;
            }
            removeDuplicate(infosMap.infoList, state.infoId);

            infosMap.infoList.forEach(info => {
                state.infoList.splice(0, 0, info);
            })

            state.parameterJson = parameterJson || null;
        },
        setCache (state, { infoTypeId, data }) {
            state.cache[infoTypeId] = data;
        },
        setShow (state, show) {
            state.show = show;
        }
    }
}