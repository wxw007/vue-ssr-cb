
export default {
    setHead (state, head) {
        if (head == null) {
            return;
        }
        let title = head.title
        let meta = head.meta
        let link = head.link

        state.title = title || ""
        state.meta = meta || []
        state.link = link || []
    },
    setTitle (state, title) {
        if (title == null) {
            state.title = ""
            return
        }
        state.title = title
    },
    setMeta (state, meta) {
        if (meta == null) {
            state.meta = []
            return
        }
        state.meta = meta
    },
    setLink (state, link) {
        if (link == null) {
            state.link = []
            return
        }
        state.link = link
    },
    addScript (state, scriptUrl) {// 只在服务端环境有效
        if (scriptUrl == null) {
            return
        }
        state.scriptUrls.push(scriptUrl);
    },
    addScripts (state, scriptUrls) {// 只在服务端环境有效
        if (scriptUrls == null || scriptUrls.length == 0) {
            return
        }
        scriptUrls.forEach(scriptUrl => {
            state.scriptUrls.push(scriptUrl)
        })
    },
    setRequest (state, request) {
        state.request = request;
    }
}
