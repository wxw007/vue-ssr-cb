<template>
    <div>
        <div class="float-title-height"></div>
        <div class="float-top">
            <div class="common-top-nav cborder-bg" v-if="isShow">
                <backBtn v-show="showBackBtn"></backBtn>
                <swiper :options="swiperOption" class="disable-tap-highlight" ref="mySwiper">
                    <div class="swiper-wrapper">
                        <v-touch tag="div" class="top-nav-box swiper-slide" v-for="(tab, index) in tabList" :key="tab.moduleName" :class="{'on':isCurrent(tab.url, index)}" @tap="toUrl(tab, index)">{{tab.moduleName}}</v-touch>
                    </div>
                </swiper>
                <!-- <div class="top-nav-box on">美食天地</div> -->
                <!-- <div class="top-nav-box">生活指南</div> -->
                <touch-link class="common-search-btn" :to="searchPageUrl">
                    <img src="~@/assets/m/images/6.png">
                </touch-link>
            </div>
        </div>
    </div>
</template>
<script>
    /** 
     * 
     * @author wzw
     * @since 2018-02-06 10:56
     */
    import backBtn from "../../base/common/back-btn.vue"

    export default {
        props: {
            tabList: {
                default() {
                    return [];
                }
            },
            searchPageUrl: {
                default: ""
            }
        },
        data() {
            const _this = this;
            return {
                swiperOption: {
                    slidesPerView: 'auto',
                    spaceBetween: 5,
                    centeredSlides: true,
                    on: {
                        init() {
                            _this.$nextTick(() => {
                                _this.$refs.mySwiper.swiper().slideTo(_this.currentIndex, 0, false);
                            });
                        },
                        slideChange() {
                            if (this.activeIndex != _this.currentIndex) {
                                _this.$router.replace(_this.tabList[this.activeIndex].url);
                            }
                        }
                    }

                },
                currentIndex: 0,
                showBackBtn: true
            }
        },
        computed: {
            isShow() {
                return this.tabList != null && this.tabList.length > 0;
            }
        },
        mounted() {
            if (window.history && window.history.length == 1) {
                this.showBackBtn = false;
            }
        },
        methods: {
            isCurrent(url, targetIndex) {
                if (url == null || url == "") {
                    return true;
                }
                let relId = this.getQueryString(url, "relId");

                let index = url.indexOf("?");
                if (index >= 0) {
                    url = url.substring(0, index);
                }

                if (this.$route.path == url) {
                    if (relId && relId != this.$route.query.relId) {
                        return false;
                    }
                    if (this.currentIndex != targetIndex) {
                        if (this.$refs.mySwiper) {
                            this.$refs.mySwiper.swiper().slideTo(targetIndex, 0, false);
                        }
                    }
                    this.currentIndex = targetIndex;
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
            toUrl(tab, index) {
                this.currentIndex = index;
                this.$router.replace(tab.url);
            }
        },
        components: {
            backBtn
        }
    }
</script>
<style scoped>
    .common-top-nav .swiper-container {
        width: 6rem;
    }

    .float-top {
        z-index: 100 !important;
    }

    .top-nav-box {
        width: auto;
    }
</style>