import { getPageData } from '@/api/web/page'

export default {
    namespaced: true,
    state () {
        return {
        }
    },
    actions: {
        fetchData ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request)
        }
    }
}