<template>
    <div class="common-main-title" v-once>
        <touch-link class="top-address clearfix" :to="areaUrl">
            <div class="logo fl">
                <img src="~@/assets/m/images/13.png" alt="">
            </div>
            <div class="address fl">{{area.areaName}}</div>
        </touch-link>
        <div class="main-title">
            <b>{{title}}</b>
        </div>
        <touch-link class="common-search-btn" :to="searchPageUrl">
            <img src="~@/assets/m/images/6.png">
        </touch-link>
    </div>
</template>
<script>
    /** 
     * 顶部栏
     * 
     * @author wzw
     * @since 2018-02-06 19:14
     */
    import { resolveUrl } from "@/util/common/url.js"
    export default {
        props: {
            area: {
                default() {
                    return {};
                }
            },
            title: {
                default: ""
            }
        },
        computed: {
            areaUrl() {
                return resolveUrl(this.$store, "/n/m/area")
            },
            searchPageUrl() {
                return resolveUrl(this.$store, "/n/m/search")
            }
        }
    }
</script>