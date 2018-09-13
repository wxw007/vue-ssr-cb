<template>
    <div>
        <top :topTitle="mineTop.topTitle" :back="mineTop.back" :shadow="mineTop.shadow"></top>
        <div class="form-wrap">
            <input-box :content='formReset.title' ref="title"></input-box>
            <textarea-box :content='formReset.serviceText' ref="serviceText"></textarea-box>
            <up-load-img-box ref="imgList" :imgListReset='formReset.imgListReset'></up-load-img-box>
            <more-box>
                <select-box :content='formReset.asyncSelectList' ref="asyncSelectList"></select-box>
                <textarea-box :content='formReset.address' ref="address"></textarea-box>
                <input-box :content='formReset.contact' ref="contact"></input-box>
                <input-box :content='formReset.tel' ref="tel"></input-box>
                <input-box :content='formReset.email' ref="email"></input-box>
            </more-box>
        </div>
        <publish-btn @submit="submitData" @gotoAgreeMent="gotoAgreeMent"></publish-btn>
    </div>
</template>
<script>
/** 生活发布-自定义页面
 *  
 * @author wxw
 * @since 2018-07-06 11:03
 */
import { resolveUrl } from '@/util/common/url.js'
import { getQueryString } from '@/util/common/getQueryString.js'
import { mapState } from "vuex"
import { queryServicequerytypeList, selfdefiningserviceAdd, selfdefiningserviceUpdate } from '@/api/wei'
import top from '../../mine/base/mine-top.vue'
import inputBox from '../base/input-box.vue'
import textareaBox from '../base/textarea-box.vue'
import selectBox from '../base/select-box.vue'
import upLoadImgBox from '../base/up-load-img-box.vue'
import moreBox from '../base/more-box.vue'
import publishBtn from '../base/publish-btn.vue'
import btnGroup from '../base/btn-group.vue'
import radioGroup from '../base/radio-group.vue'
import selfdefiningAddView from '@/store/modules/m/life/selfdefiningservice/addView.js'
export default {
    storeModule() {
        return { selfdefiningAddView };
    },
    asyncData({ store }) {
        return store.dispatch("selfdefiningAddView/fetchData");
    },
    computed: {
        ...mapState("selfdefiningAddView", ["areaId", "model","moduleId"])
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
            formData:{},
            selfdefiningStorage:{},
            mineTop: {
                topTitle: '同城服务',
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
                imgListReset:{
                    imgList:[],
                    bigImgList:[]
                },
                asyncSelectList:{
                    list:[],
                    reset: ['','']
                },
                address: {
                    text: '地址',
                    placeHolder: '输入真实有效的地址',
                    reset: ''
                },
                contact: {
                    text: '联系人',
                    placeHolder: '怎么称呼',
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
            }
        }
    },
    created(){
        // if(this.model){
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
        if(!this.model && sessionStorage.selfdefiningStorage){
            let a = JSON.parse(sessionStorage.selfdefiningStorage)
            this.fillResetData(a)
        }
    },
    methods: {
        //获取动态下拉框数据↓↓↓↓↓↓↓↓
        getServiceTypeData(){
            var that = this;
            queryServicequerytypeList({areaId: this.areaId, moduleId: this.moduleId}).then(response => {
                this.formReset.asyncSelectList.list = response.data.msg;
                this.formReset.asyncSelectList.list.forEach(function(item){
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
        fillResetData(model){
           this.formReset.title.reset = model.title;
           this.formReset.serviceText.reset = model.serviceText;
           this.formReset.imgListReset.imgList = model.imgList ? model.imgList : [];
           this.formReset.imgListReset.bigImgList = model.bigImgList ? model.bigImgList : [];
           
           this.formReset.address.reset = model.address;
           this.formReset.contact.reset = model.contact;
           this.formReset.tel.reset = model.tel;
           this.formReset.email.reset = model.email;
       },
        //提交表单↓↓↓↓↓↓↓↓
        submitData(){
            if(!this.$refs.title.inputVal){
                this.formReset.title.warning = true;
                return
            }
            if(!this.$refs.serviceText.inputVal){
                this.formReset.serviceText.warning = true;
                return
            }
            this.formData.selfdefiningId = this.model ? this.model.selfdefiningId : '';
            this.formData.moduleId = this.moduleId;
            this.formData.areaId = this.areaId;
            this.formData.title = this.$refs.title.inputVal;
            this.formData.serviceText = this.$refs.serviceText.inputVal;
            this.formData.imgList = this.$refs.imgList.imgList;
            this.formData.bigImgList = this.$refs.imgList.bigImgList;
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
            this.formData.selfdefiningTypeId = this.model ? this.model.selfdefiningTypeId  : getQueryString('selfdefiningTypeId');
            if(this.model){
                selfdefiningserviceUpdate(this.formData).then(response => {
                    let result = response.data;
                    if(result.success){
                        alert('更新成功');
                        sessionStorage.clear()
                        window.location.href = resolveUrl(this.$store, "/n/m/mine/life-publish-order")
                    } else{
                        alert('更新失败')
                    }
                    
                })
            } else {
                selfdefiningserviceAdd(this.formData).then(response => {
                    let result = response.data;
                    if(result.success){
                        alert('添加成功');
                        sessionStorage.clear()
                        window.location.href = resolveUrl(this.$store, "/n/m/life")
                    } else{
                        alert('添加失败')
                    }
                    
                })
            }
            
        },
        gotoAgreeMent(){
            this.selfdefiningStorage.title = this.$refs.title.inputVal;
            this.selfdefiningStorage.serviceText = this.$refs.serviceText.inputVal;
            this.selfdefiningStorage.imgList = this.$refs.imgList.imgList;
            this.selfdefiningStorage.bigImgList = this.$refs.imgList.bigImgList;
            this.selfdefiningStorage.type1 = this.$refs.asyncSelectList.typeSelectVal[0];
            this.selfdefiningStorage.type2 = this.$refs.asyncSelectList.typeSelectVal[1];
            this.selfdefiningStorage.address = this.$refs.address.inputVal;
            this.selfdefiningStorage.contact = this.$refs.contact.inputVal;
            this.selfdefiningStorage.tel = this.$refs.tel.inputVal;
            this.selfdefiningStorage.email = this.$refs.email.inputVal;

            sessionStorage.setItem('selfdefiningStorage', JSON.stringify(this.selfdefiningStorage))
            var locationHref = window.location.href.split('life/');
            var url = locationHref[0] + 'life/agreeMent'
            window.location.href = url
        }
    }
}
</script>
<style src="../../base/static/css/base.css"></style>
<style src="../../base/static/css/themes.css"></style>
