export const cachePageData = (store, moduleName) => {
    const state = store.state[moduleName]
    const rootState = store.state;
    let data = {};
    for (let key in state) {
        data[key] = state[key];
    }
    return { success: true, data, head: { title: rootState.title, meta: rootState.meta } }
};
