<template>
    <div v-infinite-scroll="loadBottom" infinite-scroll-disabled="scrollDisabled" infinite-scroll-distance="40" infinite-scroll-immediate-check="false">
        <slot></slot>
        <mt-spinner type="fading-circle" class="loading" v-show="loading" :size="40"></mt-spinner>
    </div>
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
            loadBottom() {
                this.$emit("loadBottom", this.loadDataBottomCallback);
            },
            loadDataBottomCallback(actionName, list) {
                let preLength = 0;
                if (list) {
                    if (list.length == 0) {
                        return;
                    }
                    preLength = list.length;
                }
                this.loading = true;
                // this.$nextTick(() => {
                //     window.scroll(0, window.document.body.clientHeight);
                // })
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
    .loading {
        padding: 0.5rem 0;
        display: block;
    }

    .loading .mint-spinner-fading-circle {
        margin: 0 auto;
    }
</style>