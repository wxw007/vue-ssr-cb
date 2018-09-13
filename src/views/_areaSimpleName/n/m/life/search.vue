<template>
    <div class="container">
        <div class="life">
            <searchBox></searchBox>
            <div class="type-container clearfix" v-if="showTypeList">
                <v-touch class="type-box" :class="{'active':isActive(type.serviceTypeId)}" v-for="type in typeList" :key="type.serviceTypeId" @tap="selectType(type.serviceTypeId)">{{type.serviceTypeName}}</v-touch>
            </div>
            <div class="inner">
                <infiniteScroll @loadBottom="loadMore">
                    <div v-for="data in dataList" :key="data.id">
                        <template v-if="data.dataType == DATATYPE_TRAVELSTRATEGY">
                            <travelStrategyItem :data="data"></travelStrategyItem>
                        </template>
                        <template v-else-if="data.dataType == DATATYPE_TRAVEL">
                            <travelItem :data="data"></travelItem>
                        </template>
                        <template v-else-if="data.dataType == DATATYPE_FOODSERVICE">
                            <foodItem :data="data"></foodItem>
                        </template>
                        <template v-else-if="data.dataType == DATATYPE_RECRUITSERVICE">
                            <recruitItem :data="data"></recruitItem>
                        </template>
                        <template v-else-if="data.dataType == DATATYPE_JOGSERVICE">
                            <jobItem :data="data"></jobItem>
                        </template>
                        <template v-else-if="data.dataType == DATATYPE_HOUSINGSERVICE">
                            <housingItem :data="data"></housingItem>
                        </template>
                        <template v-else-if="data.dataType == DATATYPE_TONGCITYSERVICE">
                            <tongcityItem :data="data"></tongcityItem>
                        </template>
                        <template v-else-if="data.dataType == DATATYPE_SELFDEFININGSERVICE">
                            <selfdefiningItem :data="data"></selfdefiningItem>
                        </template>
                    </div>
                </infiniteScroll>
            </div>
        </div>
        <css></css>
    </div>
</template>
<script>
    /** 
     * 生活搜索
     * 
     * @author wzw
     * @since 2018-02-07
     */
    import { mapState } from "vuex"
    import lifeSearch from "@/store/modules/m/life/search.js"
    
    import '../base/common/global.js'
    import '../base/common/list.js'

    import searchBox from "./base/search-box.vue"
    import foodItem from './foodservice/base/item.vue'
    import recruitItem from './recruitservice/base/item.vue'
    import jobItem from './jobservice/base/item.vue'
    import housingItem from './housingservice/base/item.vue'
    import tongcityItem from './tongcityservice/base/item.vue'
    import selfdefiningItem from './selfdefiningservice/base/item.vue'
    import travelItem from './travel/base/item.vue'
    import travelStrategyItem from './travelstrategy/base/item.vue'

    export default {
        storeModule() {
            return { lifeSearch };
        },
        asyncData({ store, route, params, query }) {
            return store.dispatch("lifeSearch/fetchData");
        },
        data() {
            return {
                DATATYPE_TRAVELSTRATEGY: "8",
                DATATYPE_TRAVEL: "9",
                DATATYPE_FOODSERVICE: "101",
                DATATYPE_RECRUITSERVICE: "104",
                DATATYPE_JOGSERVICE: "105",
                DATATYPE_HOUSINGSERVICE: "106",
                DATATYPE_TONGCITYSERVICE: "108",
                DATATYPE_SELFDEFININGSERVICE: "109",
                serviceTypeIds: []
            };
        },
        computed: {
            ...mapState("lifeSearch", ["dataList", "typeList"]),
            showTypeList() {
                return this.typeList != null && this.typeList.length > 0;
            }
        },
        components: {
            foodItem,
            recruitItem,
            jobItem,
            housingItem,
            tongcityItem,
            selfdefiningItem,
            travelItem,
            travelStrategyItem,
            searchBox
        },
        methods: {
            loadMore(callback) {
                callback("lifeSearch/fetchMore", this.dataList);
            },
            selectType(serviceTypeId) {
                let index = this.serviceTypeIds.indexOf(serviceTypeId);
                if (index >= 0) {
                    this.serviceTypeIds.splice(index, 1);
                } else {
                    this.serviceTypeIds.push(serviceTypeId);
                }
                this.$store.commit("lifeSearch/setServiceTypeIds", this.serviceTypeIds);
                this.$store.dispatch("lifeSearch/selecType")
            },
            isActive(serviceTypeId) {
                return this.serviceTypeIds.indexOf(serviceTypeId) >= 0;
            }
        }
    }
</script>
<style scoped>
    .type-container {
        background: #f5f5f5;
        color: #bec2c3;
        width: 100%;
        padding: 0.3rem 0.3rem 0.1rem 0.3rem;
    }

    .type-box {
        font-size: .25rem;
        line-height: 0.6rem;
        padding: 0 0.3rem;
        background: white;
        float: left;
        margin-right: 0.2rem;
        margin-bottom: 0.2rem;
    }

    .type-box.active {
        background: #149ea4;
        color: white;
    }
</style>