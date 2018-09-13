import { getPageData } from '@/api/wei/page'
import { pushArray, getPropertyOfLast } from '@/util/common/array'

const hightlighKeyWord = (infoList) => {
    infoList.forEach(info => {
        if (info.words != null) {
            info.words.forEach(word => {
                info.infoTitle = info.infoTitle.replace(word, "<font style='color:#149ea4'>" + word + "</font>")
            });
        }
    });
}
/** 
 * 新闻搜索页
 * 
 * @author wzw 
 * @since 2018-02026
 */
export default {
    namespaced: true,
    state () {
        return {
            list: null // 新闻列表
        }
    },
    actions: {
        fetchData ({ commit, dispatch, state, rootState }, params) {
            return getPageData(rootState.request, { infoTitle: rootState.request.query.keyword })
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("setData", result.data);
                    }
                    return response;
                })
        },
        fetchMore ({ commit, dispatch, state, rootState }) {
            return getPageData(rootState.request, { infoTitle: rootState.request.query.keyword, infoCentreId: getPropertyOfLast(state.list, "infoCentreId") })
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        commit("addList", result.data);
                    }
                    return response;
                })
        }
    },
    mutations: {
        setData (state, { list }) {
            state.list = list || [];
            hightlighKeyWord(state.list);
        },
        addList (state, { list }) {
            if (list != null) {
                hightlighKeyWord(list);
                pushArray(state.list, list);
            }
        }
    }
}