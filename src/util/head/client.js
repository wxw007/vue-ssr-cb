

export default {// 客户端title和meta处理
    handle ({ store, router }) {
        // 监听title
        store.watch(
            state => state.title,
            title => {
                document.title = title;
            }
        )

        // 监听meta
        store.watch(
            state => state.meta,
            meta => {
                let metaObjs = document.querySelectorAll("[server-meta]");
                if (meta.length < metaObjs.length) {
                    const count = metaObjs.length - meta.length;
                    let header = document.querySelector("head");
                    for (let i = 0; i < count; i++) {
                        header.removeChild(metaObjs[i]);
                    }
                } else if (meta.length > metaObjs.length) {
                    const count = meta.length - metaObjs.length;
                    let header = document.querySelector("head");
                    for (let i = 0; i < count; i++) {
                        let metaObj = document.createElement("meta");
                        metaObj.setAttribute("server-meta", "")
                        header.appendChild(metaObj);
                    }
                }
                metaObjs = document.querySelectorAll("[server-meta]");
                for (let i = 0; i < metaObjs.length; i++) {
                    let metaObj = metaObjs[i];
                    let m = meta[i];

                    let attrs = metaObjs[i].attributes
                    for (let key in attrs) {
                        if (key === "server-meta") {
                            continue;
                        }
                        metaObj.removeAttribute(key);
                    }

                    for (let key in m) {
                        metaObj.setAttribute(key, m[key]);
                    }
                }
            }
        )

        // 监听link
        store.watch(
            state => state.link,
            link => {
                let linkObjs = document.querySelectorAll("[server-link]");
                if (link.length < linkObjs.length) {
                    const count = linkObjs.length - link.length;
                    let header = document.querySelector("head");
                    for (let i = 0; i < count; i++) {
                        header.removeChild(linkObjs[i]);
                    }
                } else if (link.length > linkObjs.length) {
                    const count = link.length - linkObjs.length;
                    let header = document.querySelector("head");
                    for (let i = 0; i < count; i++) {
                        let linkObj = document.createElement("link");
                        linkObj.setAttribute("server-link", "")
                        header.appendChild(linkObj);
                    }
                }
                linkObjs = document.querySelectorAll("[server-link]");
                for (let i = 0; i < linkObjs.length; i++) {
                    let linkObj = linkObjs[i];

                    let attrs = linkObjs[i].attributes
                    for (let key in attrs) {
                        if (key === "server-link") {
                            continue;
                        }
                        linkObj.removeAttribute(key);
                    }

                    let l = link[i];
                    for (let key in l) {
                        linkObj.setAttribute(key, l[key]);
                    }
                }
            }
        )
    },
    setHead (responses, store) {
        if (responses == null) {
            return
        }
        responses.forEach(response => {
            this.setHeadSingle(response, store)
        });
    },
    setHeadSingle (response, store) {
        if (response == null) {
            return;
        }
        let result = response.data;
        if (result.success && result.head != null) {
            store.commit("setHead", result.head);
        } else {
            store.commit("setHead", { title: "" });
        }
    }
}
