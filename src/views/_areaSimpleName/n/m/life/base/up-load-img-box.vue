<template>
    <div class="wrap">
        <div class="title"><span>图</span><span>片</span></div>
        <div class="img-box">
            <input type="file" @change="fileChange"  id="file" ref="file" accept="image/*">
            <div class="img-item" v-for="item,index in imgList">
                <img :src="item" alt="">
                <span @click="delImg(index)"></span>
            </div>
            <label v-if="imgList.length<9" class="img-item" for="file"><img src="~@/assets/m/images/upload-icon.png" alt=""></label>
        </div>
        <div class="tips" v-show="isShowTips">{{imgUploadTips}}</div>
    </div>
</template>
<script>
/** 
 * 
 * @author wxw
 * @since 2018-07-06 11:32
 */
import { uploadImg } from '@/api/wei'
export default {
    props:{
        imgListReset:{
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            imgList: this.imgListReset ? this.imgListReset.imgList : [],
            bigImgList: this.imgListReset ? this.imgListReset.bigImgList : [],
            imgUploadTips: '图片上传中...',
            isShowTips: false
        }
    },
    computed:{
        
        resetImgList(){
            return this.imgListReset.imgList
        },
        resetBigImgList(){
            return this.imgListReset.bigImgList
        },
    },
    watch:{
        resetImgList(newVal){
            this.imgList = newVal
        },
        resetBigImgList(newVal){
            this.bigImgList = newVal
        }
    },

    methods: {
        delImg(index) {
            this.imgList.splice(index, 1)
            this.bigImgList.splice(index, 1)
        },
        fileChange(e) {
            var that = this;
            var img = e.target.files;


            if ((img.length + that.imgList.length > 9)) {
                alert("最多只能上传9张图片")
                return
            }
            for (let i = 0; i < img.length; i++) {
                //判断是否是图片
                // let type = img[i].name.split(".")[1];
                // var imgType = that.judgeImgType(type);
                //判断图片大小

                var size = img[i].size;
                var imgSize = that.judgeImgSize(size);
                if (!imgSize) {
                    return
                }
            }
            /***** 上传图片 S *****/
            that.isShowTips = true;
            uploadImg({ 'fileModel.att': img }).then(response => {
                let result = response.data;
                if (result.success) {
                    that.imgList = that.imgList.concat(result.data.imgList)
                    that.bigImgList = that.bigImgList.concat(result.data.bigImgList)
                    that.isShowTips = false;
                }
            })
            /***** 上传图片 E *****/
        },
        //判断是否是图片
        judgeImgType(type) {
            if (type != "jpg" && type != "png" && type != "bmp" && type != "jpeg" && type != "gif") {
                alert("只能上传图片")
                return false
            } else {
                return true
            }
        },
        //计算图片大小
        judgeImgSize(size) {
            if (size > (20 * 1024 * 1024)) {
                alert("图片大小不能超过20M")
                return false
            } else {
                return true
            }
        }
    }
}
</script>
<style scoped lang="less">
.wrap {
    margin: .25rem .3rem;
    border: 1px solid #ccc;
    padding: .22rem 0;
    position: relative;
    .title {
        position: absolute;
        top: .22rem;
        bottom: .22rem;
        left: 0;
        font-size: .32rem;
        float: left;
        color: #17191a;
        width: 1.75rem;
        border-right: #e0e0e0 1px solid;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 .25rem;
        margin-right: .25rem;
    }
    .img-box {
        overflow: hidden;
        margin-left: 2rem;
        input[type='file'] {
            display: none;
        }
        .img-item {
            position: relative;
            float: left;
            border-radius: .15rem;
            width: 1.3rem;
            height: 1.1rem;
            margin: .1rem .31rem .1rem 0;
            cursor: pointer;
            img {
                width: 100%;
                height: 100%;
                cursor: pointer;
            }
            span {

                display: block;
                position: absolute;
                top: 0;
                right: 0;
                width: .32rem;
                height: .32rem;
                background: url(~@/assets/m/images/x.png) center center no-repeat rgba(0, 0, 0, .2);
                background-size: .19rem .19rem;
            }
        }
    }
    .tips{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        background: rgba(0,0,0,.5);
        color: #fff;
        font-size: .32rem;
        width: 2.6rem;
        height: 1rem;
        border-radius: .2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>