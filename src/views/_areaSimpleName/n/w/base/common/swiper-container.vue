<template>
    <div v-if="isIE" class="swiper-container" :id="id">
        <slot></slot>
    </div>
    <div v-else class="swiper-container" v-swiper:mySwiper="options">
        <slot></slot>
    </div>
</template>
<script>
    import '@/util/plugins/swiper.js'
    import browser from '@/util/browser'

    const importSwiper2 = () => import("../static/swiper2/index.js");

    let swiper2Promise = null;

    let count = 1;

    export default {
        props: {
            options: {
                default() {
                    return {
                        loop: true,
                        speed: 300,
                        autoplay: {
                            delay: 3000
                        }
                    };
                }
            }
        },
        data() {
            return {
                isIE: false,
                id: ""
            };
        },
        beforeMount() {
            this.isIE = browser.isIE();
        },
        mounted() {
            if (!this.isIE) {
                return;
            }
            if (swiper2Promise == null) {
                swiper2Promise = importSwiper2();
            }
            this.id = "swiper" + (count++);
            swiper2Promise.then((module) => {
                this.$nextTick(() => {
                    let tempOptions = this.options;
                    let options = {};
                    // options.loop = true;// ie下必须为true, 不然一些情况会有问题
                    if (tempOptions.loop) {
                        options.loop = tempOptions.loop;
                    }
                    if (tempOptions.autoplay) {
                        options.autoplay = tempOptions.autoplay.delay;
                    }
                    if (tempOptions.speed) {
                        options.speed = tempOptions.speed;
                    }
                    if (tempOptions.pagination) {
                        if (tempOptions.pagination.el) {
                            options.pagination = tempOptions.pagination.el;
                        }
                        if (tempOptions.pagination.clickable) {
                            options.paginationClickable = tempOptions.pagination.clickable;
                        }
                    }
                    if (tempOptions.on) {
                        if (tempOptions.on.slideChange) {
                            options.onSlideChangeStart = tempOptions.on.slideChange;
                        }
                    }
                    if (tempOptions.slidesPerView) {
                        options.loop = false;// 多组时下必须为true, 不然一些情况会有问题
                        options.slidesPerView = tempOptions.slidesPerView;
                    }
                    if (tempOptions.slidesPerGroup) {
                        options.loop = false;
                        options.slidesPerGroup = tempOptions.slidesPerGroup;
                    }

                    let Swiper = module.default;
                    let mySwiper = new Swiper("#" + this.id, options);
                    if (tempOptions.navigation) {
                        if (tempOptions.navigation.prevEl) {
                            let prevEl = document.querySelector(tempOptions.navigation.prevEl);
                            if (prevEl != null) {
                                prevEl.addEventListener("click", () => {
                                    mySwiper.swipePrev();
                                })
                            }
                            if (tempOptions.navigation.nextEl) {
                                let nextEl = document.querySelector(tempOptions.navigation.nextEl)
                                if (nextEl != null) {
                                    nextEl.addEventListener("click", () => {
                                        mySwiper.swipeNext();
                                    })
                                }
                            }
                        }
                    }
                    this.swiper2 = mySwiper;
                })
            })
        },
        methods: {
            slideTo(index) {
                if (this.mySwiper) {
                    this.mySwiper.slideTo(index, 300, false);
                }
                if (this.swiper2) {
                    this.swiper2.swipeTo(index, 300, false);
                }
            },
            slidePrev() {
                if (this.mySwiper) {
                    this.mySwiper.slidePrev();
                }
                if (this.swiper2) {
                    this.swiper2.swipePrev();
                }
            },
            slideNext() {
                if (this.mySwiper) {
                    this.mySwiper.slideNext();
                }
                if (this.swiper2) {
                    this.swiper2.swipeNext();
                }
            }
        }
    }
</script>