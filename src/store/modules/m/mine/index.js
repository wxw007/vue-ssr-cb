import { getPageData } from '@/api/wei/page'
import { queryPhoneAreaCodeList, userLogin, loginOut } from '@/api/web'


/** 
 * 我的
 * 
 * @author wxw 
 * @since 2017-07-03
 */
export default {
    namespaced: true,
    state () {
        return {
            member: null
        }
    },
    actions: {
        fetchData ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("setMember", result.data);
                    }
                    return response;
                })
        },
    },
    mutations: {
        setMember (state, member) {
            state.member = member;
        },
    }
}