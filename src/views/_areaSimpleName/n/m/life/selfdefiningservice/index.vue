<template>
    <div class="container">
        <!--美食天地-->
        <div class="eat">
            <tabList :tabList="childLifeModuleList" :searchPageUrl="searchPageUrl"></tabList>

            <!--下拉选择模块-->
            <selectList :selectList="selectList"></selectList>

            <div class="inner">
                <infiniteScroll @loadBottom="loadMore">
                    <list :list="list"></list>
                </infiniteScroll>
            </div>
        </div>
        <css></css>
         <img class="publish-icon" src="@/assets/m/images/publish-btn.png" alt="" @click="gotoPublish">
    </div>
</template>
<script>
    /** 
     * 自定义
     * @author wzw
     * @since 2018-02-05 20:09
     */
    import { isLogin } from '@/util/common/isLogin.js'
    import { getQueryString } from '@/util/common/getQueryString.js'
    import { mapState } from "vuex"
    import selfdefiningServiceIndex from "@/store/modules/m/life/selfdefiningservice/index.js"
    import selectList from '../base/select-list.vue'
    import tabList from '../base/tab-list.vue'
    import list from './base/list.vue'
    import '../../base/common/global.js'
    import '../../base/common/swiper.js'
    import '../../base/common/list.js'

    import { resolveUrl } from "@/util/common/url.js"
    export default {
        storeModule() {
            return { selfdefiningServiceIndex };
        },
        asyncData({ store, route, params, query }) {
            return store.dispatch("selfdefiningServiceIndex/fetchData");
        },
        computed: {
            ...mapState("selfdefiningServiceIndex", ["list", "selectList", "childLifeModuleList"]),
            searchPageUrl() {
                return resolveUrl(this.$store, "/n/m/life/selfdefiningservice/search?relId=" + this.$route.query.relId)
            }
        },
        components: {
            tabList,
            selectList,
            list
        },
        methods: {
            loadMore(callback) {
                callback("selfdefiningServiceIndex/fetchMore", this.list);
            },
            gotoPublish(){
                function go(){
                    let host = window.location.href;
                    let preUrl = host.split('?')[0];
                    window.location.href = preUrl + '/addView?selfdefiningTypeId=' + getQueryString('relId')
                }
                isLogin(go);
            }
        }
    }
</script>
<style scoped>
    .container .inner {
        padding-bottom: 0;
    }
    .container .publish-icon {
        position: fixed;
        width: 50px;
        height: 50px;
        bottom: 78px;
        right: 15px;
    }
</style>