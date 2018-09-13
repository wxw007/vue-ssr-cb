import { getPageData } from '@/api/web/page'


/** 
 * 发布入口-选择类型页
 * 
 * @author wxw 
 * @since 2018-7-2
 */
export default {
    namespaced: true,
    state() {
        return {
            
        }
    },
    actions: {
        fetchData ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.pageUrl = rootState.request.url
                        dispatch("lifeIndexTemplate/setData", result.data, { root: true });
                    }
                    return response;
                })
        },
    },
    mutations: {
       

    }
}