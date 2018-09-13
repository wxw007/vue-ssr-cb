
import { insertUrlForLifeModuleList } from '../../life/util'
import { getInfoDetailUrl, getInfoIndexUrl, getSymposiumIndexUrl } from '../url/info-url-utils'

/** 
 * 首页 布局
 * @author wzw 
 * @since 2017-12-20
 */
export default {
    namespaced: true,
    state () {
        return {
            embassy: null, // 大使馆
            lifeModuleList: null, // 生活模块列表
            authoritativeRecommendationMap: null,// 权威推荐
            friendlyLinkMap: null,// 友情链接
            imgInfoList: null,// 图片新闻
            bannerList: null,// 推广广告 
            subscriptionList: null, // 订阅新闻列表
            unSubscriptionList: null // 未订阅列表
        }
    },
    actions: {
        setData ({ commit, dispatch, state, rootState }, data) {
            data.pageUrl = rootState.request.url
            commit("setData", data);
            commit("setSubscription", data);
            commit("head/setData", data, { root: true });
        }
    },
    mutations: {
        setData (state, { embassy, lifeModuleList, authoritativeRecommendationMap, friendlyLinkMap, imgInfoList, bannerList, pageUrl }) {
            // 新闻列表，前端要自己做排重，不要和顶部的热点重复------标记
            state.embassy = embassy;
            state.lifeModuleList = lifeModuleList;
            state.authoritativeRecommendationMap = authoritativeRecommendationMap;
            state.friendlyLinkMap = friendlyLinkMap;
            state.imgInfoList = imgInfoList;
            state.bannerList = bannerList || [];

            if (lifeModuleList != null) {
                insertUrlForLifeModuleList(lifeModuleList, pageUrl);
            }

            if (imgInfoList != null) {
                imgInfoList.forEach(imgInfo => {
                    imgInfo.url = getInfoDetailUrl({ id: imgInfo.infoCentreId, pageUrl })
                });
            }
        },
        setSubscription (state, { subscriptionList, unSubscriptionList }) {
            state.subscriptionList = subscriptionList;
            // if (subscriptionList != null) {
            //     subscriptionList.forEach(subscription => {
            //         let infoTypeId = subscription.infoTypeId;
            //         if (infoTypeId === "symposiumType") {
            //             subscription.url = getSymposiumIndexUrl();
            //         } else {
            //             subscription.url = getInfoIndexUrl({ infoTypeId });
            //         }
            //     });
            // }
            state.unSubscriptionList = unSubscriptionList;
        }
    }
}