
/**
 * 浏览器端请求
 */
import httputil from '../base/httputil'
import { getAreaSimpleNameFromUrl } from "../../util/common/url"

let uriPrefix = "/s/webapi"
if (process.browser) {
    uriPrefix = uriPrefix + "/" + getAreaSimpleNameFromUrl(window.location.pathname)
}


// 获取区域列表
export const getAreaList = (params) => {
    return httputil.get(uriPrefix + "/getAreaList", params)
}

// 查询相关新闻
export const getCrrelationList = (params) => {
    return httputil.get(uriPrefix + "/infodetail/crrelationList", params)
}

// 获取广告
export const getAdList = (params) => {
    return httputil.get(uriPrefix + "/infodetail/adList", params)
}

// 获取举报类型列表
export const getInformReasonList = (params) => {
    return httputil.get(uriPrefix + "/inform/getInformReasonList", params)
}

// 提交举报
export const submitInform = (params) => {
    return httputil.post(uriPrefix + "/inform/add", params)
}

// 添加收藏
export const addMembermark = (params) => {
    return httputil.post(uriPrefix + "/infomembermark/add", params);
};

// 取消收藏
export const delMembermark = (params) => {
    return httputil.post(uriPrefix + "/infomembermark/del", params);
};

// 新闻详情页点赞
export const addInfoPraise = (params) => {
    return httputil.get(uriPrefix + "/info/praise", params);
};


// 获取评论列表
export const getCommentList = (params) => {
    return httputil.get(uriPrefix + "/comment/getCommentList", params);
}

// 获取更多回复
export const getReplyList = (params) => {
    return httputil.get(uriPrefix + "/comment/getReplyList", params);
}


// 新闻评论
export const addComment = (params) => {
    return httputil.post(uriPrefix + "/comment/add", params);
}

// 新闻评论回复
export const addReply = (params) => {
    return httputil.post(uriPrefix + "/comment/addReply", params);
}

// 新闻评论点赞
export const addCommentPraise = (params) => {
    return httputil.get(uriPrefix + "/comment/praise", params);
}


// 专题详情页新闻列表
export const getSymposiumInfoList = (params, request) => {
    return httputil.get(uriPrefix + "/symposium/getInfoList", params, request);
}


// 获取区号列表
export const queryPhoneAreaCodeList = () => {
    return httputil.get(uriPrefix + "/queryPhoneAreaCodeList");

}


//向服务端提交用户订阅数据
export const userSubscriptionData = (params) => {
    return httputil.post(uriPrefix + "/infotypesubscription/update", params);
}


//用户登录
export const userLogin = (params) => {
    return httputil.post(uriPrefix + "/loginByMobilePhone", params);
}


//退出登录
export const loginOut = () => {
    return httputil.post(uriPrefix + "/logout");
}


//上传头像方法
export const uploadUserImg = (params) => {
    return httputil.postForm(uriPrefix + "/member/uploadAvatorImg", params);
}


//保存用户头像
export const updateAvatar = (params) => {
    return httputil.postForm(uriPrefix + "/member/updateAvatar", params);
}


//修改用户资料
export const updateMember = (params) => {
    return httputil.post(uriPrefix + "/member/update", params);
}


// 获取会员新闻收藏 
export const getMembermarkList = (request) => {
    return httputil.get(uriPrefix + "/member/queryMembermarkList", null, request);
}



// 上架生活服务 
export const upLifeService = (params) => {
    return httputil.post(uriPrefix + "/lifeservice/up", params);
}

// 下架生活服务
export const downLifeService = (params) => {
    return httputil.post(uriPrefix + "/lifeservice/down", params);
}

// 删除生活服务
export const delLifeService = (params) => {
    return httputil.post(uriPrefix + "/lifeservice/del", params);
}

// 搜索生活服务列表
export const queryListAllServiceByKeyword = (params) => {
    return httputil.post("/mobile/service_queryListAllServiceByKeyword.do", params);
}


// 获取会员新闻消息，如评论点赞，评论回复
export const getInfoMsgList = (params) => {
    return httputil.get(uriPrefix + "/member/queryInfoMsgList", params);
}


// 获取会员系统消息
export const getMemberMsgList = (params) => {
    return httputil.get(uriPrefix + "/member/queryMemberMsgList", params);
}


// 获取汇率
export const getExchangeRate = () => {
    return httputil.get(uriPrefix + "/exchangeRate/get");
}



//生活服务-获取发布类别数据
export const getPublishType = () => {
     return httputil.get(uriPrefix + "/n/w/life/queryAllAreaServiceBusList")
}

//获取 个人中心-旅游订单数据
export const getTravelList = (params) => {
    return httputil.get(uriPrefix + "/n/w/membercenter/travellist", params)
}

//删除 个人中心-旅游订单数据
export const delTravelOrder = (params) => {
    return httputil.get(uriPrefix + "/n/w/membercenter/delTravelapply", params)
}

//生活服务-美食天地-提交数据
export const submitFoodservice = (formdata) => {
    return httputil.postForm(uriPrefix + "/exchangeRate/get", formdata);
}

//生活服务-美食天地-下拉框数据
export const foodServiceSelectList = (formdata) => {
    return httputil.get("/reuse/web/service_queryServicequerytypeList.do", formdata);
}




