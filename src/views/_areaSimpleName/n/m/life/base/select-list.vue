<template>
    <!-- <div class="life_nav_classify  clearfloat" v-show="isShowSelect" v-for="select in selectList" :key="select.sqtId">
        <template v-if="select.select && select.select.length > 0">
            <span>{{select.dataName}}：</span>
            <ul class="clearfloat clearfloat">
                <li @click="clearType(select.select[0])" :class="{'active': $route.query[select.select[0].serviceDataKey] == null}">全部</li>
                <li v-for="s in select.select" :key="s.serviceDataValue" @click="selectType(s)" :class="{'active': $route.query[s.serviceDataKey] == s.serviceDataValue}">
                    {{s.serviceDataName}}</li>
            </ul>
        </template>
    </div> -->

    <!--下拉选择模块-->
    <div class="select-part" v-if="isShow">
        <div class="select-cover" @click="selectActive(null)" v-show="currentSqtId != null"></div>
        <div class="select-warp clearfix">
            <div class="select-control " v-for="select in selectList" :key="select.sqtId" :class="{'select-one':selectList.length == 1, 'select-two':selectList.length == 2, 'select-three':selectList.length == 3}">
                <div class="select-box rb" v-if="select.select != null && select.select.length > 0">
                    <v-touch class="select-title" @tap="selectActive(select.sqtId)">{{getName(select)}}</v-touch>
                </div>
            </div>
        </div>
        <div class="option-list" v-for="select in selectList" :key="select.sqtId" v-show="currentSqtId == select.sqtId" v-if="select.select[0] != null">
            <v-touch class="option-box cborder" @tap="clearType(select.select[0])" :class="{'on': $route.query[select.select[0].serviceDataKey] == null}">
                <div class="option-title">
                    全部
                    <div class="option-line"></div>
                </div>
            </v-touch>
            <v-touch class="option-box cborder" v-for="s in select.select" :key="s.serviceDataValue" @tap="selectType(s, select.sqtId)" :class="{'on': $route.query[s.serviceDataKey] == s.serviceDataValue}">
                <div class="option-title">
                    {{s.serviceDataName}}
                    <div class="option-line"></div>
                </div>
            </v-touch>
        </div>
    </div>
</template>
<script>
    /** 
     * 
     * @author wzw
     * @since 2018-02-06 10:10
     */
    export default {
        props: {
            selectList: {
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                currentSqtId: null,
                dataNames: {}
            };
        },
        computed: {
            isShow() {
                return this.selectList != null && this.selectList.length > 0;
            }
        },
        methods: {
            getName(select) {
                if (select.select[0] == null) {
                    return "";
                }
                const query = this.$route.query;
                const serviceDataKey = select.select[0].serviceDataKey;
                let serviceDataValue = query[serviceDataKey];
                if (serviceDataValue == null) {
                    return select.dataName;
                }
                if (select.select == null) {
                    return select.dataName;
                }
                for (let i = 0; i < select.select.length; i++) {
                    if (select.select[i].serviceDataValue == serviceDataValue) {
                        return select.select[i].serviceDataName;
                    }
                }
                return select.serviceDataName;
            },
            /**
             *  选中某个选项
             */
            selectType(select, sqtId) {
                let query = {};
                for (let key in this.$route.query) {
                    query[key] = this.$route.query[key];
                }
                query[select.serviceDataKey] = select.serviceDataValue;
                this.$router.replace({ path: this.$route.path, query: query });
                this.currentSqtId = null;
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
                this.$router.replace({ path: this.$route.path, query: query });
                this.currentSqtId = null;
            },
            selectActive(sqtId) {
                if (this.currentSqtId) {
                    this.currentSqtId = null;
                } else {
                    this.currentSqtId = sqtId;
                }
            }
        }
    }
</script>
<!-- <style>
    .option-list,
    .select-cover {
        display: block;
    }
</style> -->