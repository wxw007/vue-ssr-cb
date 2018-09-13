<template>
    <editTemplate>
        <div id="content_area" style="width:88%;margin-left:0;background:#FAFAFA;">
            <div class="user-data">
                <div class="input-item ">
                    <label for="names">昵称</label>
                    <input id="names" type="text" name="memberPetName" v-bind:disabled="!isEidt.memberPetName" v-model="userEidt.memberPetName" ref="memberPetName" @keydown="keydownHandle($event,'memberPetName')">
                    <i @click="editInput('memberPetName')">{{isEidt.memberPetName?'完成':'编辑'}}</i>
                </div>
                <div class="input-item ">
                    <label for="user-sign">个性签名</label>
                    <input id="user-sign" maxlength="40" type="text" name="signature" v-bind:disabled="!isEidt.signature" v-model="userEidt.signature" ref="signature" @keydown="keydownHandle($event,'signature')">
                    <i @click="editInput('signature')">{{isEidt.signature?'完成':'编辑'}}</i>
                </div>
            </div>
        </div>
    </editTemplate>
</template>
<script>
    import { mapState } from "vuex"
    import { updateMember } from '@/api/web'
    import editTemplate from './base/layouts/edit-template.vue'
    import memberDataEdit from '@/store/modules/web/membercenter/data-edit.js'

    export default {
        storeModule() {
            return { memberDataEdit }
        },
        asyncData({ store }) {
            return store.dispatch("memberDataEdit/fetchData");
        },
        data() {
            return {
                userEidt: {
                    memberPetName: null,
                    signature: null
                },
                isEidt: {
                    memberPetName: false,
                    signature: false,
                }
            };
        },
        computed: {
            ...mapState("memberDataEdit", ["member"])
        },
        components: {
            editTemplate
        },
        beforeMount() {
            this.userEidt.memberPetName = this.member.memberPetName
            this.userEidt.signature = this.member.signature
        },
        methods: {
            editInput(name) {
                this.isEidt[name] = this.isEidt[name] ? false : true;
                if (this.isEidt[name]) {
                    this.$nextTick(() => {
                        this.$refs[name].focus();
                    })
                }
                if (!this.isEidt[name]) {
                    this.saveMember(name);
                };
            },
            keydownHandle(e, name) {
                var keyCode = e.keyCode;
                if (keyCode == "13") {
                    this.saveMember(name);
                }
            },
            saveMember(name) {//保存，并且发起请求
                this.isEidt[name] = false;
                if (this.userEidt[name] != this.member[name]) {
                    var obj = {};
                    obj[name] = this.userEidt[name];
                    updateMember(obj).then(response => {
                        let result = response.data;
                        if (result.success) {
                            window.location.reload();
                        }
                    });
                }
            }
        }
    };
</script>
<style>
    .user-data {
        padding: 28px 50px;
    }

    .input-item {
        height: 50px;
        padding: 0 30px;
        background: #fff;
        margin-bottom: 20px;
        border-radius: 2px;
        overflow: hidden;
    }

    .input-item label {
        display: inline-block;
        width: 109px;
        line-height: 50px;
        font-size: 16px;
        color: #17191a;
        font-weight: 800;
    }

    .input-item input {
        display: inline-block;
        width: 680px;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        color: #17191a;
    }

    .input-item i {
        float: right;
        line-height: 50px;
        display: inline-block;
        font-size: 16px;
        color: #0082c6;
        font-style: normal;
        cursor: pointer;
    }

    .input-item a {
        float: right;
        line-height: 50px;
        display: inline-block;
        font-size: 16px;
        color: #0082c6;
        font-style: normal;
        cursor: pointer;
    }

    .pal-data {
        height: 50px;
        padding: 0 30px;
        background: #fff;
        margin-bottom: 20px;
        border-radius: 2px;
        overflow: hidden;
    }

    .pal-data.pal-data-show {
        height: auto;
    }

    .pal-data .pal-data-switch {
        height: 50px;
        margin-bottom: 6px;
    }

    .pal-data-switch b {
        display: inline-block;
        font-size: 16px;
        color: #17191a;
        height: 50px;
        line-height: 50px;
    }

    .pal-data-switch i {
        float: right;
        line-height: 50px;
        display: inline-block;
        font-size: 16px;
        color: #0082c6;
        font-style: normal;
        cursor: pointer;
    }

    .pal-data-item {
        height: 50px;
        background: #fff;
        margin-bottom: 20px;
        border-radius: 2px;
        overflow: hidden;
    }

    .pal-data-item label {
        display: inline-block;
        width: 65px;
        line-height: 50px;
        font-size: 16px;
        color: #17191a;
        text-align: right;
        margin-right: 20px;
    }

    .pal-data-item input {
        display: inline-block;
        width: 680px;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        color: #17191a;
    }

    .pal-data-item i {
        float: right;
        line-height: 50px;
        display: inline-block;
        font-size: 16px;
        color: #0082c6;
        font-style: normal;
        cursor: pointer;
    }

    .pal-data-item select {
        display: inline-block;
        border: 1px solid #e6e6e6;
        border-radius: 2px;
    }

    .usertag-box {}

    .usertag-box label {
        float: left;
    }

    .usertag-box .usertag-show {
        float: left;
        display: inline-block;
        width: 680px;
        min-height: 50px;
        line-height: 50px;
        font-size: 16px;
    }

    .usertag-show span {
        display: inline-block;
        min-width: 90px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 16px;
        color: #fff;
        padding: 0 15px;
        background: #0082c6;
        margin: 0 5px 10px;
        cursor: pointer;
    }

    .usertag-show input {
        display: inline-block;
        width: 90px;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        color: #17191a;
        padding-left: 5px;
        border: 1px solid #e6e6e6;
    }

    .birth .year {
        width: 90px;
        height: 30px;
    }

    .birth span {
        color: #17191a;
        font-size: 16px;
        margin: 0 10px;
    }

    .birth .month {
        width: 68px;
        height: 30px;
    }

    .birth .day {
        width: 68px;
        height: 30px;
    }

    .pal-data-item.half-item {
        display: inline-block;
        width: 50%;
    }

    .half-item select {
        width: 90px;
        height: 30px;
        display: inline-block;
        border: 1px solid #e6e6e6;
        border-radius: 2px;
    }

    .half-item input {
        display: inline-block;
        width: 62.5%;
        height: 30px;
        border: 1px solid #e6e6e6;
        border-radius: 2px;
    }

    .full-item input {
        display: inline-block;
        width: 81.35%;
        height: 30px;
        border: 1px solid #e6e6e6;
        border-radius: 2px;
    }

    .item-intro {
        padding-left: 85px;
        color: #bbbbbb;
        font-size: 16px;
    }

    .pal-data.tag-data .pal-data-item {
        margin-bottom: 0px;
    }

    .tag-item {
        background: #fff;
        margin-bottom: 20px;
        border-radius: 2px;
        overflow: hidden;
        padding: 0px 85px;
    }

    .tag-item:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
    }

    .tag-item label {
        float: left;
        display: inline-block;
        width: 79px;
        height: 32px;
        line-height: 32px;
        font-size: 16px;
        color: #17191a;
        text-align: left;
    }

    .tag-item i {
        float: right;
        line-height: 50px;
        display: inline-block;
        font-size: 16px;
        color: #0082c6;
        font-style: normal;
        cursor: pointer;
    }

    .tag-item ul {
        float: right;
        width: 89.12%;
        border: 1px solid;
        display: inline-block;
    }

    .tag-item ul li {
        display: inline-block;
        min-width: 90px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 16px;
        color: #bbbbbb;
        padding: 0 15px;
        background: #f2f2f2;
        margin: 0 5px 10px;
        cursor: pointer;
    }

    .tag-btn-area {
        padding-left: 85px;
        margin-bottom: 30px;
    }

    .tag-btn-area span {
        display: inline-block;
        width: 120px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        font-size: 16px;
        cursor: pointer;
        border: 1px solid #e6e6e6;
        border-radius: 2px;
    }

    .tag-btn-area .save-btn {
        background: #0082c6;
        color: #fff;
        margin-right: 30px;
    }

    /* .input-item i{
      float:right;
      line-height:50px;
      display:inline-block;
      font-size:16px;
      color:#0082C6;
      cursor:pointer;
    } */
</style>