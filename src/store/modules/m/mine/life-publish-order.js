/** 
 * 移动端-我的-生活发布
 * 
 * @author wxw 
 * @since 2018-7-14
 */
import { lifePublishOrder } from '@/api/wei'
export default {
    namespaced: true,
    state () {
        return {
           
        }
    },
    mutations: {
        setData (state, {}) {
           
        }
    },
    
    actions: {
        fetchData ({commit}) {
            return lifePublishOrder()
                .then(response => {
                    let result = response.data;
                    // if (result.success) {
                        // commit('setData', result.data, { root: true });
                    // }
                    return response;
                })
        }
    }
   
}