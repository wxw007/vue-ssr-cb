/** 
 * 头部数据
 * 
 * @author wzw 
 * @since 2017-12-25
 */
import { queryPhoneAreaCodeList, userLogin, loginOut } from '@/api/web'
export default {
    namespaced: true,
    state () {
        return {
            curArea: null, // 区域
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
        showLoginBox (state) {
            if (state.member == null) {
                state.showLoginBox = true;
                this.dispatch("head/fetchPhoneAreaCodeList");
            }
        },
        setShowLoginBox (state, showLoginBox) {
            state.showLoginBox = showLoginBox;
        },
        setAreaSelectList (state, areaSelectList) {
            state.areaSelectList = areaSelectList;
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
        },
        loginOut ({ commit, dispatch, state, rootState }) {
            return loginOut()
        }
    },
    getters: {
        isLogin (state) {
            return state.member != null;
        }
    }
}