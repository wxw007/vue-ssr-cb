<template>
    <!--要闻-->
    <div class="top-news clearfix" v-if="isShow">
        <div class="top-news-left fl">
            <b>要闻</b>
        </div>
        <div class="top-news-right fl">
            <swiper class="top-news-turn" :options="swiperOptions">
                <div class="top-news-warp swiper-wrapper">
                    <touch-link tag="div" class="top-news-box swiper-slide" v-for="news in list" :key="news.infoCentreid" :href="news.url">
                        {{news.infoTitle}}
                    </touch-link>
                </div>
            </swiper>
        </div>
        <v-touch class="right-btn fr" @tap="toFlashNewsPage">
            <img src="~@/assets/m/images/38.jpg">
        </v-touch>
    </div>
</template>
<script>
    import { resolveUrl } from "@/util/common/url.js"
    /** 
     * 
     * @author wzw
     * @since 2018-02-06 08:30
     */
    export default {
        props: {
            list: {
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                swiperOptions: {
                    loop: false,
                    direction: 'vertical',
                    autoplay: {
                        delay: 3000
                    }
                },
            }
        },
        computed: {
            isShow() {
                return this.list != null && this.list.length > 0;
            },
            flashNewsPageUrl() {
                return resolveUrl(this.$store, "/n/m/info/flashnews")
            }
        },
        methods: {
            toFlashNewsPage() {
                this.$router.push(this.flashNewsPageUrl);
            }
        }
    }
</script>
<style>
    .top-news-turn {
        height: .82rem;
    }

    .top-news-box {
        display: flex;
        align-items: center;
        /* display: -webkit-box; */
        /* -webkit-box-orient: vertical; */
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
</style>