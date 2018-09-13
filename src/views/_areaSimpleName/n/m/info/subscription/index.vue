<template>
    <div class="container">
        <!--所有频道-->
        <div class="channel bg">
            <div class="channel-top-title">
                <p>所有频道</p>
                <v-touch tag="a" class="close-btn" @tap="update()">
                    <img class="img" src="~@/assets/m/images/8.png">
                </v-touch>
            </div>
            <div class="inner">
                <div class="channel-choose">
                    <div class="channel-title">
                        <b>已选频道</b>
                    </div>
                    <div class="channel-choose-list clearfix">
                        <v-touch class="channel-box fl" v-for="(subscription, index) in subscriptionList" :key="subscription.infoTypeId" :class="{'active':subscription.readonly}" @tap="removeSubscription(index)">
                            <div class="add-logo">
                                <img src="~@/assets/m/images/7.png">
                            </div>
                            <div class="channel-content">{{subscription.infoTypeName}}</div>
                        </v-touch>
                    </div>
                    <div class="subscription-error" v-show="error">至少订阅三个</div>
                </div>
                <div class="channel-pool">
                    <div class="channel-title">
                        <b>更多频道</b>
                    </div>
                    <div class="channel-pool-list clearfix">
                        <v-touch class="channel-box fl" v-for="(subscription, index) in unSubscriptionList" :key="subscription.infoTypeId" @tap="removeUnSubscription(index)">
                            <div class="add-logo">
                                <img src="~@/assets/m/images/7.png">
                            </div>
                            <div class="channel-content">{{subscription.infoTypeName}}</div>
                        </v-touch>

                    </div>
                </div>
                <div class="all-msg hide" v-if="unSubscriptionList == null || unSubscriptionList.length == 0">全部频道已经添加</div>
            </div>
        </div>
        <css></css>
    </div>
</template>
<script>
    /** 
     * 新闻订阅页
     * 
     * @author wzw
     * @since 2018-02-06
     */
    import { mapState, mapMutations } from "vuex"
    import subscription from "@/store/modules/m/info/subscription/index.js"
    import '../../base/common/global.js'
    import { resolveUrl } from "@/util/common/url.js"
    export default {
        storeModule() {
            return { subscription };
        },
        asyncData({ store, route, params, query }) {
            return store.dispatch("subscription/fetchData");
        },
        data() {
            return {
                error: false,
                subscriptionIds: []
            }
        },
        computed: {
            ...mapState("subscription", ["subscriptionList", "unSubscriptionList"])
        },
        mounted() {
            this.subscriptionIds = this.subscriptionList.map(subscription => subscription.infoTypeId);
        },
        methods: {
            ...mapMutations("subscription", ["removeUnSubscription"]),
            removeSubscription(index) {
                if (this.subscriptionList.length <= 3) {
                    this.error = true;
                    setTimeout(() => {
                        this.error = false;
                    }, 3000)
                    return;
                }
                this.$store.commit("subscription/removeSubscription", index);
            },
            update() {
                let infoTypeIds = this.subscriptionList.map(subscription => subscription.infoTypeId);
                if (this.isEquals(this.subscriptionIds, infoTypeIds)) {
                    window.history.back();
                    return;
                }
                this.$store.dispatch("subscription/update", { infoTypeIds }).then(response => {
                    let result = response.data;
                    if (result.success) {
                        window.location = resolveUrl(this.$store, "/n/m");
                    }
                });
            },
            isEquals(array1, array2) {
                if (array1.length != array2.length) {
                    return false;
                }
                for (let i = 0; i < array1.length; i++) {
                    if (array1[i] != array2[i]) {
                        return false;
                    }
                }
                return true;
            }
        }
    }
</script>
<style>
    body {
        background: #f7f7f7;
    }

    .channel-box.active {
        background-color: #fbf9f9;
    }

    .close-btn {
        position: absolute;
        width: .3rem;
        height: 100%;
        /* height: .3rem; */
        /* top: .3rem; */
        top: 0;
        right: .3rem;
        /* background: url('~@/assets/m/images/8.png') no-repeat center center; */
    }

    .close-btn .img {
        width: .3rem;
        height: .3rem;
        display: inline-block;
    }


    .subscription-error {
        font-size: 0.2rem;
        color: #f74a4a;
    }
</style>