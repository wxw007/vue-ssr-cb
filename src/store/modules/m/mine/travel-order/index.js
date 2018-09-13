import { getPageData } from '@/api/wei/page'
import { getTravelList} from '@/api/web/index'
/** 
 * 我的-旅游订单
 * 
 * @author wxw 
 * @since 2017-07-03
 */
export default {
    namespaced: true,
    state () {
        return {
            travelOrderList: null
        }
    },
    actions: {
       fetchData ({ commit, dispatch, state, rootState }) {
                 return getTravelList(rootState.request)
                       .then(response => {
                           let result = response.data;
                           if(result.success) {
                               commit("setTravelList", result.data)
                           }
                       })
               },
    },
    mutations: {
        setTravelList(state, {travelapplyList}){
            state.travelOrderList = travelapplyList
        },
    }
}