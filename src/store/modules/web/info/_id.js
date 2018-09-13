import { getPageData } from '@/api/web/page'
import { getCrrelationList, getAdList } from '@/api/web/index'
import { insertUrlForInfoList, insertUrlForTagList } from '../base/url/info-url-utils'
import { getInfoIndexUrl } from '../base/url/info-url-utils'


/** 
 * 新闻详情页
 * 
 * @author wzw 
 * @since 2017-12-20
 */
export default {
    namespaced: true,
    state() {
        return {
            infoType: null,
            bannerList: null, // 推广广告 
            info: null,
            adList: null,
            crrelationList: null, // 相关新闻列表
            hottestInfoList: null,//热门排行
            subscriptionList: null,//底部的订阅栏目列表
            newestInfoList: null,//最新资讯
            showCrrelationList: null,//是否有相关新闻
        }
    },
    actions: {
        fetchData({ commit, dispatch, state, rootState }, params) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url
                        commit("setData", result.data);
                        commit('head/setData', result.data, { root: true });
                    }

                    // 紧急实现， 后面改成服务端实现
                    try {
                        let infoContent = result.data.info.infoContent
                        if (infoContent != null) {
                            let img = new RegExp("<img[^>]+>", "i")
                            let imgElements = infoContent.match(img)
                            if (imgElements != null && imgElements.length > 0) {
                                let srcIndex = imgElements[0].indexOf("src")
                                let endIndex = imgElements[0].indexOf("?", srcIndex)
                                let imgUrl = imgElements[0].substring(srcIndex + 5, endIndex)
                                if (imgUrl.indexOf("jpeg") > 0 || imgUrl.indexOf('jpg') > 0) {
                                    for (let i = 0; i < result.head.meta.length; i++) {
                                        let meta = result.head.meta[i]
                                        if (meta.property == "og:image") {
                                            meta.content = imgUrl
                                            break;
                                        }
                                    }
                                }


                                // result.head.meta.push({
                                //     property: "og:image",
                                //     content: imgUrl
                                // })
                            }
                        }
                    } catch (e) {
                    }

                    return response;
                })
        },
        getCrrelationList({ commit, dispatch, state, rootState }, params) {
            return getCrrelationList(params)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("setCrrelationList", { crrelationList: result.data, pageUrl: rootState.request.url });
                    }
                })
        },
        getAdList({ commit, dispatch, state, rootState }, params) {
            return getAdList(params)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("setAdList", result.data);
                    }
                })
        }
    },
    mutations: {
        setData(state, { bannerList, info, adList, infoType, hottestInfoList, subscriptionList, newestInfoList, crrelationList, pageUrl
        }) {
            state.bannerList = bannerList;
            state.info = info;
            state.adList = adList || null;
            state.infoType = infoType;
            //新增
            state.hottestInfoList = hottestInfoList;
            state.subscriptionList = subscriptionList;
            state.newestInfoList = newestInfoList;
            state.crrelationList = crrelationList || null;
            if (infoType != null) {
                infoType.url = getInfoIndexUrl({
                    infoTypeId: infoType.infoTypeId, pageUrl
                });
            }

            insertUrlForInfoList(state.hottestInfoList, pageUrl)
            insertUrlForInfoList(state.newestInfoList, pageUrl)
            insertUrlForInfoList(state.crrelationList, pageUrl)
            insertUrlForTagList(info.tags, pageUrl)

            if (subscriptionList != null) {
                subscriptionList.forEach(subscription => {
                    insertUrlForInfoList(subscription.hotBannerInfoList, pageUrl)
                    insertUrlForInfoList(subscription.infoList, pageUrl)
                })
            }
        },
        setCrrelationList(state, { crrelationList, pageUrl }) {
            state.crrelationList = crrelationList || null;
            insertUrlForInfoList(crrelationList, pageUrl)
        },
        setAdList(state, data) {
            state.adList = data || null;
        }
    }
}