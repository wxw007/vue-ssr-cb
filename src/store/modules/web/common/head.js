/** 
 * 头部数据
 * 
 * @author wzw 
 * @since 2017-12-25
 */
export default {
    namespaced: true,
    state () {
        return {
            curArea: null, // 区域
            member: null, // 用户数据
            topHrttAdminUrl: null,// 头条号后台地址
        }
    },
    mutations: {
        setData (state, { area, member, topHrttAdminUrl, isShowloginBox}) {
            state.curArea = area;
            state.member = member;
            state.topHrttAdminUrl = topHrttAdminUrl;
            state.isShowloginBox = isShowloginBox;
        }
    }
}