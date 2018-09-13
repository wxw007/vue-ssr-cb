<template>
    <div>
        <top :topTitle="mineTop.topTitle" :back="mineTop.back" :shadow="mineTop.shadow"></top>
        <div class="form-wrap">
            <input-box :content='formReset.title' ref="title"></input-box>
            <textarea-box :content='formReset.serviceText' ref="serviceText"></textarea-box>
            <up-load-img-box ref="imgList" :imgListReset='formReset.imgListReset'></up-load-img-box>
            <more-box>
                <input-box :content='formReset.jobName' ref="jobName"></input-box>
                <input-box :content='formReset.wage' ref="wage"></input-box>
                <select-box :content='formReset.asyncSelectList' ref="asyncSelectList"></select-box>
                <textarea-box :content='formReset.address' ref="address"></textarea-box>
                <input-box :content='formReset.contact' ref="contact"></input-box>
                <input-box :content='formReset.tel' ref="tel"></input-box>
                <input-box :content='formReset.email' ref="email"></input-box>
                <select-box-one :content='formReset.genderLimit' ref="genderLimit"></select-box-one>
                <input-box :content='formReset.ageLimit' ref="ageLimit"></input-box>
                <btn-group :content='formReset.services' ref="services"></btn-group>
                <radio-group :content='formReset.isFullTime' ref="isFullTime"></radio-group>
            </more-box>
        </div>
        <publish-btn @submit="submitData" @gotoAgreeMent="gotoAgreeMent"></publish-btn>
    </div>
</template>
<script>
/** 
 *  生活发布-求职
 * @author wxw
 * @since 2018-07-06 11:03
 */

import { resolveUrl } from '@/util/common/url.js'
import { getQueryString } from '@/util/common/getQueryString.js'
import { mapState } from "vuex"
import { queryServicequerytypeList, recruitserviceAdd, recruitserviceUpdate } from '@/api/wei'
import top from '../../mine/base/mine-top.vue'
import inputBox from '../base/input-box.vue'
import textareaBox from '../base/textarea-box.vue'
import selectBox from '../base/select-box.vue'
import selectBoxOne from '../base/select-box-one.vue'
import upLoadImgBox from '../base/up-load-img-box.vue'
import moreBox from '../base/more-box.vue'
import publishBtn from '../base/publish-btn.vue'
import btnGroup from '../base/btn-group.vue'
import radioGroup from '../base/radio-group.vue'
import recuritAddView from '@/store/modules/m/life/recruitservice/addView.js'
export default {
    storeModule() {
        return { recuritAddView };
    },
    asyncData({ store }) {
        return store.dispatch("recuritAddView/fetchData");
    },
    computed: {
        ...mapState("recuritAddView", ["areaId", "model", "moduleId"])
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
        radioGroup,
        selectBoxOne

    },

    data() {
        return {
            formData: {},
            recruitStorage:{},
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
                genderLimit: {
                    text: '性别',
                    list: [{
                            label: '女',
                            value: '0'
                        },
                        {
                            label: '男',
                            value: '1'
                        },
                        {
                            label: '不限',
                            value: '2'
                        }
                    ],
                    reset: '2'
                },
                jobName: {
                    text: '岗位',
                    placeHolder: '自定义',
                    reset: ''
                },
                wage: {
                    text: '薪资',
                    placeHolder: '如1000或面议',
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
                contact: {
                    text: '联系人',
                    placeHolder: '请输入真实有效的联系人名字',
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
                ageLimit: {
                    text: '年龄限制',
                    placeHolder: '如18~48岁',
                    reset: ''
                },
                services: {
                    text: '服务保障',
                    // ps:'',
                    list: [{
                            label: '包吃',
                            service: 'isMeal',
                            value: "0"
                        },
                        {
                            label: '包住',
                            service: 'isAccommodation',
                            value: "0"
                        }
                    ],
                    reset: {
                        isMeal: "0",
                        isAccommodation: "0",
                    }
                },
                isFullTime: {
                    text: '类型',
                    list: [{
                            label: '全职',
                            value: '1'
                        },
                        {
                            label: '兼职',
                            value: '0'
                        }
                    ],
                    reset: ''
                }
            }
        }
    },
    created() {
        //是否回填数据↓↓↓↓↓↓↓
        // if (this.model) {
        //     this.fillResetData(this.model)
        // }
    },
    mounted() {
        this.getServiceTypeData();
        if (this.model) {
            this.mineTop.topTitle = this.model.title;
            this.fillResetData(this.model)
        } else {
            this.mineTop.topTitle = getQueryString('moduleName')
        }
        if(!this.model && sessionStorage.recruitStorage){
            let a = JSON.parse(sessionStorage.recruitStorage)
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
            this.formReset.jobName.reset = model.jobName
           
            this.formReset.address.reset = model.address;
            this.formReset.contact.reset = model.contact;
            this.formReset.tel.reset = model.tel;
            this.formReset.email.reset = model.email;
            this.formReset.wage.reset = model.wage;
            this.formReset.genderLimit.reset = model.genderLimit;
            this.formReset.services.reset.isMeal = model.isMeal ? model.isMeal : '0';
            this.formReset.services.reset.isAccommodation = model.isAccommodation ? model.isAccommodation : '0'
            this.formReset.ageLimit.reset = model.ageLimit;
            this.formReset.isFullTime.reset = model.isFullTime;
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
            this.formData.recruitId = this.model ? this.model.recruitId : '';
            this.formData.moduleId = this.moduleId;
            this.formData.areaId = this.areaId;
            this.formData.title = this.$refs.title.inputVal;
            this.formData.serviceText = this.$refs.serviceText.inputVal;
            this.formData.imgList = this.$refs.imgList.imgList;
            this.formData.bigImgList = this.$refs.imgList.bigImgList;
            this.formData.jobName = this.$refs.jobName.inputVal;
            this.formData.wage = this.$refs.wage.inputVal;
            if(this.formReset.asyncSelectList.list.length > 0 && this.formReset.asyncSelectList.list[0].sqtValue != 'type1'){
                this.formData.type2 = this.$refs.asyncSelectList.typeSelectVal[0];
                this.formData.type1 = this.$refs.asyncSelectList.typeSelectVal[1];
            } else  {
                this.formData.type1 = this.$refs.asyncSelectList.typeSelectVal[0];
                this.formData.type2 = this.$refs.asyncSelectList.typeSelectVal[1];
            }
            this.formData.workPlace = this.model ? this.model.workPlace : '';
            this.formData.address = this.$refs.address.inputVal;
            this.formData.contact = this.$refs.contact.inputVal;
            this.formData.tel = this.$refs.tel.inputVal;
            this.formData.email = this.$refs.email.inputVal;
            this.formData.genderLimit = this.$refs.genderLimit.selectVal;
            this.formData.ageLimit = this.$refs.ageLimit.inputVal;
            this.formData.isMeal = this.$refs.services.selectList.isMeal;
            this.formData.isAccommodation = this.$refs.services.selectList.isAccommodation;
            this.formData.isFullTime = this.$refs.isFullTime.currentChecked;
            if (this.model) {
                recruitserviceUpdate(this.formData).then(response => {
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
                recruitserviceAdd(this.formData).then(response => {
                    let result = response.data;
                    if (result.success) {
                        alert('添加成功');
                        sessionStorage.clear()
                        window.location.href = resolveUrl(this.$store, "/n/m/life")
                    } else {
                        alert('添加失败')
                    }

                })
            }

        },
         gotoAgreeMent(){
            this.recruitStorage.title = this.$refs.title.inputVal;
            this.recruitStorage.serviceText = this.$refs.serviceText.inputVal;
            this.recruitStorage.imgList = this.$refs.imgList.imgList;
            this.recruitStorage.bigImgList = this.$refs.imgList.bigImgList;
            this.recruitStorage.jobName = this.$refs.jobName.inputVal;
            this.recruitStorage.wage = this.$refs.wage.inputVal;
            this.recruitStorage.type1 = this.$refs.asyncSelectList.typeSelectVal[0];
            this.recruitStorage.type2 = this.$refs.asyncSelectList.typeSelectVal[1];
            this.recruitStorage.address = this.$refs.address.inputVal;
            this.recruitStorage.contact = this.$refs.contact.inputVal;
            this.recruitStorage.tel = this.$refs.tel.inputVal;
            this.recruitStorage.email = this.$refs.email.inputVal;
            this.recruitStorage.genderLimit = this.$refs.genderLimit.selectVal;
            this.recruitStorage.ageLimit = this.$refs.ageLimit.inputVal;
            this.recruitStorage.isMeal = this.$refs.services.selectList.isMeal;
            this.recruitStorage.isAccommodation = this.$refs.services.selectList.isAccommodation;
            this.recruitStorage.isFullTime = this.$refs.isFullTime.currentChecked;

            sessionStorage.setItem('recruitStorage', JSON.stringify(this.recruitStorage))
            var locationHref = window.location.href.split('life/');
            var url = locationHref[0] + 'life/agreeMent'
            window.location.href = url
        }
    }
}
</script>
<style src="../../base/static/css/base.css"></style>
<style src="../../base/static/css/themes.css"></style>