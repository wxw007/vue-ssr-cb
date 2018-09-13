import { getPageData } from '@/api/web/page'
import { pushArray } from '@/util/common/array'
import {
    insertUrlForInfoList
} from '../base/url/info-url-utils'
import { getInfoIndexUrl, getSymposiumIndexUrl } from '../base/url/info-url-utils'

const hightlighKeyWord = (infoList) => {
    infoList.forEach(info => {
        if (info.words != null) {
            info.words.forEach(word => {
                info.infoTitle = info.infoTitle.replace(new RegExp(word, "g"), "<font style='color:#0082c6'>" + word + "</font>")
            });
        }
    });
}
/** 
 * 新闻搜索页
 * 
 * @author wzw 
 * @since 2018-01-18
 */
export default {
    namespaced: true,
    state () {
        return {
            list: null, // 新闻列表
            subscriptionList: null,
            unSubscriptionList: null
        }
    },
    actions: {
        fetchData ({ commit, dispatch, state, rootState }, params) {
            return getPageData(rootState.request, { infoTitle: rootState.request.query.keyword })
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url
                        commit("setData", result.data);
                        commit("head/setData", result.data, { root: true });
                    }
                    return response;
                })
        },
        fetchMore ({ commit, dispatch, state, rootState }, params) {
            return getPageData(rootState.request, { infoTitle: rootState.request.query.keyword, infoCentreId: params.id })
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url
                        commit("addList", result.data);
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { list, subscriptionList, unSubscriptionList, pageUrl }) {
            state.list = list;
            if (list != null) {
                insertUrlForInfoList(list, pageUrl);
                hightlighKeyWord(list);
            }
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
        },
        addList (state, { list, pageUrl }) {
            if (list != null) {
                insertUrlForInfoList(list, pageUrl);
                hightlighKeyWord(list);
                pushArray(state.list, list);
            }
        }
    }
}