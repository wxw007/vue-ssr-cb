<template>
    <div>
        <top :topTitle="mineTop.topTitle" :back="mineTop.back" :shadow="mineTop.shadow"></top>
        <div class="form-wrap">
            <input-box :content='formReset.title' ref="title"></input-box>
            <textarea-box :content='formReset.serviceText' ref="serviceText"></textarea-box>
            <up-load-img-box ref="imgList" :imgListReset='formReset.imgListReset'></up-load-img-box>
            <more-box>
                <input-box :content='formReset.cookingStyle' ref="cookingStyle"></input-box>
                <select-box :content='formReset.asyncSelectList' ref="asyncSelectList"></select-box>
                <textarea-box :content='formReset.address' ref="address"></textarea-box>
                <input-box :content='formReset.personalOnsumption' ref="personalOnsumption"></input-box>
                <input-box :content='formReset.tel' ref="tel"></input-box>
                <input-box :content='formReset.email' ref="email"></input-box>
                <input-box :content='formReset.shopHours' ref="shopHours"></input-box>
                <btn-group :content='formReset.services' ref="services"></btn-group>
                <input-box :content='formReset.website' ref="website"></input-box>
            </more-box>
        </div>
        <publish-btn @submit="submitData" @gotoAgreeMent="gotoAgreeMent"></publish-btn>
    </div>
</template>
<script>
/** 
 * 生活服务-美食发布页
 * @author wxw
 * @since 2018-07-06 11:03
 */
import { resolveUrl } from '@/util/common/url.js'
import { getQueryString } from '@/util/common/getQueryString.js'
import { mapState } from "vuex"
import { queryServicequerytypeList, foodServiceAdd, foodServiceUpdate } from '@/api/wei'
import top from '../../mine/base/mine-top.vue'
import inputBox from '../base/input-box.vue'
import textareaBox from '../base/textarea-box.vue'
import selectBox from '../base/select-box.vue'
import upLoadImgBox from '../base/up-load-img-box.vue'
import moreBox from '../base/more-box.vue'
import publishBtn from '../base/publish-btn.vue'
import btnGroup from '../base/btn-group.vue'
import radioGroup from '../base/radio-group.vue'
import foodAddView from '@/store/modules/m/life/foodservice/addView.js'
export default {
    storeModule() {
        return { foodAddView };
    },
    asyncData({ store }) {
        return store.dispatch("foodAddView/fetchData");
    },
    computed: {
        ...mapState("foodAddView", ["areaId", "model", "moduleId"])
    },
    components: {
        top,
        inputBox,
        textareaBox,
        selectBox,
        upLoadImgBox,
        moreBox,
        publishBtn,
        btnGroup,
        radioGroup
    },

    data() {
        return {
            formData: {},
            foodStorage:{},
            mineTop: {
                topTitle: '',
                back: true,
                shadow: true
            },
            formReset: { //表单初始化数据
                title: {
                    text: "标题",
                    placeHolder: '请输入标题',
                    warning: false,
                    reset: ''
                },
                serviceText: {
                    text: '详情描述',
                    placeHolder: '请输入详情',
                    warning: false,
                    reset: ''
                },
                imgListReset: {
                    imgList: [],
                    bigImgList: []
                },
                cookingStyle: {
                    text: '菜系',
                    placeHolder: '如中餐、西餐、海鲜、川菜等',
                    reset: ''
                },
                asyncSelectList: {
                    list: [],
                    reset: ['', '']
                },
                address: {
                    text: '地址',
                    placeHolder: '输入真实有效的地址',
                    reset: ''
                },
                personalOnsumption: {
                    text: '人均消费',
                    placeHolder: '输入人均价格',
                    reset: ''
                },
                tel: {
                    text: '联系电话',
                    placeHolder: '输入真实有效的联系方式',
                    reset: ''
                },
                email: {
                    text: '邮箱',
                    placeHolder: '请输入直接有效的邮箱',
                    reset: ''
                },
                shopHours: {
                    text: '营业时间',
                    placeHolder: '如9:00~21:00',
                    reset: ''
                },
                services: {
                    text: '特色服务',
                    ps: '(可多选)',
                    // ps:'',
                    list: [{
                            label: '打包',
                            service: 'isPack',
                            value: "1"
                        },
                        {
                            label: '外卖',
                            service: 'isTakeout',
                            value: "1"
                        },
                        {
                            label: '预定',
                            service: 'isReserve',
                            value: "0"
                        }
                    ],
                    reset: {
                        isPack: "0",
                        isTakeout: "0",
                        isReserve: "0",
                    }

                },
                website: {
                    text: '网址',
                    placeHolder: '请输入网址',
                    reset: ''
                },

            }
        }
    },
    created() {
        // if (this.model) {
        //     this.fillResetData(this.model)
        // }
    },
    mounted() {
        this.getServiceTypeData();
        if (this.model) {
            this.mineTop.topTitle = this.model.title
            this.fillResetData(this.model)
        } else {
            this.mineTop.topTitle = getQueryString('moduleName')
        }
        if(!this.model && sessionStorage.foodStorage){
            let a = JSON.parse(sessionStorage.foodStorage)
            this.fillResetData(a)
        }
    },
    methods: {
        //获取动态下拉框数据↓↓↓↓↓↓↓↓
        getServiceTypeData() {
            var that = this;
            queryServicequerytypeList({ areaId: this.areaId, moduleId: this.moduleId }).then(response => {
                this.formReset.asyncSelectList.list = response.data.msg;
                this.formReset.asyncSelectList.list.forEach(function(item) {
                    item.titleArr = item.sqtName.split('')
                });
                if(this.formReset.asyncSelectList.list.length > 0 && this.formReset.asyncSelectList.list[0].sqtValue != 'type1'){
                    this.formReset.asyncSelectList.reset[0] = that.model ? that.model.type2 : '';
                    this.formReset.asyncSelectList.reset[1] = that.model ? that.model.type1 : '';
                } else {
                    this.formReset.asyncSelectList.reset[0] = that.model ? that.model.type1 : '';
                    this.formReset.asyncSelectList.reset[1] = that.model ? that.model.type2 : '';
                }
            });
           
        },
        //编辑-数据回填↓↓↓↓↓↓↓↓
        fillResetData(model) {
            this.formReset.title.reset = model.title;
            this.formReset.serviceText.reset = model.serviceText;
            this.formReset.imgListReset.imgList = model.imgList ? model.imgList : [];
            this.formReset.imgListReset.bigImgList = model.bigImgList ? model.bigImgList : [];
            this.formReset.cookingStyle.reset = model.cookingStyle
          
            this.formReset.address.reset = model.address;
            this.formReset.personalOnsumption.reset = model.personalOnsumption;
            this.formReset.tel.reset = model.tel;
            this.formReset.email.reset = model.email;
            this.formReset.shopHours.reset = model.shopHours;
            this.formReset.services.reset.isPack = model.isPack ? model.isPack : '0';
            this.formReset.services.reset.isTakeout = model.isTakeout ? model.isTakeout : '0';
            this.formReset.services.reset.isReserve = model.isReserve ? model.isReserve : '0';
            this.formReset.website.reset = model.website;

        },
        //提交表单↓↓↓↓↓↓↓↓
        submitData() {
            if (!this.$refs.title.inputVal) {
                this.formReset.title.warning = true;
                return
            }
            if (!this.$refs.serviceText.inputVal) {
                this.formReset.serviceText.warning = true;
                return
            }
            this.formData.foodId = this.model ? this.model.foodId : '';
            this.formData.moduleId = this.moduleId;
            this.formData.areaId = this.areaId;
            this.formData.title = this.$refs.title.inputVal;
            this.formData.serviceText = this.$refs.serviceText.inputVal;
            this.formData.imgList = this.$refs.imgList.imgList;
            this.formData.bigImgList = this.$refs.imgList.bigImgList;
            this.formData.cookingStyle = this.$refs.cookingStyle.inputVal;
            if(this.formReset.asyncSelectList.list.length > 0 && this.formReset.asyncSelectList.list[0].sqtValue != 'type1'){
                this.formData.type2 = this.$refs.asyncSelectList.typeSelectVal[0];
                this.formData.type1 = this.$refs.asyncSelectList.typeSelectVal[1];
            } else  {
                this.formData.type1 = this.$refs.asyncSelectList.typeSelectVal[0];
                this.formData.type2 = this.$refs.asyncSelectList.typeSelectVal[1];
            }
            this.formData.location = this.model ? this.model.location : '';
            this.formData.address = this.$refs.address.inputVal;
            this.formData.personalOnsumption = this.$refs.personalOnsumption.inputVal;
            this.formData.tel = this.$refs.tel.inputVal;
            this.formData.email = this.$refs.email.inputVal;
            this.formData.shopHours = this.$refs.shopHours.inputVal;
            this.formData.isPack = this.$refs.services.selectList.isPack;
            this.formData.isTakeout = this.$refs.services.selectList.isTakeout;
            this.formData.isReserve = this.$refs.services.selectList.isReserve;
            this.formData.website = this.$refs.website.inputVal;
            if (this.model) {
                foodServiceUpdate(this.formData).then(response => {
                    let result = response.data;
                    if (result.success) {
                        alert('更新成功');
                        sessionStorage.clear()
                        window.location.href = resolveUrl(this.$store, "/n/m/mine/life-publish-order")
                    } else {
                        alert('更新失败')
                    }

                })
            } else {
                foodServiceAdd(this.formData).then(response => {
                    let result = response.data;
                    if (result.success) {
                        alert('添加成功');
                        window.location.href = resolveUrl(this.$store, "/n/m/life")
                         sessionStorage.clear()
                    } else {
                        alert('添加失败')
                    }

                })
            }
        },
        gotoAgreeMent(){
            this.foodStorage.title = this.$refs.title.inputVal;
            this.foodStorage.serviceText = this.$refs.serviceText.inputVal;
            this.foodStorage.imgList = this.$refs.imgList.imgList;
            this.foodStorage.bigImgList = this.$refs.imgList.bigImgList;
            this.foodStorage.cookingStyle = this.$refs.cookingStyle.inputVal;
            this.foodStorage.type1 = this.$refs.asyncSelectList.typeSelectVal[0];
            this.foodStorage.type2 = this.$refs.asyncSelectList.typeSelectVal[1];
            this.foodStorage.address = this.$refs.address.inputVal;
            this.foodStorage.personalOnsumption = this.$refs.personalOnsumption.inputVal;
            this.foodStorage.tel = this.$refs.tel.inputVal;
            this.foodStorage.email = this.$refs.email.inputVal;
            this.foodStorage.shopHours = this.$refs.shopHours.inputVal;
            this.foodStorage.isPack = this.$refs.services.selectList.isPack;
            this.foodStorage.isTakeout = this.$refs.services.selectList.isTakeout;
            this.foodStorage.isReserve = this.$refs.services.selectList.isReserve;
            this.foodStorage.website = this.$refs.website.inputVal;

            sessionStorage.setItem('foodStorage', JSON.stringify(this.foodStorage))
            var locationHref = window.location.href.split('life/');
            var url = locationHref[0] + 'life/agreeMent'
            window.location.href = url
        }
    }
}
</script>
<style src="../../base/static/css/base.css"></style>
<style src="../../base/static/css/themes.css"></style>