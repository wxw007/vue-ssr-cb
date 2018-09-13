import { getPageData } from '@/api/web/page'

import { insertUrlForInfoList } from './base/url/info-url-utils'


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
 * 首页
 * @author wzw 
 * @since 2017-12-20
 */
export default {
    namespaced: true,
    state () {
        return {
            hotBannerInfoList: null, // 热点新闻banner
            hotInfoList: null, // 热点新闻
            infosMap: null,// 新闻列表
            stickInfoList: null,
            parameterJson: null,
            infoId: {}
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
                        dispatch("infoIndexTemplate/setData", result.data, { root: true });
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
                        result.data.pageUrl = rootState.request.url
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
                        result.data.pageUrl = rootState.request.url
                        commit("preAddInfoList", result.data);
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { hotBannerInfoList, hotInfoList, infosMap, parameterJson, pageUrl }) {
            state.infoId = {};
            // 新闻列表，前端要自己做排重，不要和顶部的热点重复------标记
            state.hotBannerInfoList = hotBannerInfoList;
            state.hotInfoList = hotInfoList;
            state.infosMap = infosMap || null;
            if (hotBannerInfoList != null) {
                insertUrlForInfoList(hotBannerInfoList, pageUrl);
                hotBannerInfoList.forEach(hotBannerInfo => {
                    let infoImage = hotBannerInfo.infoImage;
                    let lastIndex = infoImage.indexOf("?");
                    if (lastIndex >= 0) {
                        infoImage = infoImage.substring(0, lastIndex);
                        infoImage += "_336x252.jpg";
                    } else {
                        infoImage += "_336x252.jpg";
                    }
                    hotBannerInfo.infoImage = infoImage;
                });
            }
            if (hotInfoList != null) {
                insertUrlForInfoList(hotInfoList, pageUrl);
            }

            state.parameterJson = parameterJson || null;
            if (infosMap != null && infosMap.infoList != null) {
                let infoList = infosMap.infoList;
                insertUrlForInfoList(infoList, pageUrl);

                removeDuplicate(infoList, state.infoId);
            }

            if (infosMap != null && infosMap.stickInfoList != null) {
                let stickInfoList = infosMap.stickInfoList;
                insertUrlForInfoList(stickInfoList, pageUrl);
                state.stickInfoList = stickInfoList;
            }
        },
        addInfoList (state, { infosMap, parameterJson, pageUrl }) {
            if (infosMap != null && infosMap.infoList != null) {
                removeDuplicate(infosMap.infoList, state.infoId);

                infosMap.infoList.forEach(info => {
                    state.infosMap.infoList.push(info);
                })


                if (infosMap != null && infosMap.infoList != null) {
                    let infoList = infosMap.infoList;
                    insertUrlForInfoList(infoList, pageUrl);
                }

                state.parameterJson = parameterJson || null;
            }
        },
        preAddInfoList (state, { infosMap, parameterJson, pageUrl }) {
            if (infosMap != null && infosMap.infoList != null) {
                let infoList = infosMap.infoList;

                removeDuplicate(infoList, state.infoId);

                for (let i = infoList.length - 1; i >= 0; i--) {
                    let info = infoList[i]
                    state.infosMap.infoList.splice(0, 0, info);
                }

                insertUrlForInfoList(infoList, pageUrl);

                state.parameterJson = parameterJson;
            }
        }
    }
}