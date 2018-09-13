/**
 * 页面请求
 */
import httputil from '../base/httputil'
import merge from '../../util/common/merge'

import { ERROR_CODE, NO_LOGIN, SUCCESS_CODE, REDIRECT_CODE, EXCEPTION_CODE } from '../base/result-code'

const handleResultError = (result, reqUrl) => {
    switch (result.code) {
        case NO_LOGIN: //未登录跳转到首页
            return Promise.reject({ url: "/" });
        case REDIRECT_CODE: //重定向
            return Promise.reject({ url: result.data });
        case EXCEPTION_CODE: // 服务器异常
            console.log("服务器异常:" + reqUrl);
            return Promise.reject({ msg: "数据服务器异常" });
        case ERROR_CODE: // 客户端原因
            console.log("请求错误:", result.msg);
            return Promise.reject({ msg: result.msg });
        default:
            return null;
    }
}

const handleResponseError = (error, reqUrl, headers) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        let status = error.response.status;
        switch (status) {
            case 404:
                console.log("找不到请求:" + reqUrl);
                return Promise.reject({ msg: "数据请求404" });
            case 500:
                return Promise.reject({ msg: "数据服务器异常" });
            default:
                return Promise.reject({ url: "服务器异常" });
        }
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        if (headers != null && headers["database-url"]) {
            console.log("数据服务器没有响应:" + headers["database-url"]);
        } else {
            console.log("数据服务器没有响应, url=" + reqUrl);
        }
        // console.log(error.request);
        return Promise.reject({ msg: "数据服务器没有响应" });
    } else if (error.url) {
        return Promise.reject({ url: error.url });
    } else if (error.msg) {
        return Promise.reject({ msg: error.msg });
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return Promise.reject({ msg: "前端服务器异常" });
    }
}

const getPageHttp = (url, params, request) => {
    return httputil.get(url, params, request)
        .then(response => {
            let result = response.data;
            if (result.code != SUCCESS_CODE) {
                let promise = handleResultError(result, url);
                if (promise != null) {
                    return promise;
                }
            }
            return response;
        }).catch(error => {
            return handleResponseError(error, url, request.headers);
        });
}

// 获取页面数据
export const getPageData = (request, params) => {
    let realParams = request.query;
    if (params) {
        realParams = merge(realParams, params);
    }
    if (request.url == "") {
        request.url = '/';
    }
    return getPageHttp("/s/weiapi" + request.url + "", realParams, request);
}
