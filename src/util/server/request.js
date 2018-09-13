export default {
    setRequestToStore ({ store, route }) {
        let query = {};
        if (route.query) {
            for (let key in route.query) {
                query[key] = route.query[key];
            }
        }
        store.commit("setRequest", { url: route.path, query })
    }
}