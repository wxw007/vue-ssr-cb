<template>
    <indexTemplate>
        <publish-tab-bar :currentIndex='currentIndex'></publish-tab-bar>
        <publish-type :publishTypeList='publishTypeList'></publish-type>
    </indexTemplate>
</template>
<script>
/** 
 * 
 * @author wxw
 * @since 2018-03-22 09:20
 */
import { getPublishType } from '@/api/web'
import { mapState } from 'vuex'
import indexTemplate from '../base/layouts/index-template.vue'
import publishTabBar from '../publish/base/publish-tab-bar.vue'
import publishType from '../publish/base/publish-type.vue'
import { resolveUrl } from "@/util/common/url.js"
import publishTypeData from '@/store/modules/web/life/publish/index.js'

export default {
    storeModule() {
        return { publishTypeData };
    },
    asyncData({ store, route }) {
        return store.dispatch("publishTypeData/fetchData");
    },
    components: {
        indexTemplate,
        publishTabBar,
        publishType
    },
    data() {
        return {
            currentIndex: 0,
            prefixUrl: resolveUrl(this.$store, '/n/w/life/'),
            publishTypeList: []
        }
    },

    mounted() {
        // this.setPublishType(this.$store.state.head.curArea.areaId);
        this.setPublishTypeData()
    },
    methods: {
        setPublishTypeData() {
            var that = this;
            return getPublishType()
                .then(response => {
                    console.log(response)
                    let result = response.data;
                    if (result.success) {
                        // this.publishTypeList = result.data
                        let arr = result.data;
                        arr.forEach(function(item) {
                            switch (item.moduleId) {
                                case '1':
                                    item.gotoUrl = that.prefixUrl + 'foodservice/addView?moduleName=' + item.moduleName
                                    break;
                                case '4':
                                    item.gotoUrl = that.prefixUrl + 'recruitservice/addView?moduleName=' + item.moduleName
                                    break;
                                case '5':
                                    item.gotoUrl = that.prefixUrl + 'jobservice/addView?moduleName=' + item.moduleName
                                    break;
                                case '6':
                                    item.gotoUrl = that.prefixUrl + 'housingservice/addView?moduleName=' + item.moduleName
                                    break;
                                case '8':
                                    item.gotoUrl = that.prefixUrl + 'tongcityservice/addView?moduleName=' + item.moduleName
                                    break;
                                case '9':
                                    item.gotoUrl = that.prefixUrl + 'selfdefiningservice/addView?moduleName=' + item.moduleName + '&selfdefiningTypeId=' + item.relId
                                    break;
                                default:
                                    break;
                            }
                        })
                        this.publishTypeList = arr;
                    }
                    return response;
                })
        },
    }
}
</script>
<style scoped>
</style>