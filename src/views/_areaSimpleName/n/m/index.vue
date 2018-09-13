<template>
    <div class="container">
        <!--首页-->
        <div class="index">
            <div class="float-height"></div>
            <div class="float-top">
                <top :area="curArea" :title="topTitle"></top>
                <subscriptionList :subscriptionList="subscriptionList"></subscriptionList>
            </div>
            <router-view></router-view>
            <div style="height: .98rem;"></div>
        </div>
        <footTab :isShowLifeService="curArea.isShowLifeService"></footTab>
        <css></css>
    </div>
</template>
<script>
    /** 
     * 首页
     * 
     * @author wzw
     * @since 2018-02-05 13:57
     */
    import { mapState } from "vuex"
    import index from "@/store/modules/m/index.js"
    import subscriptionList from "./base/index/subscription-list.vue"
    import footTab from "./base/foot/foot-tab.vue"
    import top from './base/index/top.vue'
    
    import './base/common/global.js'
    import './base/common/swiper.js'
    import './base/common/list.js'

    export default {
        storeModule() {
            return { index };
        },
        computed: {
            ...mapState("index", ["subscriptionList", "curArea", "topTitle"])
        },
        components: {
            subscriptionList,
            footTab,
            top
        }
    }
</script>