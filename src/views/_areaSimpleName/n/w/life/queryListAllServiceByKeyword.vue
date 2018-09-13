<template>
    <indexTemplate>
        <infiniteScroll @loadMore="loadMore" ref="infiniteScroll">
             <queryList :lifeModuleList="lifeModuleList" :bannerList="bannerList" :searchDataList="searchDataList"></queryList>
        </infiniteScroll>
    </indexTemplate>
</template>
<script>
    /** 
     * 生活首页
     * @author jiemin
     * @author wzw
     * @since 2017-12-26
     */
    import { mapState } from 'vuex'
    import { resolveUrl } from "@/util/common/url.js"
    import '@/util/plugins/swiper.js'
    import '@/util/plugins/lazyload.js'
    import infiniteScroll from '../base/common/infinite-scroll.vue'
    import indexTemplate from './base/layouts/index-template.vue'
    import queryList from "./base/index/queryList.vue"

    import queryListAllServiceByKeyword from '@/store/modules/web/life/queryListAllServiceByKeyword'

    export default {
        storeModule() {
            return { queryListAllServiceByKeyword };
        },
        asyncData({ store, route }) {
            return store.dispatch("queryListAllServiceByKeyword/fetchData");
        },
        data() {
            return {
                MODULE_ID_FOODSERVICE: '1', // 美食天地
                MODULE_ID_RECRUITSERVICE: '4',// 招聘
                MODULE_ID_JOBSERVICE: '5', // 求职
                MODULE_ID_HOUSINGSERVICE: '6', // 房产信息
                MODULE_ID_TONGCITYSERVICE: '8', // 同城服务
                MODULE_ID_SELFDEFININGSERVICE: '9' // 自定义服务
            };
        },
        computed: {
            ...mapState("queryListAllServiceByKeyword", ["embassy", "lifeTopInfoList", "bannerList", "lifeModuleList", "nativeData", "searchDataList", "noData"])
        },
        components: {
            indexTemplate,
            queryList,
            infiniteScroll
        },
        mounted(){
            this.addUrl()
        },
        methods:{
            addUrl(){
                var that = this;
                that.searchDataList.forEach(function(item, index){
                    if(item.goUrl.indexOf('http') > -1){
                        item.gotoUrl = item.goUrl 
                    } else {
                        item.gotoUrl = resolveUrl(that.$store, '/n/w/life/') + item.goUrl
                    }
                })
            },
            loadMore(callback) {
                if(this.noData){
                    this.$refs.infiniteScroll.noData = true;
                    return
                }
                callback(this.$store.dispatch("queryListAllServiceByKeyword/fetchMore"))
            },
        }
    };
</script>