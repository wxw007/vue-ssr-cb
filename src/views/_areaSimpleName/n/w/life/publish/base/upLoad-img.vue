<template>
    <div class="up-load-img-wrapper">
        <input type="file" @change="fileChange" multiple id="file" ref="file">
        <div class="show-img" v-if="imgUrlList">
            <div class="img-item" v-for="item,index in imgUrlList">
                <img :src="item.imgUrl" alt="">
                <span @click="delImg(index)">x</span>
            </div>
        </div>
        <label class="up-load-icon" for="file">
            <p class="title">请上传本地图片</p>
            <div class="icon"><img src="./img/up-load-img.png" height="119" width="134" alt=""></div>
        </label>
        <div class="tips">最多可上传<span>8</span>张图片,每张大小不超过<span>20M</span></div>
    </div>
</template>
<script>
/** 
 * 
 * @author wxw
 * @since 2018-05-03 10:19
 */
export default {
   
    data() {
        return {
            imgUrlList: []
        }
    },
    
     mounted() {
        if (this.$route.query.fill) {
            var fillData = JSON.parse(localStorage.formData) ? JSON.parse(localStorage.formData) : '';
            this.imgUrlList = fillData.imgUrlList
        }
    },
    methods: {
        delImg(index) {
            this.imgUrlList.splice(index, 1)
            this.$emit("delImg", this.imgUrlList)
        },
        fileChange(e) {
            var that = this;
            var img = e.target.files;
            if ((img.length + that.imgUrlList.length > 8)) {
                alert("最多只能上传8张图片")
                return
            }
            for (let i = 0; i < img.length; i++) {
                let type = img[i].name.split(".")[1];
                //判断是否是图片
                var imgType = that.judgeImgType(type);
                //判断图片大小
                if (imgType) {
                    var size = img[i].size;
                    var imgSize = that.judgeImgSize(size);
                    if (imgSize) {
                        /***** 有接口后此段要改成ajax S *****/
                        let reader = new FileReader();
                        reader.readAsDataURL(img[i]);
                        reader.onload = function() {
                            var imgUrl = this.result;
                            var exist = { 'imgUrl': imgUrl }
                            that.imgUrlList.push(exist);
                        }
                         /***** 有接口后此段要改成ajax E *****/
                    }
                }
            }
            that.$emit("upLoadImg", that.imgUrlList)
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
            if (size > (20*1024*1024)) {
                alert("图片大小不能超过20M")
                return false
            } else{
            	return true
            }
        }

    }
}
</script>
<style scoped lang="less">
.up-load-img-wrapper {
    overflow: hidden;
    input[type='file'] {
        display: none;
    }
    .show-img {
        .img-item {
            position: relative;
            display: inline-block;
            width: 110px;
            height: 90px;
            margin: 0 15px 10px 0;

            img {
                width: 100%;
                height: 100%;
            }
            span {
                position: absolute;

                top: 0;
                right: 0;
                border-radius: 50%;
                display: block;
                width: 20px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                background: rgba(0, 0, 0, .4);
                color: #fff;
                font-size: 14px;
                cursor: pointer;
                &:hover {
                    background: rgba(0, 0, 0, .6);
                }
            }
        }
    }


    .up-load-icon {
        display: block;
        cursor: pointer;
        width: 300px;
        height: 220px;
        border: 1px solid #ccc;
        .title {
            text-align: center;
            background: #f3f4f6;
            height: 35px;
            line-height: 35px;
            color: #ccc;
            font-size: 16px;
            border-bottom: 1px solid #ccc;
        }
        .icon {
            text-align: center;
            display: table-cell;
            width: 300px;
            height: 185px;
            vertical-align: middle;
            img {
                width: 134px;
                height: 119px;
            }
        }
    }
    .tips {
        color: #ccc;
        margin-top: 5px;
        font-size: 14px;
        span {
            color: #0082c6;
        }
    }
}
</style>