/**
 *  生活各个模块首页和详情页的url
 * 
 *  @author wzw 
 *  @since 2017-12-20
 */

import { resolveUrl } from "@/util/common/url"
/**
* 美食天地首页
*/
export const getFoodServiceIndexUrl = (params) => {
    let url = "/n/w/life/foodservice";
    if (params && params.lmId) {
        url += "?lmId=" + params.lmId;
    }
    return resolveUrl(params.pageUrl, url);
}
/**
 * 房产信息首页
 */
export const getHousingServiceIndexUrl = (params) => {
    let url = "/n/w/life/housingservice";
    if (params && params.lmId) {
        url += "?lmId=" + params.lmId;
    }
    return resolveUrl(params.pageUrl, url);;
}
/**
 * 求职首页
 */
export const getJobServiceIndexUrl = (params) => {
    let url = "/n/w/life/jobservice";
    if (params && params.lmId) {
        url += "?lmId=" + params.lmId;
    }
    return resolveUrl(params.pageUrl, url);;
}
/**
 * 招聘首页
 */
export const getRecruitServiceIndexUrl = (params) => {
    let url = "/n/w/life/recruitservice";
    if (params && params.lmId) {
        url += "?lmId=" + params.lmId;
    }
    return resolveUrl(params.pageUrl, url);;
}
/**
 * 自定义服务首页
 */
export const getSelfdefiningServiceIndexUrl = ({ lmId, relId, pageUrl }) => {
    let url = "/n/w/life/selfdefiningservice?relId=" + relId;
    if (lmId) {
        url += "&lmId=" + lmId;
    }
    return resolveUrl(pageUrl, url);;
}
/**
 * 同城服务首页
 */
export const getTongcitySerivceIndexUrl = (params) => {
    let url = "/n/w/life/tongcityservice";
    if (params && params.lmId) {
        url += "?lmId=" + params.lmId;
    }
    return resolveUrl(params.pageUrl, url);;
}

/**
 * 旅游套餐首页
 */
export const getTravelIndexUrl = (params) => {
    let url = "/n/w/life/travel";
    if (params && params.lmId) {
        url += "?lmId=" + params.lmId;
    }
    return resolveUrl(params.pageUrl, url);;
}

/**
 * 旅游攻略首页
 */
export const getTravelStrategyIndexUrl = (params) => {
    let url = "/n/w/life/travelstrategy";
    if (params && params.lmId) {
        url += "?lmId=" + params.lmId;
    }
    return resolveUrl(params.pageUrl, url);;
}


/**
 * 美食天地详情页
 */
export const getFoodServiceDetailUrl = ({ id, pageUrl }) => {
    return resolveUrl(pageUrl, "/n/w/life/foodservice/" + id);
}
/**
 * 房产信息详情页
 */
export const getHousingServiceDetailUrl = ({ id, pageUrl }) => {
    return resolveUrl(pageUrl, "/n/w/life/housingservice/" + id);
}
/**
 * 求职详情页
 */
export const getJobServiceDetailUrl = ({ id, pageUrl }) => {
    return resolveUrl(pageUrl, "/n/w/life/jobservice/" + id);
}
/**
 * 招聘详情页
 */
export const getRecruitServiceDetailUrl = ({ id, pageUrl }) => {
    return resolveUrl(pageUrl, "/n/w/life/recruitservice/" + id);
}
/**
 * 自定义详情页
 */
export const getSelfdefiningServiceDetailUrl = ({ id, pageUrl }) => {
    return resolveUrl(pageUrl, "/n/w/life/selfdefiningservice/" + id);
}
/**
 * 同城服务详情页
 */
export const getTongcitySerivceDetailUrl = ({ id, pageUrl }) => {
    return resolveUrl(pageUrl, "/n/w/life/tongcityservice/" + id);
}

/**
 * 旅游详情页
 */
export const getTravelDetailUrl = ({ id, pageUrl }) => {
    return resolveUrl(pageUrl, "/n/w/life/travel/" + id);
}

/**
 * 旅游攻略详情页
 */
export const getTravelStrategyDetailUrl = ({ id, pageUrl }) => {
    return resolveUrl(pageUrl, "/n/w/life/travelstrategy/" + id);
}


