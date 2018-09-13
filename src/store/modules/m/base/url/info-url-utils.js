import { resolveUrl } from "@/util/common/url"
/**
 *  新闻各个模块首页和详情页的url
 * 
 *  @author wzw 
 *  @since 2017-12-20
 */

/**
 * 新闻列表页
 */
export const getInfoIndexUrl = (params) => {
    let url = "/n/m";
    if (params && params.infoTypeId) {
        if (params.infoTypeId === "symposiumType") {
            url = "/n/m/symposium"
        }
        url += "?infoTypeId=" + params.infoTypeId;
    }
    return resolveUrl(params.pageUrl, url);
}

/**
 * 专题列表页
 */
export const getSymposiumIndexUrl = (params) => {
    return resolveUrl(params.pageUrl, "/n/m/symposium");
}


