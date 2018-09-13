import { resolveUrl } from "@/util/common/url"
/**
 *  生活各个模块首页
 * 
 *  @author wzw 
 *  @since 2017-02-06
 */


/**
* 美食天地首页
*/
export const getFoodServiceIndexUrl = (params) => {
    let url = "/n/m/life/foodservice";
    if (params && params.lmId) {
        url += "?lmId=" + params.lmId;
    }
    return resolveUrl(params.pageUrl, url);
}
/**
 * 房产信息首页
 */
export const getHousingServiceIndexUrl = (params) => {
    let url = "/n/m/life/housingservice";
    if (params && params.lmId) {
        url += "?lmId=" + params.lmId;
    }
    return resolveUrl(params.pageUrl, url);
}
/**
 * 求职首页
 */
export const getJobServiceIndexUrl = (params) => {
    let url = "/n/m/life/jobservice";
    if (params && params.lmId) {
        url += "?lmId=" + params.lmId;
    }
    return resolveUrl(params.pageUrl, url);
}
/**
 * 招聘首页
 */
export const getRecruitServiceIndexUrl = (params) => {
    let url = "/n/m/life/recruitservice";
    if (params && params.lmId) {
        url += "?lmId=" + params.lmId;
    }
    return resolveUrl(params.pageUrl, url);
}
/**
 * 自定义服务首页
 */
export const getSelfdefiningServiceIndexUrl = ({ lmId, relId, pageUrl }) => {
    let url = "/n/m/life/selfdefiningservice?relId=" + relId;
    if (lmId) {
        url += "&lmId=" + lmId;
    }
    return resolveUrl(pageUrl, url);
}
/**
 * 同城服务首页
 */
export const getTongcitySerivceIndexUrl = (params) => {
    let url = "/n/m/life/tongcityservice";
    if (params && params.lmId) {
        url += "?lmId=" + params.lmId;
    }
    return resolveUrl(params.pageUrl, url);
}

/**
 * 旅游套餐首页
 */
export const getTravelIndexUrl = (params) => {
    let url = "/n/m/life/travel";
    if (params && params.lmId) {
        url += "?lmId=" + params.lmId;
    }
    return resolveUrl(params.pageUrl, url);
}

/**
 * 旅游攻略首页
 */
export const getTravelStrategyIndexUrl = (params) => {
    let url = "/n/m/life/travelstrategy";
    if (params && params.lmId) {
        url += "?lmId=" + params.lmId;
    }
    return resolveUrl(params.pageUrl, url);
}

