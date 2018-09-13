<template>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="scrollDisabled" infinite-scroll-distance="40" infinite-scroll-immediate-check="false">
        <slot></slot>
        <div class="loading" v-show="busy"> </div>
    </div>
</template>

<script>
    import "@/util/plugins/infinite-scroll.js"

    export default {
        props: {
            disabled: {
                default: false
            }
        },
        data() {
            return {
                busy: false,
                noData: false
            }
        },
        computed: {
            scrollDisabled() {
                return this.busy || this.noData;
            }
        },
        methods: {
            loadMore() {
                this.$emit("loadMore", this.startLoadData);
            },
            startLoadData(promise, list) {
                let preLength = 0;
                if (list) {
                    preLength = list.length;
                }
                this.busy = true;
                promise.then(() => {
                    this.endLoadData();
                    if (list && list.length == preLength) {
                        this.noData = true;
                    }
                })
            },
            endLoadData() {
                this.busy = false;
            },
            reset() {
                this.busy = false;
                this.noData = false;
            }
        }
    }

</script>

<style scoped>
    .loading {
        background: url("~@/assets/web/loading.gif") center center;
        background-repeat: no-repeat;
        height: 15px;
        margin-top: 20px;
    }
</style>