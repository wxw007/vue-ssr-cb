<template>
     <indexTemplate>
        <publish-tab-bar :currentIndex='currentIndex'></publish-tab-bar>
        <div class="form-wrap">
            <input-box :content='formReset.title' ref="title"></input-box>
            <textarea-box :content='formReset.serviceText' ref="serviceText"></textarea-box>
                <select-box-one :content='formReset.gender' ref="gender"></select-box-one>
                <input-box :content='formReset.jobName' ref="jobName"></input-box>
                <input-box :content='formReset.wageDemand' ref="wageDemand"></input-box>
                <select-box :content='formReset.asyncSelectList' ref="asyncSelectList"></select-box>
                <input-box :content='formReset.contacter' ref="contacter"></input-box>
                <input-box :content='formReset.tel' ref="tel"></input-box>
                <input-box :content='formReset.email' ref="email"></input-box>
                <input-box :content='formReset.degree' ref="degree"></input-box>
                <input-box :content='formReset.age' ref="age"></input-box>
                <radio-group :content='formReset.isFullTime' ref="isFullTime"></radio-group>
        </div>
        <publish-btn @submit="submitData" @gotoAgreeMent="gotoAgreeMent"></publish-btn>
    </indexTemplate>
</template>
<script>
/** 
 *  生活发布-求职
 * @author wxw
 * @since 2018-07-06 11:03
 * 数据接口和微网共用，放在weiapi文件夹
 */

import indexTemplate from '../base/layouts/index-template.vue'
import publishTabBar from '../base/publish-tab-bar.vue'
import { resolveUrl } from '@/util/common/url.js'
import { getQueryString } from '@/util/common/getQueryString.js'
import { mapState } from "vuex"
import { queryServicequerytypeList, jobserviceAdd, jobserviceUpdate } from '@/api/wei'
import inputBox from '../base/input-box.vue'
import textareaBox from '../base/textarea-box.vue'
import selectBox from '../base/select-box.vue'
import selectBoxOne from '../base/select-box-one.vue'
import upLoadImgBox from '../base/up-load-img-box.vue'
import publishBtn from '../base/publish-btn.vue'
import btnGroup from '../base/btn-group.vue'
import radioGroup from '../base/radio-group.vue'
import jobAddViewPc from '@/store/modules/web/life/jobservice/addView.js'
export default {
    storeModule() {
        return { jobAddViewPc };
    },
    asyncData({ store }) {
        return store.dispatch("jobAddViewPc/fetchData");
    },
    computed: {
        ...mapState("jobAddViewPc", ["areaId", "model", "moduleId"])
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
        radioGroup,
        selectBoxOne

    },

    data() {
        return {
        	currentIndex: 1,
            formData: {},
            jobStorage: {},
            
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

                gender: {
                    text: '性别',
                    list: [{
                            label: '女',
                            value: '0'
                        },
                        {
                            label: '男',
                            value: '1'
                        }
                    ],
                    reset: ''
                },
                jobName: {
                    text: '岗位',
                    placeHolder: '自定义',
                    reset: ''
                },
                wageDemand: {
                    text: '期望薪资',
                    placeHolder: '请输入期望薪资',
                    reset: ''
                },
                asyncSelectList: {
                    list: [],
                    reset: ['', '']
                },
                contacter: {
                    text: '联系人',
                    placeHolder: '请输入真实有效的联系人名字',
                    reset: '',
                    size: 'small'
                },
                tel: {
                    text: '联系电话',
                    placeHolder: '输入真实有效的联系方式',
                    reset: '',
                    size: 'small'
                },
                email: {
                    text: '邮箱',
                    placeHolder: '请输入直接有效的邮箱',
                    reset: '',
                    size: 'small'
                },
                degree: {
                    text: '学历',
                    placeHolder: '输入最高文化水平',
                    reset: '',
                    size: 'small'
                },
                age: {
                    text: '年龄',
                    placeHolder: '多大岁数啦',
                    reset: '',
                    size: 'small'
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
            this.fillResetData(this.model)
        } 
        if (!this.model && sessionStorage.jobStorage) {
            let a = JSON.parse(sessionStorage.jobStorage)
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
            this.formReset.gender.reset = model.gender;
            this.formReset.jobName.reset = model.jobName
           
            this.formReset.contacter.reset = model.contacter;
            this.formReset.tel.reset = model.tel;
            this.formReset.email.reset = model.email;
            this.formReset.wageDemand.reset = model.wageDemand;
            this.formReset.degree.reset = model.degree;
            this.formReset.age.reset = model.age;
            this.formReset.isFullTime.reset = model.isFullTime;
        },
        //提交表单↓↓↓↓↓↓↓↓
        submitData() {
            if (!this.$refs.title.inputVal) {
                this.formReset.title.warning = true;
                window.scrollTo(0,0)
                return
            }
            if (!this.$refs.serviceText.inputVal) {
                this.formReset.serviceText.warning = true;
                window.scrollTo(0,0)
                return
            }
            // if(!this.$refs.gender.selectVal || this.$refs.gender.selectVal == ''){
            //     alert('请选择性别')
            //     return
            // }
            this.formData.jobId = this.model ? this.model.jobId : '';
            this.formData.moduleId = this.moduleId;
            this.formData.areaId = this.areaId;
            this.formData.title = this.$refs.title.inputVal;
            this.formData.serviceText = this.$refs.serviceText.inputVal;
            this.formData.gender = this.$refs.gender.selectVal;
            this.formData.jobName = this.$refs.jobName.inputVal;
            this.formData.wageDemand = this.$refs.wageDemand.inputVal;
             if(this.formReset.asyncSelectList.list.length > 0 && this.formReset.asyncSelectList.list[0].sqtValue != 'type1'){
                this.formData.type2 = this.$refs.asyncSelectList.typeSelectVal[0];
                this.formData.type1 = this.$refs.asyncSelectList.typeSelectVal[1];
            } else  {
                this.formData.type1 = this.$refs.asyncSelectList.typeSelectVal[0];
                this.formData.type2 = this.$refs.asyncSelectList.typeSelectVal[1];
            }
            this.formData.location = this.model ? this.model.location : '';
            this.formData.contacter = this.$refs.contacter.inputVal;
            this.formData.tel = this.$refs.tel.inputVal;
            this.formData.email = this.$refs.email.inputVal;
            this.formData.degree = this.$refs.degree.inputVal;
            this.formData.age = this.$refs.age.inputVal;
            this.formData.isFullTime = this.$refs.isFullTime.currentChecked;
            if (this.model) {
                jobserviceUpdate(this.formData).then(response => {
                    let result = response.data;
                    if (result.success) {
                        alert('更新成功');
                        sessionStorage.clear()
                        this.$router.push(resolveUrl(this.$store, '/n/w/membercenter/order'))
                    } else {
                        alert('更新失败')
                    }

                })
            } else {
                jobserviceAdd(this.formData).then(response => {
                    let result = response.data;
                    if (result.success) {
                        sessionStorage.clear()
                        this.$router.push({path: resolveUrl(this.$store, "/n/w/life/publish/result/result"), query:{status: 1}})
                    } else {
                        alert('添加失败')
                    }

                })
            }

        },
        gotoAgreeMent() {
            this.jobStorage.title = this.$refs.title.inputVal;
            this.jobStorage.serviceText = this.$refs.serviceText.inputVal;
            this.jobStorage.gender = this.$refs.gender.selectVal;
            this.jobStorage.jobName = this.$refs.jobName.inputVal;
            this.jobStorage.wageDemand = this.$refs.wageDemand.inputVal;
            this.jobStorage.type1 = this.$refs.asyncSelectList.typeSelectVal[0];
            this.jobStorage.type2 = this.$refs.asyncSelectList.typeSelectVal[1];
            this.jobStorage.contacter = this.$refs.contacter.inputVal;
            this.jobStorage.tel = this.$refs.tel.inputVal;
            this.jobStorage.email = this.$refs.email.inputVal;
            this.jobStorage.degree = this.$refs.degree.inputVal;
            this.jobStorage.age = this.$refs.age.inputVal;
            this.jobStorage.isFullTime = this.$refs.isFullTime.currentChecked;

            sessionStorage.setItem('jobStorage', JSON.stringify(this.jobStorage))
            var locationHref = window.location.href.split('life/');
            var url = locationHref[0] + 'life/publish/agreement'
            window.location.href = url
        }
    }
}
</script>
