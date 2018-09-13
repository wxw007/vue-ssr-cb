<template>
    <div class="life_nav_tab" v-if="isShow">
        <ul class="tab_btn">
            <li v-for="topLifeModule in topLifeModuleList" :key="topLifeModule.moduleName" :class="{'active':isCurrent(topLifeModule.url)}" @click="jump(topLifeModule.url)">{{topLifeModule.moduleName}}</li>

            <!-- <li v-for="topLifeModule in topLifeModuleList" :key="topLifeModule.moduleName" :class="{'active': currentUrl.indexOf(topLifeModule.url) > -1 }" @click="jump(topLifeModule.url)">{{topLifeModule.moduleName}}</li> -->

        </ul>
    </div>
</template>
<script>
    import browser from "@/util/browser"
    export default {
        props: {
            topLifeModuleList: {
                default() {
                    return [];
                }
            }
        },
        // data(){
        //    return{
        //      currentUrl: ''
        //    }
        // },
        // mounted(){
        //     this.currentUrl = window.location.href
        // },
        computed: {
            isShow() {
                return this.topLifeModuleList != null && this.topLifeModuleList.length > 0;
            }
        },
        methods: {
            isCurrent(url) {
                let relId = this.getQueryString(url, "relId");

                let index = url.indexOf("?");
                if (index >= 0) {
                    url = url.substring(0, index);
                }

                if (this.$route.path == url) {
                    if (relId && relId != this.$route.query.relId) {
                        return false;
                    }
                    return true;
                }
                return false;
            },
            getQueryString(url, name) {
                let index = url.indexOf("?");
                if (index < 0) {
                    return null;
                }
                //用字符串拼接
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = url.substr(index + 1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },
            jump(url) {
                if (browser.isIE()) {
                    window.location = url;
                } else {
                    this.$router.push(url);
                }
            }
        }
    }
</script>

<style>
    /*  分页面的tab切换按钮样式 */

    .life_nav_tab {
        width: 100%;
        font-size: 16px;
    }

    .life_nav_tab .tab_btn {
        display: block;
        width: 100%;
        height: 36px;
        border-bottom: 2px solid #0082c6;
        margin-bottom: 12px;
    }

    .life_nav_tab .tab_btn li {
        float: left;
        display: block;
        width: 120px;
        height: 36px;
        line-height: 38px;
        color: #0082c6;
        text-align: center;
        cursor: pointer;
    }

    .life_nav_tab .tab_btn .active {
        color: #fff;
        background-color: #0082c6;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
</style>