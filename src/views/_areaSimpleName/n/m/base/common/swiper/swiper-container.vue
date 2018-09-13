<template>
    <div class="swiper-container" v-swiper:mySwiper="options">
        <slot></slot>
    </div>
</template>
<script>
    import '@/util/plugins/swiper.js'

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
        methods: {
            swiper() {
                return this.mySwiper;
            }
        }
    }
</script>