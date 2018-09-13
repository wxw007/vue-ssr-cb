import { getInfoIndexUrl } from './base/url/info-url-utils'

/** 
 * 首页
 * @author wzw 
 * @since 2018-02-06
 */
export default {
    namespaced: true,
    state () {
        return {
            subscriptionList: null, // 新闻分类列表
            curArea: null, // 当前区域
            topTitle: null //顶部标题
        }
    },
    actions: {
    },
    mutations: {
        refreshData (state, { subscriptionList, curArea, topTitle }) {
            state.subscriptionList = subscriptionList || [];
            state.curArea = curArea;
            state.topTitle = topTitle;
        },
        setData (state, { subscriptionList, area, topTitle, pageUrl }) {
            subscriptionList.forEach(subscription => {
                subscription.url = getInfoIndexUrl({ infoTypeId: subscription.infoTypeId, pageUrl });
            });
            state.curArea = area;
            state.subscriptionList = subscriptionList;
            state.topTitle = topTitle;
        }
    }
}