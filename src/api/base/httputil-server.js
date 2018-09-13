import querystring from 'querystring'
import axios from 'axios'
import merge from '../../util/common/merge'

const nullToDefault = (value, defaultValue) => {
  if (value == null) {
    return defaultValue;
  }
  return value;
}

const host = process.__database_url__
const instance = axios.create({
  baseURL: host,
  timeout: 10000
  //,
  //httpAgent: new http.Agent({ keepAlive: true })
});
const instance2 = axios.create({
  timeout: 10000
});

const createHttpPromise = (url, method, databaseUrl, params, headers) => {
  let axiosIntance = databaseUrl == null ? instance : instance2;
  let reqUrl = databaseUrl == null ? url : databaseUrl + url;

  return method == "get" ? axiosIntance.get(reqUrl, { params, headers })
    : axiosIntance.post(url, params, { headers });
}
const httputil = {
  http (method, url, params, { headers, query }) {
    headers = nullToDefault(headers, {});
    params = nullToDefault(params, {});

    if (query) {
      params = merge(params, query);
    }
    return createHttpPromise(url, method, headers["database-url"], params, headers);
  },
  post (url, params, options) {
    return this.http("post", url, params, options);
  },
  get (url, params, options) {
    return this.http("get", url, params, options);
  }
};

export default httputil;