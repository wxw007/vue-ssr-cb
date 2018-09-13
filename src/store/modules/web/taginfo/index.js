import { getPageData } from '@/api/web/page'

import {
    insertUrlForInfoList
} from '../base/url/info-url-utils'

import { getPropertyOfLast, pushArray } from "@/util/common/array"


/** 
 *  标签新闻页
 * @author wxw 
 * @since 2018-04-10
 */
export default {
    namespaced: true,
    state () {
        return {
            infoList: null, // 新闻列表
            tagName: null
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
            return getPageData(rootState.request, { id: getPropertyOfLast(state.infoList, "infoCentreId") })
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url
                        commit("addInfoList", result.data);
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { infoList, tagName, pageUrl }) {
            insertUrlForInfoList(infoList, pageUrl)
            state.tagName = tagName;
            state.infoList = infoList || [];
        },
        addInfoList (state, { infoList, pageUrl }) {
            insertUrlForInfoList(infoList, pageUrl)
            pushArray(state.infoList, infoList)
        },
    }
}