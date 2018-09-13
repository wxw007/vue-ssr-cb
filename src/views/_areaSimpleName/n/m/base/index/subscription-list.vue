<template>
    <div style="position: relative">
        <swiper class="sub-nav-warp   disable-tap-highlight " :options="swiperOptions" ref="mySwiper" style="    margin-right: .70rem;">
            <div class="sub-nav clearfix swiper-wrapper ">
                <v-touch class="sub-nav-box  fl swiper-slide" v-for="(subscription, index) in subscriptionList" :key="subscription.infoTypeId" :class="{'on':currentIndex == index}" @tap="to(subscription, index)">
                    {{subscription.infoTypeName}}
                    <div class="sub-nav-line "></div>
                </v-touch>
            </div>
        </swiper>
        <touch-link v-once class="sub-nav-box-last fl" :href="subscriptionUrl">
            <img src="~@/assets/m/images/7.png">
        </touch-link>
    </div>
</template>
<script>
    import { resolveUrl } from "@/util/common/url.js"
    /**
     * 新闻分类
     * @author wzw
     * @since 2018-02-06 08:21
     */
    export default {
        props: {
            subscriptionList: {
                default() {
                    return [];
                }
            }
        },
        data() {
            const _this = this;
            return {
                swiperOptions: {
                    slidesPerView: "auto",
                    freeMode: true,
                    mousewheel: true,
                    on: {
                        init() {
                            _this.$nextTick(() => {
                                _this.$refs.mySwiper
                                    .swiper()
                                    .slideTo(Math.max(_this.currentIndex - 2, 0), 10, false);
                            });
                        }
                    }
                },
                currentIndex: 0
            };
        },
        computed: {
            subscriptionUrl() {
                return resolveUrl(this.$store, "/n/m/info/subscription")
            }
        },
        created() {
            const infoTypeId = this.$route.query.infoTypeId;
            if (infoTypeId == null) {
                this.currentIndex = 0;
                return;
            }
            for (let i = 0; i < this.subscriptionList.length; i++) {
                let subscription = this.subscriptionList[i];
                if (subscription.infoTypeId == infoTypeId) {
                    this.currentIndex = i;
                    return;
                }
            }
        },
        methods: {
            to(subscription, index) {
                this.currentIndex = index;
                this.$router.replace(subscription.url);
                this.$nextTick(() => {
                    this.$refs.mySwiper.swiper().slideTo(Math.max(index - 3, 0), 10, false);
                })
            }
        }
    };
</script>
<style>
    .sub-nav-warp .swiper-wrapper {
        display: flex;
    }

    .sub-nav-warp .swiper-slide {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        white-space: nowrap;
        width: auto;
        flex-shrink: 0;
    }

    /*副导航*/

    /* .sub-nav-warp { */

    /* width: 100%; */

    /* overflow: auto; */

    /* } */

    .sub-nav {
        padding: 0 0.15rem;
        /* width: 200%; */
    }

    .sub-nav-warp .sub-nav-box {
        /* width: 1.08rem; */
        color: #17191a;
        text-align: center;
        font-size: 0.3rem;
        position: relative;
        height: 0.54rem;
        margin-left: 11px;
        margin-right: 11px;
        line-height: 0.5rem;
        width: auto;
    }

    .sub-nav-box.on {
        color: #149ea4;
        /* border-bottom: .04rem #149ea4 solid; */
    }

    .sub-nav-line {
        height: 0.04rem;
        background: #149ea4;
        /* position: absolute; */
        /* bottom: 0; */
        /* left: .34rem; */
        width: 0.4rem;
        margin: 0 auto;
        display: none;
    }

    .sub-nav-box.on .sub-nav-line {
        display: block;
    }

    .sub-nav-box-last {
        position: absolute;
        right: 0.15rem;
        top: 0;
        width: 0.35rem;
        height: 0.35rem;
        margin: 0.03rem 0rem 0 0.15rem;
        background: #fff;
    }

    .sub-nav-box-last:before {
        content: "";
        position: absolute;
        display: block;
        width: 50%;
        height: 100%;
        top: 0;
        left: 0;
        background: #fff;
        transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
    }

    .sub-nav-box-last:after {
        content: "";
        position: absolute;
        display: block;
        width: 50%;
        height: 100%;
        top: 0;
        right: 0;
        background: #fff;
        transform: translateX(100%);
        -webkit-transform: translateX(100%);
    }
</style>