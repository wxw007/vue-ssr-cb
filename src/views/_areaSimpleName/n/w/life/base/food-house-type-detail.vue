<template>
  <!-- 中间的内容区域 -->
  <div class="life-info-box">
    <div class="lift-detail-type1">
      <div class="img-box" v-if="hasImg">
        <div class="img-show">
          <img :src="nowImg" alt="">
        </div>
        <div class="life-detail-img">
          <i class="left js-left" v-if="infoObj.smallImgList.length>4">
            <b></b>
          </i>
          <i class="right js-right" v-if="infoObj.smallImgList.length>4">
            <b></b>
          </i>
          <div class="life-detail-img-box">
            <ul class="life-detail-imgList">
              <li v-for="(a,index) in infoObj.smallImgList" @click="showImg($event)
                            " :data-index="index">
                <img :src="a.imgSrc" alt="">
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="life-detail-info has-phone" v-if="hasImg">
        <div class="life-info-item money">
          <span>6666666</span>
        </div>
        <div class="life-info-item ">
          <b>联系人&nbsp;：</b>
          <span>小陈</span>
        </div>
        <div class="life-info-item ">
          <b>联系人&nbsp;：</b>
          <span>小陈</span>
        </div>
        <div class="life-info-item ">
          <b>联系人&nbsp;：</b>
          <span>小陈</span>
        </div>
        <div class="life-info-phone">
          <b></b>
          <span>50316900</span>
        </div>
      </div>
      <div class="life-detail-info other-type" v-if="!hasImg">
        <div class="life-info-item ">
          <b>联系人&nbsp;：</b>
          <span>小陈</span>
        </div>
        <div class="life-info-item ">
          <b>联系人&nbsp;：</b>
          <span>小陈</span>
        </div>
        <div class="life-info-item ">
          <b>联系人&nbsp;：</b>
          <span>小陈</span>
        </div>
        <div class="life-info-item ">
          <b>联系人&nbsp;：</b>
          <span>小陈</span>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    props: {
      hasImg: {
        //信息展示的类型，1是左图右字，2是上字下图，默认为2
        type: Boolean,
        default: false,
        // default:true,
      },
      infoObj: {
        default() {
          return {
            smallImgList: [
              { imgSrc: require("../../../../../assets/web/delete/food-1.png") },
              { imgSrc: require("../../../../../assets/web/delete/food-1.png") },
              { imgSrc: require("../../../../../assets/web/delete/food-1.png") },
              { imgSrc: require("../../../../../assets/web/delete/food-1.png") },
              { imgSrc: require("../../../../../assets/web/delete/food-1.png") },
              { imgSrc: require("../../../../../assets/web/delete/food-1.png") },
              { imgSrc: require("../../../../../assets/web/delete/food-1.png") }
            ],
            bigImgList: [
              { imgSrc: require("../../../../../assets/web/delete/food-2.png") },
              { imgSrc: require("../../../../../assets/web/delete/sss.png") },
              { imgSrc: require("../../../../../assets/web/delete/food-2.png") },
              { imgSrc: require("../../../../../assets/web/delete/sss.png") },
              { imgSrc: require("../../../../../assets/web/delete/food-2.png") },
              { imgSrc: require("../../../../../assets/web/delete/sss.png") },
              { imgSrc: require("../../../../../assets/web/delete/food-2.png") }
            ],
            infoForm: {
              addr: "福建省福州市鼓楼区福州市鼓楼区福州 市鼓楼区",
              bsnHours: "周一至周六10:00-21:00",
              serve: [{ takeOut: true }, { reserve: true }, { creditCard: true }],
              phone: "50316900"
            }
          };
        }
        //默认的数据
      }
    },
    data() {
      return {
        isInform: false, //如果用户点击举报的话，把这个改为true
        nowImg: require("../../../../../assets/web/delete/food-2.png"),
        nowIndex: 0
      };
    },
    beforeMount() {
      this.lifeDetailImgList();
    },
    methods: {
      showImg(e) {
        var target = e.target;
        if (target.nodeName == "IMG") {
          target = target.parentNode;
        }
        var index = target.getAttribute("data-index");
        this.nowImg = this.infoObj.bigImgList[index].imgSrc;
        // console.log(this.infoObj.bigImgList[index].imgSrc);

      },
      /* 
          生活详情的图片列表
       */
      lifeDetailImgList() {
        var ul = document.getElementsByClassName("life-detail-imgList");
        if (!ul[0]) {
          return false;
        }
        var lis = ul[0].getElementsByTagName("li");
        var liw = this.getEleStyle(lis[0], "width");
        var limargin = this.getEleStyle(lis[0], "marginRight");
        var ulwidth = (liw + limargin) * lis.length + 14;
        for (var i = 0, len = lis.length; i < len; i++) {
          lis[i].style.width = liw + "px";
        }
        ul[0].style.width = ulwidth + "px";
        this.pictrueBindEvent(ul, liw, lis.length); //进行绑定事件
      },
      pictrueBindEvent(ul, liw, linum) {
        this.nowIndex = 0; //设置当前的下表
        var maxLength = parseInt(linum / 4);
        var _this = this;
        //上一张
        document
          .getElementsByClassName("js-left")[0]
          .addEventListener("click", function (e) {
            var target = e.target;
            if (_this.nowIndex >= maxLength) {
              _this.nowIndex--;
              _this.movePictrue(ul[0], _this.nowIndex, liw);
            }
          });
        //下一张
        document
          .getElementsByClassName("js-right")[0]
          .addEventListener("click", function (e) {
            var target = e.target;
            if (_this.nowIndex < maxLength) {
              _this.nowIndex++;
              _this.movePictrue(ul[0], _this.nowIndex, liw);
            }
          });
      },
      movePictrue(ul, index, s) {
        var div = document.getElementsByClassName("life-detail-img-box")[0];
        var div = this.getEleStyle(div, "width");
        ul.style.transform = "translate3d(" + -div * index + "px,0,0)";
        // transform:translate3d(-710px,0,0);
        // ul.style.marginLeft="translate3d("+index*s+"px,0px,px)";
      },
      getEleStyle(ele, pro) {
        //给出需要计算的样式
        return parseFloat(getComputedStyle(ele)[pro]);
      }
    }
  };
</script>


<style>
  .life-info-box {
    margin-top: 40px;
  }


  .lift-detail-type1:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
  }

  .life-info-box .img-box {
    float: left;
    width: 51.136%;
  }

  .img-box .img-show {
    width: 100%;
    height: 263px;
  }

  .img-box .img-show img {
    width: 100%;
    height: 100%;
  }

  /* 
    图片滚动的样式
 */

  .life-detail-img {
    position: relative;
    width: 100%;
    height: 50px;
    margin-top: 9px;
    overflow: hidden;
  }

  .life-detail-img-box {
    width: 91.5%;
    margin-left: 20px;
    overflow: hidden;
  }

  .other-type .life-detail-img-box {
    width: 91.5%;
    margin-left: 20px;
  }

  .life-detail-img i {
    position: absolute;
    z-index: 2;
    width: 10px;
    height: 100%;
    cursor: pointer;
    background-color: #ccc;
  }

  .life-detail-img i b {
    display: block;
    width: 100%;
    height: 100%;
  }

  .life-detail-img .left {
    top: 0;
    left: 0;
    background: url("../../../../../assets/web/swiper-left.png") no-repeat center left;
    background-size: 100% 100%;
  }


  .life-detail-img .right {
    top: 0;
    right: 0;
    background: url("../../../../../assets/web/swiper-right.png") no-repeat center right;
    background-size: 100% 100%;
  }

  .life-detail-img .right b {}

  .life-detail-imgList {
    transition: all 0.5s ease-in-out;
  }

  .life-detail-imgList li {
    display: inline-block;
    width: 69px;
    height: 100%;
    border-radius: 2px;
    margin-right: 14px;
    cursor: pointer;
  }

  .life-detail-imgList li img {
    width: 100%;
    height: 100%;
  }

  /* 
    美食与房屋的信息样式
 */

  .lift-detail-type1 .life-detail-info {
    float: right;
    width: 46.164%;
    min-height: 322px;
    padding-top: 25px;
  }

  .lift-detail-type1 .life-info-item {
    display: block;
    width: 100%;
    margin-bottom: 25px;
  }

  .lift-detail-type1 .life-info-item b {
    line-height: 1;
    font-size: 18px;
    color: #17191a;
  }

  .lift-detail-type1 .life-info-item span {
    line-height: 1;
    font-size: 18px;
    color: #17191a;
  }

  /*房屋什么的特殊样式*/

  .lift-detail-type1 .life-info-item.money {
    line-height: 1;
    min-height: 0;
    display: block;
    margin-bottom: 35px;
  }

  .lift-detail-type1 .life-info-item.money span {
    display: block;
    line-height: 1;
    font-size: 28px;
    color: #ed4242;
    font-weight: 800;
  }

  .has-phone {
    position: relative;
    padding-bottom: 50px;
  }

  .lift-detail-type1 .life-info-phone {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: #0082c6;
  }

  .lift-detail-type1 .life-info-phone b {
    display: inline-block;
    width: 21.538%;
    height: 100%;
    background: url("../../../../../assets/web/life-phone-icon.png") no-repeat center center;
    background-size: 100% 100%;
  }

  .lift-detail-type1 .life-info-phone span {
    float: right;
    display: inline-block;
    width: 78.462%;
    height: 100%;
    line-height: 50px;
    text-align: left;
    font-size: 28px;
    color: #fff;
    padding-left: 20px;
  }

  /* 
    自定义模式的图片列表
 */

  .other-type>b {
    position: absolute;
    line-height: 1;
    font-size: 18px;
    font-weight: 800;
    left: 0;
    top: 0;
  }

  .other-type.life-detail-img {
    padding-top: 38px;
    height: 133px;
    margin-bottom: 40px;
  }

  .other-type .life-detail-img-box {
    /* width: 88.61111%; */
    width: 91.9%;
    margin-left: 43px;
  }

  .other-type.life-detail-img i {
    position: absolute;
    z-index: 2;
    width: 20px;
    height: 95px;
    cursor: pointer;
    background-color: #ccc;
    margin-top: 38px;
  }

  .other-type .life-detail-img i b {
    display: block;
    width: 100%;
    height: 100%;
  }

  .other-type .life-detail-img .left {
    top: 0;
    left: 0;
    background: url("../../../../../assets/web/swiper-left.png") no-repeat center left;
    background-size: 100% 100%;
  }

  .other-type .life-detail-img .left b {}

  .other-type .life-detail-img .right {
    top: 0;
    right: 0;
    background: url("../../../../../assets/web/swiper-right.png") no-repeat center right;
    background-size: 100% 100%;
  }

  .other-type .life-detail-img .right b {}

  .other-type .life-detail-imgList {
    transition: all 0.5s ease-in-out;
  }

  .other-type .life-detail-imgList li {
    display: inline-block;
    width: 134px;
    height: 100%;
    border-radius: 2px;
    margin-right: 29px;
  }

  .other-type .life-detail-imgList li img {
    width: 100%;
    height: 100%;
  }

  /* 
    type2条件，要求等样式
 */

  .life-detail-info.other-type {
    min-height: 0;
    width: 100%;
  }

  .other-type .life-info-item {
    display: inline-block;
    width: 50%;
    margin-bottom: 30px;
  }

  .other-type .life-info-item b {
    line-height: 1;
    font-size: 18px;
    color: #17191a;
  }

  .other-type .life-info-item span {
    line-height: 1;
    font-size: 18px;
    color: #17191a;
  }
</style>