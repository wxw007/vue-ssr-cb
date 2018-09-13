import {
    getFoodServiceIndexUrl, getHousingServiceIndexUrl, getJobServiceIndexUrl, getRecruitServiceIndexUrl,
    getTongcitySerivceIndexUrl, getSelfdefiningServiceIndexUrl, getTravelIndexUrl, getTravelStrategyIndexUrl
} from '../base/url/life-url-utils'


const MODULE_TYPE_TRAVEL_STRAGE = "8";// 旅游攻略
const MODULE_TYPE_TRAVEL = "9";// 旅游套餐
const MODULE_TYPE_FOODSERVICE = "101";//  美食天地
const MODULE_TYPE_RECRUITSERVICE = "104";// 招聘
const MODULE_TYPE_JOBSERVICE = "105";// 求职
const MODULE_TYPE_HOUSINGSERVICE = "106";// 房产信息
const MODULE_TYPE_TONGCITYSERVICE = "108";// 同城服务
const MODULE_TYPE_SELFDEFINGSERVICE = "109"; //  自定义服务

const MODULE_ID_FOODSERVICE = 1; // 美食天地
const MODULE_ID_RECRUITSERVICE = 4;// 招聘
const MODULE_ID_JOBSERVICE = 5; // 求职
const MODULE_ID_HOUSINGSERVICE = 6; // 房产信息
const MODULE_ID_TONGCITYSERVICE = 8; // 同城服务
const MODULE_ID_SELFDEFININGSERVICE = 9; // 自定义服务

/**
 * 给生活模块设置跳转url
 */

export const insertUrlForLifeModuleList = (lifeModuleList, pageUrl) => {
    lifeModuleList.forEach(lifeModule => {
        lifeModule.childList.forEach( item => {

                let moduleType = item.moduleType;
                switch (moduleType) {
                    case MODULE_TYPE_TRAVEL_STRAGE:
                        item.url = getTravelStrategyIndexUrl({ lmId: item.lmId, pageUrl });
                        break;
                    case MODULE_TYPE_TRAVEL:
                        item.url = getTravelIndexUrl({ lmId: item.lmId, pageUrl });
                        break;
                    case MODULE_TYPE_FOODSERVICE:
                        item.url = getFoodServiceIndexUrl({ lmId: item.lmId, pageUrl });
                        break;
                    case MODULE_TYPE_RECRUITSERVICE:
                        item.url = getRecruitServiceIndexUrl({ lmId: item.lmId, pageUrl });
                        break;
                    case MODULE_TYPE_JOBSERVICE:
                        item.url = getJobServiceIndexUrl({ lmId: item.lmId, pageUrl });
                        break;
                    case MODULE_TYPE_HOUSINGSERVICE:
                        item.url = getHousingServiceIndexUrl({ lmId: item.lmId, pageUrl });
                        break;
                    case MODULE_TYPE_TONGCITYSERVICE:
                        item.url = getTongcitySerivceIndexUrl({ lmId: item.lmId, pageUrl });
                        break;
                    case MODULE_TYPE_SELFDEFINGSERVICE:
                        item.url = getSelfdefiningServiceIndexUrl({ lmId: item.lmId, relId: item.moduleList[0].relId, pageUrl });
                        break;
                    default:
                }
            
        })
        
    });
}

// export const insertUrlForLifeModuleList = (lifeModuleList, pageUrl) => {
//     lifeModuleList.forEach(lifeModule => {
//         if (lifeModule.moduleList != null) {
//             let moduleType = lifeModule.moduleList[0].moduleType;
//             switch (moduleType) {
//                 case MODULE_TYPE_TRAVEL_STRAGE:
//                     lifeModule.url = getTravelStrategyIndexUrl({ lmId: lifeModule.lmId, pageUrl });
//                     break;
//                 case MODULE_TYPE_TRAVEL:
//                     lifeModule.url = getTravelIndexUrl({ lmId: lifeModule.lmId, pageUrl });
//                     break;
//                 case MODULE_TYPE_FOODSERVICE:
//                     lifeModule.url = getFoodServiceIndexUrl({ lmId: lifeModule.lmId, pageUrl });
//                     break;
//                 case MODULE_TYPE_RECRUITSERVICE:
//                     lifeModule.url = getRecruitServiceIndexUrl({ lmId: lifeModule.lmId, pageUrl });
//                     break;
//                 case MODULE_TYPE_JOBSERVICE:
//                     lifeModule.url = getJobServiceIndexUrl({ lmId: lifeModule.lmId, pageUrl });
//                     break;
//                 case MODULE_TYPE_HOUSINGSERVICE:
//                     lifeModule.url = getHousingServiceIndexUrl({ lmId: lifeModule.lmId, pageUrl });
//                     break;
//                 case MODULE_TYPE_TONGCITYSERVICE:
//                     lifeModule.url = getTongcitySerivceIndexUrl({ lmId: lifeModule.lmId, pageUrl });
//                     break;
//                 case MODULE_TYPE_SELFDEFINGSERVICE:
//                     lifeModule.url = getSelfdefiningServiceIndexUrl({ lmId: lifeModule.lmId, relId: lifeModule.moduleList[0].relId, pageUrl });
//                     break;
//                 default:
//             }
//         }
//     });
// }

/**
 * 给顶部生活模块设置跳转url
 */
export const insertUrlForTopLifeModuleList = (lifeModuleList, pageUrl) => {
    lifeModuleList.forEach(lifeModule => {
        let moduleType = lifeModule.moduleType;
        switch (moduleType) {
            case MODULE_TYPE_TRAVEL_STRAGE:
                lifeModule.url = getTravelStrategyIndexUrl({ lmId: lifeModule.lmId, pageUrl });
                break;
            case MODULE_TYPE_TRAVEL:
                lifeModule.url = getTravelIndexUrl({ lmId: lifeModule.lmId, pageUrl });
                break;
            case MODULE_TYPE_FOODSERVICE:
                lifeModule.url = getFoodServiceIndexUrl({ lmId: lifeModule.lmId, pageUrl });
                break;
            case MODULE_TYPE_RECRUITSERVICE:
                lifeModule.url = getRecruitServiceIndexUrl({ lmId: lifeModule.lmId, pageUrl });
                break;
            case MODULE_TYPE_JOBSERVICE:
                lifeModule.url = getJobServiceIndexUrl({ lmId: lifeModule.lmId, pageUrl });
                break;
            case MODULE_TYPE_HOUSINGSERVICE:
                lifeModule.url = getHousingServiceIndexUrl({ lmId: lifeModule.lmId, pageUrl });
                break;
            case MODULE_TYPE_TONGCITYSERVICE:
                lifeModule.url = getTongcitySerivceIndexUrl({ lmId: lifeModule.lmId, pageUrl });
                break;
            case MODULE_TYPE_SELFDEFINGSERVICE:
                lifeModule.url = getSelfdefiningServiceIndexUrl({ lmId: lifeModule.lmId, relId: lifeModule.relId, pageUrl });
                break;
            default:
        }
    });
}

/**
 * 给生活置顶信息列表更多按钮设置跳转url
 */
export const insertUrlForLifeTopList = (lifeTopList, pageUrl) => {
    lifeTopList.forEach(lifeTop => {
        if (lifeTop.infoType.type == 1) {
            let moduleId = lifeTop.infoType.moduleId;
            moduleId = parseInt(moduleId);
            switch (moduleId) {
                case MODULE_ID_FOODSERVICE:
                    lifeTop.url = getFoodServiceIndexUrl({ pageUrl });
                    break;
                case MODULE_ID_RECRUITSERVICE:
                    lifeTop.url = getRecruitServiceIndexUrl({ pageUrl });
                    break;
                case MODULE_ID_JOBSERVICE:
                    lifeTop.url = getJobServiceIndexUrl({ pageUrl });
                    break;
                case MODULE_ID_HOUSINGSERVICE:
                    lifeTop.url = getHousingServiceIndexUrl({ pageUrl });
                    break;
                case MODULE_ID_TONGCITYSERVICE:
                    lifeTop.url = getTongcitySerivceIndexUrl({ pageUrl });
                    break;
                case MODULE_ID_SELFDEFININGSERVICE:
                    lifeTop.url = getSelfdefiningServiceIndexUrl({ relId: lifeTop.infoType.typeId, pageUrl })
                    break;
                default:
            }
        } else if (lifeTop.infoType.type == 2) {
            lifeTop.url = getTravelIndexUrl({ pageUrl });
        }
    });
}



export const hightlighKeyWord = (list, titleKey) => {
    if (list == null) {
        return;
    }
    list.forEach(info => {
        if (info.words != null) {
            info.words.forEach(word => {
                info[titleKey] = info[titleKey].replace(word, "<font style='color:#149ea4'>" + word + "</font>")
            });
        }
    });
}