<template>
    <div class="wrap">
        <div class="title">上传图片</div>
        <div class="img-box">
            <input type="file" @change="fileChange" id="file" ref="file" multiple accept="image/*">
            <div class="img-show">
                <div class="img-item"  v-for="item,index in imgList">
                    <img  :src="item" alt="">
                    <span @click="delImg(index)"></span>
                </div>
            </div>
            <label v-if="imgList.length<9" class="btn" for="file">
                <p>请上传本地图片</p>
                <img src="./img/up-load-img.png" height="119" width="134" alt="">
            </label>
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
    props: {
        imgListReset: {
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
    computed: {

        resetImgList() {
            return this.imgListReset.imgList
        },
        resetBigImgList() {
            return this.imgListReset.bigImgList
        },
    },
    watch: {
        resetImgList(newVal) {
            this.imgList = newVal
        },
        resetBigImgList(newVal) {
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
                console.log(img)
                console.log(result)
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
    min-width: 630px;
    margin-top: 20px;
    .title {
        font-size: 16px;
        float: left;
        color: #17191a;
        width: 70px;
        margin-right: 30px;
        text-align: right;
        line-height: 48px;
    }
    .img-box {
        overflow: hidden;
        margin-left: 2rem;
        input[type='file'] {
            display: none;
        }
        .img-show{
            overflow: hidden;
        }
        .img-item {
            float: left;
            display: block;
            position: relative;
            width: 127px;
            margin-right: 10px;
            margin-bottom: 10px;
            cursor: pointer;
            img {
                width: 100%;
            }
            span {

                display: block;
                position: absolute;
                top: 0;
                right: 0;
                width: 16px;
                height: 16px;
                background: url(~@/assets/m/images/x.png) center center no-repeat rgba(0, 0, 0, .2);
                background-size: 10px 10px;
            }
        }
        .btn {
            cursor: pointer;
            display: block;
            width: 300px;
            height: 220px;
            border: 1px solid #ccc;
            p {
                width: 100%;
                text-align: center;
                color: #ccc;
                background: #f3f4f6;
                font-size: 16px;
                height: 35px;
                line-height: 35px;
                border-bottom: 1px solid #ccc;
            }
            img {
                display: block;
                margin: 30px auto;
            }
        }
    }
    .tips {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        background: rgba(0, 0, 0, .8);
        color: #fff;
        font-size: 16px;
        width: 130px;
        height: 50px;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>