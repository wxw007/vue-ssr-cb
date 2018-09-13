<template>
    <div>
        <top :topTitle="mineTop.topTitle" :back="mineTop.back" :shadow="mineTop.shadow"></top>
        <div class="form-wrap">
            <input-box :content='formReset.title' ref="title"></input-box>
            <textarea-box :content='formReset.serviceText' ref="serviceText"></textarea-box>
            <up-load-img-box ref="imgList" :imgListReset='formReset.imgListReset'></up-load-img-box>
            <more-box>
                <select-box-one :content='formReset.rentalType' ref="rentalType"></select-box-one>
                <input-box :content='formReset.price' ref="price"></input-box>
                <select-box :content='formReset.asyncSelectList' ref="asyncSelectList"></select-box>
                <textarea-box :content='formReset.address' ref="address"></textarea-box>
                <input-box :content='formReset.contact' ref="contact"></input-box>
                <input-box :content='formReset.tel' ref="tel"></input-box>
                <input-box :content='formReset.email' ref="email"></input-box>
                <input-box :content='formReset.flatType' ref="flatType"></input-box>
                <input-box :content='formReset.decoration' ref="decoration"></input-box>
                <input-box :content='formReset.totalArea' ref="totalArea"></input-box>
                <input-box :content='formReset.operationCost' ref="operationCost"></input-box>
            </more-box>
        </div>
        <publish-btn @submit="submitData" @gotoAgreeMent="gotoAgreeMent"></publish-btn>
    </div>
</template>
<script>
/** 
 * 生活发布-房产信息
 * @author wxw
 * @since 2018-07-06 11:03
 */
import { resolveUrl } from '@/util/common/url.js'
import { getQueryString } from '@/util/common/getQueryString.js'
import { mapState } from "vuex"
import { queryServicequerytypeList, housingserviceAdd, housingserviceUpdate } from '@/api/wei'
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
import housingAddView from '@/store/modules/m/life/housingservice/addView.js'
export default {
    storeModule() {
        return { housingAddView };
    },
    asyncData({ store }) {
        return store.dispatch("housingAddView/fetchData");
    },
    computed: {
        ...mapState("housingAddView", ["areaId", "model", "moduleId", "rentalTypeList", "allData"])
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
            housingStorage:{},
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
                rentalType: {
                    text: '租/售',
                    list: [],
                    reset: ''
                },
                price: {
                    text: '价格',
                    placeHolder: '请输入价格',
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
                flatType: {
                    text: '户型',
                    placeHolder: '请输入户型',
                    reset: ''
                },
                decoration: {
                    text: '配置',
                    placeHolder: '如家电配置',
                    reset: ''
                },
                totalArea: {
                    text: '面积',
                    placeHolder: '房屋面积多少平',
                    reset: ''
                },
                operationCost: {
                    text: '管理费',
                    placeHolder: '请输入管理费用',
                    reset: ''
                }

            }
        }
    },
    created() {
        //租售数据赋值↓↓↓↓↓↓↓
        this.formReset.rentalType.list = this.rentalTypeList;

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
        if(!this.model && sessionStorage.housingStorage){
            let a = JSON.parse(sessionStorage.housingStorage)
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
            this.formReset.rentalType.reset = model.rentalType;
            this.formReset.price.reset = model.price
            
            this.formReset.address.reset = model.address;
            this.formReset.contact.reset = model.contact;
            this.formReset.tel.reset = model.tel;
            this.formReset.email.reset = model.email;
            this.formReset.flatType.reset = model.flatType;
            this.formReset.decoration.reset = model.decoration;
            this.formReset.totalArea.reset = model.totalArea;
            this.formReset.operationCost.reset = model.operationCost;
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
            // if (!this.$refs.rentalType.selectVal || this.$refs.rentalType.selectVal == '') {
            //     alert('未选择房屋 租/售 类型')
            //     return
            // }
            this.formData.housingId = this.model ? this.model.housingId : '';
            this.formData.moduleId = this.moduleId;
            this.formData.areaId = this.areaId;
            this.formData.title = this.$refs.title.inputVal;
            this.formData.serviceText = this.$refs.serviceText.inputVal;
            this.formData.imgList = this.$refs.imgList.imgList;
            this.formData.bigImgList = this.$refs.imgList.bigImgList;
            this.formData.rentalType = this.$refs.rentalType.selectVal;
            this.formData.price = this.$refs.price.inputVal;
            if(this.formReset.asyncSelectList.list.length > 0 && this.formReset.asyncSelectList.list[0].sqtValue != 'type1'){
                this.formData.type2 = this.$refs.asyncSelectList.typeSelectVal[0];
                this.formData.type1 = this.$refs.asyncSelectList.typeSelectVal[1];
            } else  {
                this.formData.type1 = this.$refs.asyncSelectList.typeSelectVal[0];
                this.formData.type2 = this.$refs.asyncSelectList.typeSelectVal[1];
            }

            this.formData.location = this.model ? this.model.location : '';
            this.formData.address = this.$refs.address.inputVal;
            this.formData.contact = this.$refs.contact.inputVal;
            this.formData.tel = this.$refs.tel.inputVal;
            this.formData.email = this.$refs.email.inputVal;
            this.formData.flatType = this.$refs.flatType.inputVal;
            this.formData.decoration = this.$refs.decoration.inputVal;
            this.formData.totalArea = this.$refs.totalArea.inputVal;
            this.formData.operationCost = this.$refs.operationCost.inputVal;
            if (this.model) {
                housingserviceUpdate(this.formData).then(response => {
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
                housingserviceAdd(this.formData).then(response => {
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
            this.housingStorage.title = this.$refs.title.inputVal;
            this.housingStorage.serviceText = this.$refs.serviceText.inputVal;
            this.housingStorage.imgList = this.$refs.imgList.imgList;
            this.housingStorage.bigImgList = this.$refs.imgList.bigImgList;
            this.housingStorage.rentalType = this.$refs.rentalType.selectVal;
            this.housingStorage.price = this.$refs.price.inputVal;
            this.housingStorage.type1 = this.$refs.asyncSelectList.typeSelectVal[0];
            this.housingStorage.type2 = this.$refs.asyncSelectList.typeSelectVal[1];
            this.housingStorage.address = this.$refs.address.inputVal;
            this.housingStorage.contact = this.$refs.contact.inputVal;
            this.housingStorage.tel = this.$refs.tel.inputVal;
            this.housingStorage.email = this.$refs.email.inputVal;
            this.housingStorage.flatType = this.$refs.flatType.inputVal;
            this.housingStorage.decoration = this.$refs.decoration.inputVal;
            this.housingStorage.totalArea = this.$refs.totalArea.inputVal;
            this.housingStorage.operationCost = this.$refs.operationCost.inputVal;

            sessionStorage.setItem('housingStorage', JSON.stringify(this.housingStorage))
            var locationHref = window.location.href.split('life/');
            var url = locationHref[0] + 'life/agreeMent'
            window.location.href = url
        }
    }
}
</script>
<style src="../../base/static/css/base.css"></style>
<style src="../../base/static/css/themes.css"></style>