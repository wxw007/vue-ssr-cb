<template>
    <div>
        <navTab :topLifeModuleList="topLifeModuleList"></navTab>

        <div class="life_nav_classify  clearfloat" v-show="isShowSelect" v-for="select in selectList" :key="select.sqtId">
            <template v-if="select.select && select.select.length > 0">
                <span>{{select.dataName}}：</span>
                <ul class="clearfloat clearfloat">
                    <li @click="clearType(select.select[0])" :class="{'active': $route.query[select.select[0].serviceDataKey] == null}">全部</li>
                    <li v-for="s in select.select" :key="s.serviceDataValue" @click="selectType(s)" :class="{'active': $route.query[s.serviceDataKey] == s.serviceDataValue}">
                        {{s.serviceDataName}}</li>
                </ul>
            </template>
        </div>
    </div>
</template>
<script>
    import navTab from './life-nav-tab.vue'

    export default {
        props: {
            topLifeModuleList: {
                default() {
                    return [];
                }
            },
            selectList: {
                default() {
                    return [];
                }
            }
        },
        computed: {
            isShowSelect() {
                return this.selectList && this.selectList.length > 0;
            }
        },
        components: {
            navTab
        },
        methods: {
            /**
             *  选中某个选项
             */
            selectType(select) {
                let query = {};
                for (let key in this.$route.query) {
                    query[key] = this.$route.query[key];
                }
                query[select.serviceDataKey] = select.serviceDataValue;
                this.$router.push({ path: this.$route.path, query: query });
            },
            /**
             *  选中全部
             */ 
            clearType(select) {
                let query = {};
                for (let key in this.$route.query) {
                    query[key] = this.$route.query[key];
                }
                query[select.serviceDataKey] = undefined;
                this.$router.push({ path: this.$route.path, query: query });
            }
            // {"serviceDataValue":"B1456733127616","serviceDataName":"4 星","serviceDataKey":"type2"}
        }
    }
</script>

<style>
    .life_nav_classify {
        font-size: 12px;
        color: #666;
    }

    .life_nav_classify span {
        float: left;
        width: 10.244%;
        height: 31px;
        line-height: 31px;
        text-align: left;
    }

    .life_nav_classify ul {
        float: right;
        width: 89.755%;
        font-size: 0;
    }

    .life_nav_classify ul li {
        float: left;
        width: 12.863%;
        height: 31px;
        line-height: 31px;
        text-align: left;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
    }

    .life_nav_classify ul li.active {
        color: #0082c6;
    }
</style>