import {
    getFoodServiceIndexUrl, getHousingServiceIndexUrl, getJobServiceIndexUrl, getRecruitServiceIndexUrl,
    getTongcitySerivceIndexUrl, getSelfdefiningServiceIndexUrl, getTravelIndexUrl, getTravelStrategyIndexUrl,
    getFoodServiceDetailUrl, getHousingServiceDetailUrl, getJobServiceDetailUrl, getRecruitServiceDetailUrl,
    getTongcitySerivceDetailUrl, getSelfdefiningServiceDetailUrl, getTravelDetailUrl, getTravelStrategyDetailUrl
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
        if (lifeModule.moduleList != null) {
            let moduleType = lifeModule.moduleList[0].moduleType;
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
                    lifeModule.url = getSelfdefiningServiceIndexUrl({ lmId: lifeModule.lmId, relId: lifeModule.moduleList[0].relId, pageUrl });
                    break;
                default:
            }
        }
    });
}

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
                    if (lifeTop.infoList != null) {
                        insertUrlForFoodServiceList(lifeTop.infoList, pageUrl);
                    }
                    break;
                case MODULE_ID_RECRUITSERVICE:
                    lifeTop.url = getRecruitServiceIndexUrl({ pageUrl });
                    if (lifeTop.infoList != null) {
                        insertUrlForRecruitServiceList(lifeTop.infoList, pageUrl);
                    }
                    break;
                case MODULE_ID_JOBSERVICE:
                    lifeTop.url = getJobServiceIndexUrl({ pageUrl });
                    if (lifeTop.infoList != null) {
                        insertUrlForJobServiceList(lifeTop.infoList, pageUrl);
                    }
                    break;
                case MODULE_ID_HOUSINGSERVICE:
                    lifeTop.url = getHousingServiceIndexUrl({ pageUrl });
                    if (lifeTop.infoList != null) {
                        insertUrlForHousingServiceList(lifeTop.infoList, pageUrl);
                    }
                    break;
                case MODULE_ID_TONGCITYSERVICE:
                    lifeTop.url = getTongcitySerivceIndexUrl({ pageUrl });
                    if (lifeTop.infoList != null) {
                        insertUrlForTongcityServiceList(lifeTop.infoList, pageUrl);
                    }
                    break;
                case MODULE_ID_SELFDEFININGSERVICE:
                    lifeTop.url = getSelfdefiningServiceIndexUrl({ relId: lifeTop.infoType.typeId, pageUrl })
                    if (lifeTop.infoList != null) {
                        insertUrlForSelfdefiningServiceList(lifeTop.infoList, pageUrl);
                    }
                    break;
                default:
            }
        } else if (lifeTop.infoType.type == 2) {
            lifeTop.url = getTravelIndexUrl({ pageUrl });
            insertUrlForTravelList(lifeTop.infoList, pageUrl);
        }
    });
}
/**
 * 给旅游攻略设置跳转url
 */
export const insertUrlForTravelStrategyList = (travelStrategyList, pageUrl) => {
    if (travelStrategyList == null) {
        return
    }
    travelStrategyList.forEach(travelStrategy => {
        travelStrategy.url = getTravelStrategyDetailUrl({ id: travelStrategy.strategyId, pageUrl })
    });
};

/**
 * 给旅游套餐设置跳转url
 */
export const insertUrlForTravelList = (travelList, pageUrl) => {
    if (travelList == null) {
        return
    }
    travelList.forEach(travel => {
        travel.url = getTravelDetailUrl({ id: travel.travelId, pageUrl })
    });
}

/**
 * 给美食天地设置跳转url
 */
export const insertUrlForFoodServiceList = (foodServiceList, pageUrl) => {
    if (foodServiceList == null) {
        return
    }
    foodServiceList.forEach(foodService => {
        foodService.url = getFoodServiceDetailUrl({ id: foodService.id, pageUrl })
    });
}

/**
 * 给房产信息设置跳转url
 */
export const insertUrlForHousingServiceList = (housingServiceList, pageUrl) => {
    if (housingServiceList == null) {
        return
    }
    housingServiceList.forEach(housingService => {
        housingService.url = getHousingServiceDetailUrl({ id: housingService.id, pageUrl });
    });
}

/**
 * 给求职设置跳转url
 */
export const insertUrlForJobServiceList = (jobServiceList, pageUrl) => {
    if (jobServiceList == null) {
        return
    }
    jobServiceList.forEach(jobService => {
        jobService.url = getJobServiceDetailUrl({ id: jobService.id, pageUrl });
    });
}



/**
 * 给招聘设置跳转url
 */
export const insertUrlForRecruitServiceList = (recruitServiceList, pageUrl) => {
    if (recruitServiceList == null) {
        return
    }
    recruitServiceList.forEach(recruitService => {
        recruitService.url = getRecruitServiceDetailUrl({ id: recruitService.id, pageUrl })
    });
}



/**
 * 给自定义生活服务设置跳转url
 */
export const insertUrlForSelfdefiningServiceList = (selfdefiningServiceList, pageUrl) => {
    if (selfdefiningServiceList == null) {
        return
    }
    selfdefiningServiceList.forEach(selfdefiningService => {
        selfdefiningService.url = getSelfdefiningServiceDetailUrl({ id: selfdefiningService.id, pageUrl })
    });
}


/**
 * 给同城服务设置跳转url
 */
export const insertUrlForTongcityServiceList = (tongcityServiceList, pageUrl) => {
    if (tongcityServiceList == null) {
        return
    }
    tongcityServiceList.forEach(tongcityService => {
        tongcityService.url = getTongcitySerivceDetailUrl({ id: tongcityService.id, pageUrl })
    });
}
