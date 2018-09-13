import {
    getMsgList, getMemberMsgList, getInfoMsgList
} from '@/api/web'

import { getPageData } from '@/api/web/page'
import { getInfoDetailUrl } from "../base/url/info-url-utils"
import { pushArray, getPropertyOfLast } from '@/util/common/array'

/** 
 * 消息中心
 *      新闻消息
 *      系统通知
 * @author wzw 
 * @since 2017-01-06
 */
export default {
    namespaced: true,
    state () {
        return {
            msgList: null,
            infoListData: {
                over: null,
                msgList: null,
                parameterJson: null
            },
        }
    },
    actions: {
        fetchData ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("setMsgList", result.data);
                        result.data.infoMsg.pageUrl = rootState.request.url
                        commit("setInfoList", result.data.infoMsg);
                        commit('head/setData', result.data, { root: true });
                    }
                    return response;
                })
        },
        fetchMoreMsgList ({ commit, dispatch, state, rootState }) {
            return getMemberMsgList({ id: getPropertyOfLast(state.msgList, "mmId") }, rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("addMsgList", result.data);
                    }
                    return response;
                })
        },
        fetchMoreInfoMsgList ({ commit, dispatch, state, rootState }) {
            return getInfoMsgList({ parameterJson: state.infoListData.parameterJson }, rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("addInfoMsgList", result.data.infoMsg);
                    }
                    return response;
                })
        }
    },
    mutations: {
        setMsgList (state, { memberMsgList }) {
            state.msgList = memberMsgList;
        },
        setInfoList (state, { over, infoMsgList, parameterJson, pageUrl }) {
            state.infoListData.over = over;
            state.infoListData.msgList = infoMsgList;
            state.infoListData.parameterJson = parameterJson;

            if (infoMsgList != null) {
                infoMsgList.forEach(info => {
                    info.url = getInfoDetailUrl({ id: info.infoCentreId, pageUrl })
                })
            }
        },
        addMsgList (state, { memberMsgList }) {
            pushArray(state.msgList, memberMsgList);
        },
        addInfoMsgList (state, { over, infoMsgList, parameterJson }) {
            pushArray(state.infoListData.msgList, infoMsgList);
            state.infoListData.over = over;
            state.infoListData.parameterJson = parameterJson;
        }
    }
}