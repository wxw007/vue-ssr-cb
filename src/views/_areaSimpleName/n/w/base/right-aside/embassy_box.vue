<template>
    <!-- 大使馆直通车 -->
    <div class="embassy_box" v-if="showEmbassy">
        <div class="blue_header clearfloat">
            <h3>大使馆直通车</h3>
        </div>
        <div class="embassy_area">
            <a :href="embassy.embassyUrl" target="_blank">
                <img :src="embassy.embassyImg" :alt="embassy.embassyName">
            </a>
        </div>
    </div>
</template>
<script>
    export default {
        props: ["embassy"],
        computed: {
            showEmbassy() {
                return this.embassy != null && this.embassy.embassyImg != null && this.embassy.embassyImg != '';
            }
        }
    }
</script>
<style>
    /* 
     *大使馆直通车样式
     */

    .embassy_box {
        width: 100%;
        padding-top: 30px;
        background: #fff;
        z-index: 20;
    }

    .embassy_box .embassy_area {
        width: 100%;
    }

    .embassy_box .embassy_area a {
        display: block;
        width: 100%;
        margin-top: 20px;
    }

    .embassy_box .embassy_area a img {
        width: 100%;
    }
</style>