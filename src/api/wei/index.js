
/**
 * 浏览器端请求
 */
import httputil from '../base/httputil'
import { getAreaSimpleNameFromUrl } from "../../util/common/url"
let uriPrefix = "/s/weiapi"
if (process.browser) {
    uriPrefix = uriPrefix + "/" + getAreaSimpleNameFromUrl(window.location.pathname)
}

// 修改订阅
export const updateSubscription = (params) => {
    return httputil.post(uriPrefix + "/infotypesubscription/update", params);
}

// 生活搜索页选中分类
export const fetchLifeData = (params) => {
    return httputil.post(uriPrefix + "/n/m/life/search", params);
}

//生活服务-美食天地内容发布
export const foodAdd = () => {
	 return httputil.post(uriPrefix + "/n/m/life/foodservice/add", params);
}
//生活发布-图片上传
export const uploadImg = (params) => {
    return httputil.postForm(uriPrefix + "/n/m/life/uploadImg", params);
}

//生活服务-美食天地-获取美食天地、旅游度假下拉数据
export const queryServicequerytypeList = (params) => {
	 return httputil.get("/reuse/web/service_queryServicequerytypeList.do", params);
}

//生活发布-美食天地发布
export const foodServiceAdd = (params) => {
    return httputil.postForm(uriPrefix + "/n/m/life/foodservice/add", params);
}
//生活发布-美食天地更新
export const foodServiceUpdate = (params) => {
    return httputil.postForm(uriPrefix + "/n/m/life/foodservice/update", params);
}
//生活发布-招聘内容发布
export const recruitserviceAdd = (params) => {
    return httputil.postForm(uriPrefix + "/n/m/life/recruitservice/add", params);
}
//生活发布-招聘内容更新
export const recruitserviceUpdate = (params) => {
    return httputil.postForm(uriPrefix + "/n/m/life/recruitservice/update", params);
}

//生活发布-求职内容发布
export const jobserviceAdd = (params) => {
    return httputil.postForm(uriPrefix + "/n/m/life/jobservice/add", params);
}

//生活发布-求职内容更新
export const jobserviceUpdate = (params) => {
    return httputil.postForm(uriPrefix + "/n/m/life/jobservice/update", params);
}

//生活发布-房产信息内容发布
export const housingserviceAdd = (params) => {
    return httputil.postForm(uriPrefix + "/n/m/life/housingservice/add", params);
}

//生活发布房产信息更新
export const housingserviceUpdate = (params) => {
    return httputil.postForm(uriPrefix + "/n/m/life/housingservice/update", params);
}

//生活发布-同城服务内容发布
export const tongcityserviceAdd = (params) => {
    return httputil.postForm(uriPrefix + "/n/m/life/tongcityservice/add", params);
}
//生活发布-同城服务内容更新
export const tongcityserviceUpdate = (params) => {
    return httputil.postForm(uriPrefix + "/n/m/life/tongcityservice/update", params);
}

//生活发布-自定义内容发布
export const selfdefiningserviceAdd = (params) => {
    return httputil.postForm(uriPrefix + "/n/m/life/selfdefiningservice/add", params);
}
//生活发布-自定义内容更新
export const selfdefiningserviceUpdate = (params) => {
    return httputil.postForm(uriPrefix + "/n/m/life/selfdefiningservice/update", params);
}


//我的-生活发布订单列表
export const lifePublishOrder = (params) => {
    return httputil.get(uriPrefix + "/n/m/membercenter/order", params);
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

// 获取-文章收藏列表
export const getCollectionList = (params) => {
    return httputil.get(uriPrefix + "/n/m/mine/collection", params);
}

// 清空-文章收藏列表
export const clearCollectionList = (params) => {
    return httputil.get(uriPrefix + "/n/m/mine/collection/clear", params);
}

//验证用户是否已登录

export const checkIsLogin = (params) => {
    return httputil.get(uriPrefix + "/checkIsLogin", params);
}

// 获取区号列表
export const queryPhoneAreaCodeList = () => {
    return httputil.get(uriPrefix + "/queryPhoneAreaCodeList");

}


