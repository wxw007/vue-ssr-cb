

import Vuex from 'vuex'
export const getAreaSimpleNameFromUrl = (url) => {
    let endIndex = url.indexOf("/", 1)
    let areaSimpleName = null
    if (endIndex >= 0) {
        areaSimpleName = url.substring(1, endIndex)
    } else {
        areaSimpleName = url.substring(1)
    }
    return areaSimpleName
}

export const resolveUrl = (pageUrl, url) => {
    if (pageUrl instanceof Vuex.Store) {
        pageUrl = pageUrl.state.request.url
    }
    let areaSimpleName = getAreaSimpleNameFromUrl(pageUrl)
    return `/${areaSimpleName}${url}`
}
