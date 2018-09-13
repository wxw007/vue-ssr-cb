<template>
    <div class="container">
        <!--地区搜索-->
        <div class="area-search">
            <div class="float-title-height"></div>
            <div class="float-top">
                <div class="common-top-title cborder-bg">
                    <backBtn></backBtn>
                    地区选择
                </div>
            </div>
            <div class="search">
                <div class="search-inner clearfix">
                    <div class="search-logo-all fl">
                        <img src="~@/assets/m/images/2.png" alt="">
                    </div>
                    <div class="search-input-all ">
                        <input type="search" placeholder="请输入搜索关键字" name="area_search" v-model="search">
                    </div>
                </div>
            </div>
            <!--固有结界-->
            <div class="old-area" v-show="searchAreas == null">
                <div class="area-part" v-for="(continent, continentIndex) in continents" :key="continent.name">
                    <div class="area-top">{{continent.name}}</div>
                    <div class="area-list">
                        <!--四个一行-->
                        <div class="area-row clearfix">
                            <!--有下拉样式-->
                            <template v-for="(area,areaIndex) in continent.areas">
                                <div class="area-box fl area-token" :key="area.areaName">
                                    <v-touch class="area-img" @tap="switchSecondArea(area,continentIndex, areaIndex)">
                                        <img :src="area.flag">
                                    </v-touch>
                                    <v-touch class="area-middle" @tap="switchSecondArea(area,continentIndex,areaIndex)">
                                        <div class="area-title">{{area.areaName}}</div>
                                        <div class="area-down" v-if="area.haveChild == '1'">
                                            <!-- <img src="~@/assets/m/images/25.jpg" alt=""> -->
                                        </div>
                                    </v-touch>
                                    <div class="area-logo" v-if="area.haveChild == '1'" v-show="showAreaId == area.areaId">
                                        <img src="~@/assets/m/images/26.jpg">
                                    </div>
                                </div>
                                <div class="area-child sub-option-row-bg area-token" v-if="(areaIndex+1) % 4==0 || (areaIndex+1) == continent.areas.length" v-show="childAreaListList[continentIndex][Math.floor(areaIndex / 4)].areaId == showAreaId">
                                    <div class="sub-option-row clearfix">
                                        <touch-link tag="div" class="sub-option fl" :class="{'active':a.areaId == curArea.areaId}" v-for="a in childAreaListList[continentIndex][Math.floor(areaIndex / 4)].list" :key="a.areaName" :href="a.url">{{a.areaName}}</touch-link>
                                    </div>
                                </div>
 
                            </template>
 
                        </div>
                    </div>
                </div>
            </div>
            <!--搜索区域-->
            <div class="search-area" v-if="searchAreas != null">
                <div class="area-part">
                    <div class="area-row clearfix">
                        <template v-for="(area,areaIndex) in searchAreas">
                            <div class="area-box fl area-token" :key="area.areaName">
                                <v-touch class="area-img" @tap="switchSecondAreaInSearch(area,areaIndex)">
                                    <img :src="area.flag">
                                </v-touch>
                                <v-touch class="area-middle" @tap="switchSecondAreaInSearch(area, areaIndex)">
                                    <div class="area-title">{{area.areaName}}</div>
                                    <div class="area-down" v-if="area.haveChild == '1'">
                                    </div>
                                </v-touch>
                                <div class="area-logo" v-if="area.haveChild == '1'" v-show="showSearchAreaId == area.areaId">
                                    <img src="~@/assets/m/images/26.jpg">
                                </div>
                            </div>
                            <div class="area-child sub-option-row-bg area-token" v-if="(areaIndex+1) % 4==0 || (areaIndex+1) == searchAreas.length" v-show="searchChildAreaList[Math.floor(areaIndex / 4)].areaId == showSearchAreaId">
                                <div class="sub-option-row clearfix">
                                    <touch-link tag="div" class="sub-option fl" :class="{'active':a.areaId == curArea.areaId}" v-for="a in searchChildAreaList[Math.floor(areaIndex / 4)].list" :key="a.areaName" :href="a.url">{{a.areaName}}</touch-link>
                                </div>
                            </div>
 
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <css></css>
    </div>
</template>
<script>
    /** 
     * 区域选择页
     * 
     * @author wzw
     * @since 2018-02-07
     */
    import { mapState } from "vuex"
    import area from "@/store/modules/m/area.js"
    import backBtn from './base/common/back-btn.vue'
    import './base/common/global.js'
    export default {
        storeModule() {
            return { area };
        },
        asyncData({ store, route, params, query }) {
            return store.dispatch("area/fetchData");
        },
        data() {
            return {
                showAreaId: null,
                showSearchAreaId: null,
                search: "",
                searchAreas: null,
                //显示子元素
                moreAreaList: {
                    areaId: null,//当前选中的区域id
                    isShow: false,//是否显示
                    areaList: [],//要显示的区域列表
                    nowBox: null,
                    nowArea: null,
                },
            };
        },
        computed: {
            ...mapState("area", ["continents", "curArea"]),
            allAreas() {
                let allAreas = [];
                for (let i = 1; i < this.continents.length; i++) {
                    let areas = this.continents[i].areas;
                    for (let j = 0; j < areas.length; j++) {
                        let area = areas[j];
                        if (area.haveChild == '1') {
                            allAreas.push(area);
                            for (let k = 0; k < area.areas.length; k++) {
                                if (area.areas[k].areaName == area.areaName) {
                                    continue;
                                }
                                allAreas.push(area.areas[k])
                            }
                        } else {
                            allAreas.push(area);
                        }
                    }
                }
                return allAreas;
            },
            childAreaListList() {
                let childAreaListList = [];
                for (let i = 0; i < this.continents.length; i++) {
                    let areas = this.continents[i].areas;
                    let childAreaList = [];
                    let length = Math.ceil(areas.length / 4);
                    for (let j = 0; j < length; j++) {
                        childAreaList.push({ areaId: "default", list: [] })
                    }
                    childAreaListList.push(childAreaList);
                }
                return childAreaListList;
            },
            searchChildAreaList() {
                let childAreaList = [];
                let length = Math.ceil(this.allAreas.length / 4);
                for (let j = 0; j < length; j++) {
                    childAreaList.push({ areaId: "default", list: [] })
                }
                return childAreaList;
            }
        },
        watch: {
            "search": "showSearchArea"
        },
        methods: {
            /**
             *  显示或隐藏二级区域
             */
            switchSecondArea(area, continentIndex, areaIndex) {
                if (area.haveChild == '1') {
                    if (this.showAreaId == area.areaId) {
                        this.showAreaId = null;
                        return;
                    }
                    let temp = this.childAreaListList[continentIndex][parseInt(areaIndex / 4)];
                    temp.areaId = area.areaId;
                    temp.list = area.areas;
                    this.showAreaId = area.areaId;
                } else {
                    window.location = area.url;
                }
            },
            /**
             *  显示或隐藏二级区域()
             */
            switchSecondAreaInSearch(area, areaIndex) {
                if (area.haveChild == '1') {
                    if (this.showSearchAreaId == area.areaId) {
                        this.showSearchAreaId = null;
                        return;
                    }
                    let temp = this.searchChildAreaList[Math.floor(areaIndex / 4)];
                    temp.areaId = area.areaId;
                    temp.list = area.areas;
                    this.showSearchAreaId = area.areaId;
                } else {
                    window.location = area.url;
                }
            },
            /**
             *  显示搜索区域
             */
            showSearchArea(newVal) {
                if (newVal == "") {
                    this.searchAreas = null;
                } else {
                    this.searchAreas = [];
                    for (let i = 0; i < this.allAreas.length; i++) {
                        let area = this.allAreas[i];
                        if (area.areaName.indexOf(newVal) >= 0) {
                            this.searchAreas.push(area);
                        }
                    }
 
                }
            }
        },
        components: {
            backBtn
        }
    }
</script>
<style scoped>
    .sub-option.active {
        background: #149ea4;
        color: white;
    }
 
    .sub-option-row-bg {
        display: block;
    }
</style>
