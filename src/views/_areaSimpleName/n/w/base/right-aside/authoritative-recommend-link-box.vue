<template>
   
    <div class="blogroll_box" v-if="authoritativeRecommendationMap != null">
        <div class="blue_header clearfloat">
            <h3>{{authoritativeRecommendationMap.friendLinkName}}</h3>
        </div>
        <div class="blogroll_area clearfloat">
            <a v-for="friendlyLink in authoritativeRecommendationMap.friendlyLinkList" :key="friendlyLink.friendlyLinkId"
            :href="friendlyLink.url" target="_blank">
                {{friendlyLink.friendLinkName}}
            </a>
        </div>
    </div>
</template>
<script>
    /** 
     * 权威推荐
     * @author jiemin
     * @author wzw
     * @date 2017-12-20
     */
    export default {
        props: ["authoritativeRecommendationMap"]
    }
</script>
<style>
    /* 
     *友情链接区域
     */
    .blogroll_box {
        width: 100%;
        margin-top: 30px;
    }

    .blogroll_box .blogroll_area {
        padding: 12px 0 0;
    }

    .blogroll_box .blogroll_area a {
        float: left;
        font-size: 14px;
        color: #666;
        height: 26px;
        line-height: 26px;
        margin-right: 20px;
    }
</style>