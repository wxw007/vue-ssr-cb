/** 
 * 移动端-登录
 * 
 * @author wxw 
 * @since 2017-12-25
 */
import { queryPhoneAreaCodeList, userLogin, loginOut } from '@/api/web'
export default {
    namespaced: true,
    state () {
        return {
            curArea: null, // 区域
            curAreaNum: null, // 区域号码
            member: null, // 用户数据
            topHrttAdminUrl: null, // 头条号后台地址
            showLoginBox: false,//登录框
            isTest: true,
            areaSelectList: null,
            continents: null // 大洲列表
        }
    },
    mutations: {
        setData (state, { area, member, topHrttAdminUrl, areaList }) {
            state.curArea = area;
            state.member = member || null;
            state.topHrttAdminUrl = topHrttAdminUrl;
            state.continents = areaList || [];
        },
        setMember (state, member) {
            state.member = member;
        },
       
        setAreaSelectList (state, areaSelectList) {
            state.areaSelectList = areaSelectList;
        },
        setCurAreaNum(state,curAreaNum){
            state.curAreaNum = curAreaNum || '86'
        }
    },
    
    actions: {
        fetchPhoneAreaCodeList ({ commit, dispatch, state, rootState }, params) {
            if (state.areaSelectList) return;
            return queryPhoneAreaCodeList(params, rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit('head/setAreaSelectList', result.data, { root: true });
                    }
                    return response;
                })
        },
        login ({ commit, dispatch, state, rootState }, params) {
            return userLogin(params)
        }
        
    },
    getters: {
        isLogin (state) {
            return state.member != null;
        }
    }
}