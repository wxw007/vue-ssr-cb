<template>
    <mt-loadmore :top-method="loadTop" ref="loadmore" topPullText="" topDropText="" topLoadingText="" v-infinite-scroll="loadBottom" infinite-scroll-disabled="scrollDisabled" infinite-scroll-distance="40" infinite-scroll-immediate-check="false">
        <slot></slot>
        <mt-spinner type="fading-circle" class="loading" v-show="loading" :size="40"></mt-spinner>
        <!-- <div class="loading" v-show="loading"> </div> -->
    </mt-loadmore>
</template>
<script>

    /** 
     * 
     * @author wzw
     * @since 2018-02-05 15:00
     */
    export default {
        data() {
            return {
                loading: false,
                allLoaded: false
            }
        },
        computed: {
            scrollDisabled() {
                return this.loading || this.allLoaded;
            }
        },
        methods: {
            loadTop() {
                this.$emit("loadTop", this.loadDataTopCallback);
            },
            loadBottom() {
                this.$emit("loadBottom", this.loadDataBottomCallback);
            },
            loadDataTopCallback(actionName) {
                return this.$store.dispatch(actionName).then(response => {
                    this.$refs.loadmore.onTopLoaded();
                    return response;
                });
            },
            loadDataBottomCallback(actionName, list) {
                let preLength = 0;
                if (list) {
                    preLength = list.length;
                }
                this.loading = true;
              
                return this.$store.dispatch(actionName).then(response => {
                    this.loading = false;
                    if (list && list.length == preLength) {
                        this.allLoaded = true;
                    }
                    return response;
                });
            },
            reset() {
                this.loading = false;
                this.allLoaded = false;
            }
        }
    }
</script>
<style>
    .loading{
        padding: 0.5rem 0;
        display: block;
    }

    .loading .mint-spinner-fading-circle {
        margin: 0 auto;
    }
</style>