<template>
    <indexTemplate>
        <publish-tab-bar :currentIndex='currentIndex'></publish-tab-bar>
        <div class="form-wrap">
            <input-box :content='formReset.title' ref="title"></input-box>
            <textarea-box :content='formReset.serviceText' ref="serviceText"></textarea-box>
            <up-load-img-box ref="imgList" :imgListReset='formReset.imgListReset'></up-load-img-box>
                <input-box :content='formReset.price' ref="price"></input-box>
                <select-box :content='formReset.asyncSelectList' ref="asyncSelectList"></select-box>
                <textarea-box :content='formReset.address' ref="address"></textarea-box>
                <input-box :content='formReset.contact' ref="contact"></input-box>
                <input-box :content='formReset.tel' ref="tel"></input-box>
                <input-box :content='formReset.email' ref="email"></input-box>
        </div>
        <publish-btn @submit="submitData" @gotoAgreeMent="gotoAgreeMent"></publish-btn>
    </indexTemplate>
</template>
<script>
/** 
 *  
 * @author wxw
  * 数据接口和微网共用，放在weiapi文件夹
 */
import indexTemplate from '../base/layouts/index-template.vue'
import publishTabBar from '../base/publish-tab-bar.vue'

import { resolveUrl } from '@/util/common/url.js'
import { getQueryString } from '@/util/common/getQueryString.js'
import { mapState } from "vuex"
import { queryServicequerytypeList, tongcityserviceAdd, tongcityserviceUpdate } from '@/api/wei'
import inputBox from '../base/input-box.vue'
import textareaBox from '../base/textarea-box.vue'
import selectBox from '../base/select-box.vue'
import upLoadImgBox from '../base/up-load-img-box.vue'
import publishBtn from '../base/publish-btn.vue'
import btnGroup from '../base/btn-group.vue'
import radioGroup from '../base/radio-group.vue'
import tongcityAddViewPc from '@/store/modules/web/life/tongcityservice/addView.js'
export default {
    storeModule() {
        return { tongcityAddViewPc };
    },
    asyncData({ store }) {
        return store.dispatch("tongcityAddViewPc/fetchData");
    },
    computed: {
        ...mapState("tongcityAddViewPc", ["areaId", "model","moduleId"])
    },
    components: {
    	publishTabBar,
        indexTemplate,
        inputBox,
        textareaBox,
        selectBox,
        upLoadImgBox,
        publishBtn,
        btnGroup,
        radioGroup
    },
    
    data() {
        return {
    		currentIndex: 1,
            formData:{},
            tongcityStorage:{},
           
            formReset: { //表单初始化数据
                title: {
                    text: "标题",
                    placeHolder: '请输入标题',
                    warning: false,
                    reset: '',
                     must: true
                },
                serviceText: {
                    text: '详情描述',
                    placeHolder: '请输入详情',
                    warning: false,
                    reset: '',
                     must: true
                },
                imgListReset:{
                    imgList:[],
                    bigImgList:[]
                },
                price: {
                    text: '价格',
                    placeHolder: '如1000或面议',
                    reset:  ''
                },
                asyncSelectList:{
                    list:[],
                    reset: ['','']
                },
                location:'',
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
            this.fillResetData(this.model)
        }
        if(!this.model && sessionStorage.tongcityStorage){
            let a = JSON.parse(sessionStorage.tongcityStorage)
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
           this.formReset.price.reset = model.price;
           
          
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
            this.formData.tongcityId = this.model ? this.model.tongcityId : '';
            this.formData.moduleId = this.moduleId;
            this.formData.areaId = this.areaId;
            this.formData.title = this.$refs.title.inputVal;
            this.formData.serviceText = this.$refs.serviceText.inputVal;
            this.formData.imgList = this.$refs.imgList.imgList;
            this.formData.bigImgList = this.$refs.imgList.bigImgList;
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
            if(this.model){
                tongcityserviceUpdate(this.formData).then(response => {
                    let result = response.data;
                    if(result.success){
                        alert('更新成功');
                        sessionStorage.clear()
                          this.$router.push(resolveUrl(this.$store, '/n/w/membercenter/order'))
                    } else{
                        alert('更新失败')
                    }
                    
                })
            } else {
                tongcityserviceAdd(this.formData).then(response => {
                    let result = response.data;
                    if(result.success){
                        sessionStorage.clear()
                         this.$router.push({path: resolveUrl(this.$store, "/n/w/life/publish/result/result"), query:{status: 1}})
                    } else{
                        alert('添加失败')
                    }
                    
                })
            }
            
        },

        gotoAgreeMent(){
            this.tongcityStorage.title = this.$refs.title.inputVal;
            this.tongcityStorage.serviceText = this.$refs.serviceText.inputVal;
            this.tongcityStorage.imgList = this.$refs.imgList.imgList;
            this.tongcityStorage.bigImgList = this.$refs.imgList.bigImgList;
            this.tongcityStorage.price = this.$refs.price.inputVal;
            this.tongcityStorage.type1 = this.$refs.asyncSelectList.typeSelectVal[0];
            this.tongcityStorage.type2 = this.$refs.asyncSelectList.typeSelectVal[1];
            this.tongcityStorage.address = this.$refs.address.inputVal;
            this.tongcityStorage.contact = this.$refs.contact.inputVal;
            this.tongcityStorage.tel = this.$refs.tel.inputVal;
            this.tongcityStorage.email = this.$refs.email.inputVal;

            sessionStorage.setItem('tongcityStorage', JSON.stringify(this.tongcityStorage))
            var locationHref = window.location.href.split('life/');
            var url = locationHref[0] + 'life/publish/agreement'
            window.location.href = url
        }
    }
}
</script>
<style scoped>
.form-wrap {
    min-width: 638px;
}

li {
    margin-top: 18px;
}

.box-wrap {
    overflow: hidden;
}
</style>


