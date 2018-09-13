const allowReqHeaders = ["cookie", "user-agent", "x-real-ip", "database-url", "domain", "X-Forwarded-For"]
const allowResHeaders = ["set-cookie"]

const clone = (obj) => {
    if (obj == null) {
        return {}
    }
    let newObj = {}
    for (let key in obj) {
        newObj[key] = obj[key]
    }
    return newObj;
}

const cloneByKeys = (obj, keys) => {
    if (obj == null) {
        return
    }
    let newObj = {}
    keys.forEach(key => {
        let value = obj[key]
        if (value == null) {
            return
        }
        newObj[key] = value
    })
    return newObj
}

/**
 *  设置文档标题
 */
const setTitle = ({ store, context }) => {
    let title = store.state.title
    if (title == null || title == '') {
        return
    }
    context.title = store.state.title
}

/**
 * 设置文档头部
 */
const setMetaAndLink = ({ store, context }) => {
    let html = ""

    const meta = store.state.meta
    if (meta != null) {
        meta.forEach(m => {
            html += "<meta server-meta ";
            for (let key in m) {
                html += " " + key + "=\"" + m[key] + "\"";
            }
            html += " >"
        })
    }
   
    const link = store.state.link
    if (link != null) {
        link.forEach(l => {
            html += "<link server-link "
            for(let key in l){
                html += " " + key + "=\"" + l[key] + "\""
            }
            html += " >"
        })
    }

    context.head = html;
}


/**
 *  设置文档script
 */
const setScriptUrl = ({ store, context }) => {
    const scriptUrls = store.state.scriptUrls
    if (scriptUrls == null || scriptUrls.length == 0) {
        context.scriptHtml = ""
        return
    }
    let scriptHtml = ""
    scriptUrls.forEach(scriptUrl => {
        scriptHtml += "<script  src='" + scriptUrl + "'></script>";
    });
    context.scriptHtml = scriptHtml
}



/**
 * 设置响应数据到store里
 */
const setResponseToStore = ({ responses, store }) => {
    responses.forEach(response => {
        if (response == null) {
            return
        }

        let result = response.data
        if (result == null || !result.success || result.head == null) {
            return
        }

        store.commit("setTitle", result.head.title)
        store.commit("setMeta", result.head.meta)
        store.commit("addScripts", result.head.scriptUrls)
        store.commit("setLink", result.head.link)

    });
}

/**
 * 设置响应头
 */
const setResponseHeader = ({ responses, context }) => {
    for (let i = 0; i < responses.length; i++) {
        let response = responses[i]
        if (response == null) {
            continue
        }

        const resHeaders = response.headers;
        if (resHeaders == null) {
            continue
        }

        context.reqHeaders = cloneByKeys(resHeaders, allowResHeaders)
    }
}

export default {
    setRequestToStore ({ context, store, url, route }) {
        const request = {};

        request.headers = cloneByKeys(context.reqHeaders, allowReqHeaders)

        request.query = clone(route.query)

        request.url = route.path

        store.commit("setRequest", request);
    },
    setResponseToStoreAndContext ({ responses, context, store }) {
        if (responses == null) {
            return;
        }

        setResponseToStore({ responses, store })
        setTitle({ store, context })
        setMetaAndLink({ store, context })
        setScriptUrl({ store, context })
        setResponseHeader({ context, responses })
    }
}