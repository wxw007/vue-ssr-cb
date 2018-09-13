import {
    getMemberLifeServiceList, upLifeService,
    downLifeService, delLifeService
} from '@/api/web'
import { getPageData } from '@/api/web/page'
import { getTravelList,delTravelOrder } from '@/api/web/index'

import { insertForLifeserviceList } from './util'

import { pushArray, getPropertyOfLast } from '@/util/common/array'

/** 
 * 会员中心生活订单
 * 
 * @author wzw 
 * @since 2017-01-06
 */
export default {
    namespaced: true,
    state () {
        return {
            serviceList: null,
            travelApplyList:null// 旅游订单列表
        }
    },
    actions: {
        fetchData ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url;
                        commit("setData", result.data);
                        commit('head/setData', result.data, { root: true });
                    }
                    return response;
                })
        },
        fetchTravelList ({ commit, dispatch, state, rootState }) {
          return getTravelList(rootState.request)
                .then(response => {
                    let result = response.data;
                    if(result.success) {
                        commit("setTravelList", result.data)
                    }
                })
        },
        fetchMore ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request, { id: getPropertyOfLast(state.serviceList, "id") })
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url;
                        commit('addServiceList', result.data);
                    }
                    return response;
                })
        },
        //旅游订单不分页了
        // fetchMoreTravelList ({ commit, dispatch, state, rootState }) {
        //     console.log('最后一个id',getPropertyOfLast(state.travelApplyList, "travelApplyId"))
        //      return getTravelList({ travelApplyId: getPropertyOfLast(state.travelApplyList, "travelApplyId") })
        //         .then(response => {
        //             let result = response.data;
        //             console.log(rootState.request)
        //             console.log(response.data)
        //             if(result.success) {
        //                 commit("addTravelList", result.data)
        //             }
        //         })
        // },
        up ({ commit, dispatch, state, rootState }, params) {
            return upLifeService(params);
        },
        down ({ commit, dispatch, state, rootState }, params) {
            return downLifeService(params);
        },
        del ({ commit, dispatch, state, rootState }, params) {
            return delLifeService(params);
        },
        delTravelApplyList ({ commit, dispatch, state, rootState }, params) {
            return delTravelOrder(params);
        },
    },
    mutations: {
        setData (state, { serviceList, pageUrl, travelApplyList }) {
            state.serviceList = serviceList || [];
            // state.travelApplyList = travelApplyList || [];
            insertForLifeserviceList(serviceList, pageUrl);
        },
        addServiceList(state, { serviceList, pageUrl }) {
            insertForLifeserviceList(serviceList, pageUrl);
            pushArray(state.serviceList, serviceList);
        },
        setTravelList(state, {travelapplyList}){
            state.travelApplyList = travelapplyList || []
        },
        //旅游订单不分页了
        // addTravelList(state, {travelapplyList}){
        //     state.travelApplyList = state.travelApplyList.concat(travelapplyList)
        // }
    }
}