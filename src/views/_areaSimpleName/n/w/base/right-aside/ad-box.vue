<template>
    <div class="ad_box" v-show="isShow">
        <div class="blue_header clearfloat">
            <h3>推广</h3>
        </div>
        <div class="ad_slide">
            <div>
                <a v-for="ad in adList" :key="ad.img" @click="jump(ad.toUrl)">
                    <img :src="ad.img">
                </a>
            </div>
            <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
            <!-- <div class="swiper-button-next" slot="button-next"></div> -->
        </div>
        <!--  <div class="ad_slide" v-swiper:mySwiper="swiperOption" v-else-if="adList != null">
            <div class="swiper-wrapper">
                <a v-for="ad in adList" :key="ad.img" class="swiper-slide">
                    <img :src="ad.img" @click="to(ad.toUrl)" />
                </a>
            </div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </div> -->
    </div>
</template>
<script>
    /** 
     * 广告不轮播
     * 
     * @author jiemin
     * @author wzw
     * @date 2017-01-17
     */
    export default {
        props: ["adList"],
        data() {
            return {

            };
        },
        computed: {
            isShow() {
                return this.adList != null && this.adList.length > 0;
            }
        },
        methods: {
            jump(url) {
                if (url != null && url != '') {
                    window.open(url);
                }
            }
        }
    }

</script>
<style scoped>
    /* 
     *推广样式
     */

    .ad_box {
        width: 100%;
        margin-top: 30px;
    }

    .ad_box .ad_slide a {
        display: inline-block;
        width: 100%;
        cursor: pointer;
        margin-top: 20px;
    }

    .ad_box .ad_slide a img {
        width: 100%;
        border: 1px solid #DFDFDF;
    }
</style>