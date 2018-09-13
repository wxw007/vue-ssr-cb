import { getPageData } from '@/api/web/page'
import { pushArray, getPropertyOfLast } from '@/util/common/array'
import {
    insertUrlForHousingServiceList
} from '../util'


/** 
 * 房产信息搜索
 * 
 * @author wzw 
 * @since 2017-01-06
 */
export default {
    namespaced: true,
    state () {
        return {
            housingServiceList: null // 房产信息
        }
    },
    actions: {
        fetchHousingService ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url
                        commit("setHousingServiceList", result.data);
                        dispatch("lifeSearchTemplate/setData", result.data, { root: true });
                    }
                    return response;
                })
        },
        fetchMore ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request, { id: getPropertyOfLast(state.housingServiceList, "id") })
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
        setHousingServiceList (state, { list, pageUrl }) {
            state.housingServiceList = list || [];
            insertUrlForHousingServiceList(list, pageUrl);
        },
        addList (state, { list, pageUrl }) {
            if (list == null) {
                return
            }
            insertUrlForHousingServiceList(list, pageUrl);
            pushArray(state.housingServiceList, list);
        }
    }
}