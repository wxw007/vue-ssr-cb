import { resolveUrl } from '@/util/common/url'

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
    let url = "/n/w";
    if (params && params.infoTypeId) {
        url += "?infoTypeId=" + params.infoTypeId;
    }
    return resolveUrl(params.pageUrl, url);
}

/**
 * 新闻详情页
 */
export const getInfoDetailUrl = ({ id, pageUrl }) => {
    let url = "/n/w/info/" + id;
    return resolveUrl(pageUrl, url);
}

/**
 * 专题列表页
 */
export const getSymposiumIndexUrl = () => {
    return "/n/w/symposium";
}

/**
 * 专题详情页
 */
export const getSymposiumDetailUrl = ({ id, fromInfoId, pageUrl }) => {
    let url = "/n/w/symposium/" + id;
    if (fromInfoId) {
        url += "?fromInfoId=" + fromInfoId;
    }
    return resolveUrl(pageUrl, url)
}

/**
 * 标签新闻列表页
 */
export const getTagInfoList = ({ id, pageUrl }) => {
    let url = "/n/w/taginfo/" + id
    return resolveUrl(pageUrl, url)
}


/**
 * 专题列表插入url
 */
export const insertUrlForSymposiumList = (symposiumList, pageUrl) => {
    if (symposiumList == null) {
        return
    }
    symposiumList.forEach(symposium => {
        symposium.url = getSymposiumDetailUrl({ id: symposium.symposiumId, pageUrl })
    });
}

/**
 * 新闻列表插入url
 */
export const insertUrlForInfoList = (infoList, pageUrl, isSymposiumDetailPage) => {
    if (infoList == null) {
        return
    }
    infoList.forEach(info => {
        /*
         * 1. 判断是否广告 aiId != null
         *      广告跳转类型aiToType  
         *      0:无跳转
         *      1:新闻
         *      2:网页
         *      3:专题
         *      4:生活
         *      5:旅游攻略
         *      6:旅游套餐
         * 2. 判断是否推广  isPromotion == '1'
         *      1)推广链接(promotionUrl)不为空跳转
         *      2)判断是否专题入口 showSymposium == '1'， 是的话根据专题symposiumId跳转专题
         *      3)跳转新闻详情页
         * 3. 三图新闻 infoImageThirdly != null
         *      1) 判断是否专题入口 showSymposium == '1'， 是的话根据专题symposiumId跳转专题
         *      2) 判断链接(toUrl)是否为空， 是的话跳转链接
         *      3) 跳转新闻详情页
         * 4. 单图新闻 infoImage != null
         *      这里逻辑同 三图新闻
         * 5. 无图新闻 
         *      这里逻辑同 三图新闻
         */

        if (info.aiId != null) {
        } else if (info.toUrl != null && info.toUrl != '') {
            info.url = info.toUrl;
        } else if (info.isPromotion == '1' && info.promotionUrl != null && info.promotionUrl != '') {
            // 跳转推广链接
            info.url = info.promotionUrl;
        } else if (info.showSymposium == '1') {
            if (isSymposiumDetailPage) {
                // 专题详情页的新闻跳转新闻详情页
                info.url = getInfoDetailUrl({ id: info.infoCentreId, pageUrl });
            } else {
                // 跳转专题详情页
                info.url = getSymposiumDetailUrl({ id: info.symposiumId, fromInfoId: info.infoCentreId, pageUrl });
                info.symposiumLogoName = "专题";
            }

        } else {
            // 跳转新闻详情页
            info.url = getInfoDetailUrl({ id: info.infoCentreId, pageUrl });
        }

        insertUrlForTagList(info.tags, pageUrl)
    });
}


export const insertUrlForTagList = (tags, pageUrl) => {
    if (tags == null) {
        return
    }
    tags.forEach(tag => {
        tag.url = getTagInfoList({ id: tag.keywordsId, pageUrl })
    })
}
