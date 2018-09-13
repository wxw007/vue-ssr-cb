import {
    getFoodServiceDetailUrl, getHousingServiceDetailUrl, getJobServiceDetailUrl, getRecruitServiceDetailUrl, getTongcitySerivceDetailUrl, getSelfdefiningServiceDetailUrl
} from '../base/url/life-url-utils'

const MODULE_ID_FOODSERVICE = 1; // 美食天地
const MODULE_ID_RECRUITSERVICE = 4;// 招聘
const MODULE_ID_JOBSERVICE = 5; // 求职
const MODULE_ID_HOUSINGSERVICE = 6; // 房产信息
const MODULE_ID_TONGCITYSERVICE = 8; // 同城服务
const MODULE_ID_SELFDEFININGSERVICE = 9; // 自定义服务


export const insertForLifeserviceList = (serviceList, pageUrl) => {
    if (serviceList == null) {
        return;
    }
    serviceList.forEach(service => {
        let moduleId = parseInt(service.moduleId);
        let id = service.id;
        switch (moduleId) {
            case MODULE_ID_FOODSERVICE:
                service.url = getFoodServiceDetailUrl({ pageUrl, id });
                break;
            case MODULE_ID_HOUSINGSERVICE:
                service.url = getHousingServiceDetailUrl({ pageUrl, id });
                break;
            case MODULE_ID_JOBSERVICE:
                service.url = getJobServiceDetailUrl({ pageUrl, id });
                break;
            case MODULE_ID_RECRUITSERVICE:
                service.url = getRecruitServiceDetailUrl({ pageUrl, id });
                break;
            case MODULE_ID_TONGCITYSERVICE:
                service.url = getTongcitySerivceDetailUrl({ pageUrl, id });
                break;
            case MODULE_ID_SELFDEFININGSERVICE:
                service.url = getSelfdefiningServiceDetailUrl({ pageUrl, id });
                break;
            default:

        }
    })
}