<template>
    <div class="life_index">
        <searchBar @searchList="searchList"></searchBar>
        <div class="life_classify_icon">
            <a v-for="lifeModule in lifeModuleList" :key="lifeModule.lmId" :href="lifeModule.url">
                <div>
                    <img :src="lifeModule.lmImg">
                </div>
                <p>{{lifeModule.lmName}}</p>
            </a>
        </div>
        <div class="life_embassy" v-if="showBanner">
            <a v-for="banner in bannerList" :key="banner.img" @click="to(banner.url)">
                <img :src="banner.img">
            </a>
        </div>

        <div class="life_list" v-for="lifeTopInfo in lifeTopInfoList" :key="lifeTopInfo.infoType.typeId">
            <div class="blue_header clearfloat">
                <h3>{{lifeTopInfo.infoType.typeName}}</h3>
                <a :href="lifeTopInfo.url">更多</a>
            </div>
            <template v-if="isLifeService(lifeTopInfo)">
                <template v-if="lifeTopInfo.infoType.moduleId == MODULE_ID_FOODSERVICE">
                    <foodList :foodServiceList="lifeTopInfo.infoList"></foodList>
                </template>
                <template v-else-if="lifeTopInfo.infoType.moduleId == MODULE_ID_RECRUITSERVICE">
                    <recruitList :recruitServiceList="lifeTopInfo.infoList"></recruitList>
                </template>
                <template v-else-if="lifeTopInfo.infoType.moduleId == MODULE_ID_JOBSERVICE">
                    <jobList :jobServiceList="lifeTopInfo.infoList"></jobList>
                </template>
                <template v-else-if="lifeTopInfo.infoType.moduleId == MODULE_ID_HOUSINGSERVICE">
                    <housingList :housingServiceList="lifeTopInfo.infoList"></housingList>
                </template>
                <template v-else-if="lifeTopInfo.infoType.moduleId == MODULE_ID_TONGCITYSERVICE">
                    <tongcityList :tongcityServiceList="lifeTopInfo.infoList"></tongcityList>
                </template>
                <template v-else-if="lifeTopInfo.infoType.moduleId == MODULE_ID_SELFDEFININGSERVICE">
                    <selfdefiningList :selfdefiningServiceList="lifeTopInfo.infoList"></selfdefiningList>
                </template>
            </template>
            <template v-else-if="isTravel(lifeTopInfo)">
                <travelList :travelList="lifeTopInfo.infoList"></travelList>
            </template>
        </div>


        <!-- <div class="life_list">
            <div class="blue_header clearfloat">
                <h3>美食天地</h3>
                <a href="####">更多</a>
            </div>
            <foodList></foodList>
        </div>
        <div class="life_list">
            <div class="blue_header clearfloat">
                <h3>招聘求职</h3>
                <a href="####">更多</a>
            </div>
            <jobList></jobList>
        </div> -->

    </div>
</template>
<script>
    import {queryListAllServiceByKeyword} from '@/api/web'
    import searchBar from './searchBar.vue'
    import foodList from '../../foodservice/base/list.vue'
    import recruitList from '../../recruitservice/base/list.vue'
    import jobList from '../../jobservice/base/list.vue'
    import housingList from '../../housingservice/base/list.vue'
    import tongcityList from '../../tongcityservice/base/list.vue'
    import selfdefiningList from '../../selfdefiningservice/base/list.vue'
    import travelList from '../../travel/base/list.vue'

    export default {
        props: {
            lifeModuleList: {
                default() {
                    return [];
                }
            },
            lifeTopInfoList: {
                default() {
                    return [];
                }
            },
            bannerList: {
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                MODULE_ID_FOODSERVICE: 1, // 美食天地
                MODULE_ID_RECRUITSERVICE: 4,// 招聘
                MODULE_ID_JOBSERVICE: 5, // 求职
                MODULE_ID_HOUSINGSERVICE: 6, // 房产信息
                MODULE_ID_TONGCITYSERVICE: 8, // 同城服务
                MODULE_ID_SELFDEFININGSERVICE: 9 // 自定义服务
            };
        },
        computed: {
            showBanner() {
                return this.bannerList != null && this.bannerList.length > 0;
            }
        },
        components: {
            searchBar,
            foodList,
            housingList,
            jobList,
            recruitList,
            selfdefiningList,
            tongcityList,
            travelList
        },
        methods: {
            /**
             * 是否是生活服务
             */
            isLifeService(lifeModule) {
                return lifeModule.infoType.type == 1;
            },
            /**
             * 是否旅游
             */ 
            isTravel(lifeModule) {
                return lifeModule.infoType.type == 2;
            },
            to(url) {
                if (url == null) {
                    return;
                }
                window.open(url);
            },
            searchList(info){
                let data = {};
                data.keyword = info;
                data.from = 'life';
                queryListAllServiceByKeyword(data).then( response => {
                    let result = response.data;
                    console.log(result)
                    if(result.success){
                        
                    }
                })
            }
        }
    }
</script>
<style>
</style>
<style scoped>
    .life_list {
        width: 100%;
        margin-top: 30px;
    }


    .life_classify_icon {
        width: 100%;
        padding: 0 1.278%;
        margin-top: 26px;
        overflow: hidden;
    }

    .life_classify_icon a {
        display: inline-block;
        width: 20%;
    }

    .life_classify_icon a div {
        padding: 0 23.913%;
    }

    .life_classify_icon a div img {
        width: 100%;
        height: auto;
    }

    .life_classify_icon a p {
        width: 100%;
        height: 38px;
        line-height: 38px;
        text-align: center;
        margin-bottom: 18px;
        font-size: 14px;
        color: #666;
        overflow: hidden;
    }

    /*大使馆直通车*/

    .life_embassy {
        margin-top: 5px;
    }

    .life_embassy a {
        display: inline-block;
        width: 100%;
        cursor: pointer;
    }

    .life_embassy a+a {
        margin-top: 10px;
    }

    .life_embassy a img {
        width: 100%;
    }
</style>