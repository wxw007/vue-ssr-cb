import querystring from 'querystring'
import axios from 'axios'
import formdata from '../base/formdata'
import browser from '@/util/browser'


let instance = axios.create({
    timeout: 10000
});
const httputil = {
    http (method, url, params) {
        let $http = null;
        if (method == "get") {
            if (browser.isIE()) { // 解决ie浏览器请求缓存问题
                if (params) {
                    params._time = new Date().getTime();
                } else {
                    params = { _time: new Date().getTime() };
                }
            }
            if (params) {
                $http = instance.get(url, { params })
            } else {
                $http = instance.get(url);
            }
        } else {
            if (params) {
                if (window.FormData && params instanceof FormData) {
                } else {
                    params = querystring.stringify(params);
                }
                $http = instance.post(url, params);
            } else {
                $http = instance.post(url);
            }
        }
        return $http;
    },
    get (url, params) {
        return this.http("get", url, params)
    },
    post (url, params) {
        return this.http("post", url, params)
    },
    postForm (url, formModel) {
        return this.http("post", url, formdata.toFormData(formModel))
    }
};


export default httputil;
