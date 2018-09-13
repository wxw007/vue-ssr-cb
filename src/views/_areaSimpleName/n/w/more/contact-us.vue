<template>
  <div>
    <pageHeader></pageHeader>
    <div id="index_content" class="content clearfloat">
      <!-- 左边的内容，框框需要继续存在 -->
      <div id="side_left" class="">
        <div class="about-btn-box">
          <a class="about-btn" :href='aboutUsUrl'>关于我们</a>
        </div>
        <div class="about-btn-box active">
          <a class="about-btn" :href="contactUsUrl">联系方式</a>
        </div>
      </div>
      <!-- 中间的内容区域 -->
      <div id="content_area" class="">
        <div class="news_content" style="display:block">
          <div class="cooby-intro">
            <div class="intro-content">
              <div>
                <b>福建可比信息科技有限公司</b>
              </div>
              <div>电话：0591-83771172&nbsp;&nbsp;传真：0591-28083871</div>
              <div>地址：福州市鼓楼区软件园大道89号软件园F区A楼8层</div>
              <div>
                官方网址：
                <a href="http://www.coobysoft.com/" target="_blank">www.coobysoft.com/</a>
              </div>
              <div>
                <b>商务合作</b>
              </div>
              <div>联系人：黄经理</div>
              <div>手机：+86 15280031486</div>
              <div>电话：0591-83771172</div>
              <div>邮箱：hqw@52hrtt.com</div>
              <div>QQ：283431618</div>
              <div>微信号：Hcyer1231</div>
              <div>
                <b>人力资源</b>
              </div>
              <div>邮箱：hr@52hrtt.com</div>
            </div>


            <div class="map">
              <div style="width: 602px; height: 302px; border: #ccc solid 1px;   " id="dituContent"></div>
            </div>
            <div class="intro-content">
              <div>福建可比信息科技有限公司</div>
              <div>福州市鼓楼区软件大道89号福州软件园F区A楼8层</div>
              <div>服务热线 : 0591-83771172</div>
              <div>福建可比信息科技有限公司 ©版权所有 ICP许可证号 闽ICP备10203582号-8</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右边的内容区域 -->
      <div id="side_right">
        <downloadBox></downloadBox>
      </div>
      <shortcutBtn></shortcutBtn>
    </div>
  </div>
</template>
<script>
  function _require(url, onload) {
    var doc = document;
    var head = doc.head || (doc.getElementsByTagName("head")[0] || doc.documentElement);
    var node = doc.createElement("script");
    node.onload = onload;
    node.onerror = function () {
    };
    // node.async = true;
    node.src = url;
    head.appendChild(node);
  }

  import pageHeader from "../base/header/header.vue"
  import shortcutBtn from "../base/common/shortcut_btn.vue"
  import downloadBox from "../base/right-aside/download_box.vue"
  import contactUs from '@/store/modules/web/more/contact-us.js'
  import { resolveUrl } from "@/util/common/url.js"
  export default {
    storeModule() {
      return { contactUs }
    },
    asyncData({ store }) {
      store.commit("addScript", "https://api.map.baidu.com/api?key=&v=1.1&services=true");
      return store.dispatch("contactUs/fetchData");
    },
    computed: {
      aboutUsUrl() {
        return resolveUrl(this.$store, "/n/w/more/about-us")
      },
      contactUsUrl() {
        return resolveUrl(this.$store, "/n/w/more/contact-us")
      }
    },
    components: {
      pageHeader,
      shortcutBtn,
      downloadBox
    },
    mounted() {
      //创建和初始化地图函数：
      function initMap() {
        createMap();//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件
        addMarker();//向地图中添加marker
      }

      //创建地图函数：
      function createMap() {
        var map = new window.BMap.Map("dituContent");//在百度地图容器中创建一个地图
        //var point = new BMap.Point(119.275563, 26.117737);//定义一个中心点坐标
        var point = new window.BMap.Point(119.246337, 26.107892);//定义一个中心点坐标
        map.centerAndZoom(point, 17);//设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map;//将map变量存储在全局
      }

      //地图事件设置函数：
      function setMapEvent() {
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图
      }

      //地图控件添加函数：
      function addMapControl() {
        //向地图中添加缩放控件
        var ctrl_nav = new window.BMap.NavigationControl({
          anchor: BMAP_ANCHOR_TOP_LEFT,
          type: BMAP_NAVIGATION_CONTROL_LARGE
        });
        map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
        var ctrl_ove = new window.BMap.OverviewMapControl({
          anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
          isOpen: 1
        });
        map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
        var ctrl_sca = new BMap.ScaleControl({
          anchor: BMAP_ANCHOR_BOTTOM_LEFT
        });
        map.addControl(ctrl_sca);
      }

      //标注点数组
      var markerArr = [{
        title: "福建可比信息科技有限公司",
        //content : "福州市鼓楼区软件园A区32栋（华讯股份）4楼",
        content: "福州市鼓楼区软件大道89号福州软件园F区A楼8层",
        //point : "119.275832|26.117607",
        point: "119.251421|26.105406",
        isOpen: 1,
        icon: {
          w: 21,
          h: 21,
          l: 0,
          t: 0,
          x: 6,
          lb: 5
        }
      }];
      //创建marker
      function addMarker() {
        for (var i = 0; i < markerArr.length; i++) {
          var json = markerArr[i];
          var p0 = json.point.split("|")[0];
          var p1 = json.point.split("|")[1];
          var point = new window.BMap.Point(p0, p1);
          var iconImg = createIcon(json.icon);
          var marker = new window.BMap.Marker(point, {
            icon: iconImg
          });
          var iw = createInfoWindow(i);
          var label = new window.BMap.Label(json.title, {
            "offset": new window.BMap.Size(json.icon.lb - json.icon.x + 10,
              -20)
          });
          marker.setLabel(label);
          map.addOverlay(marker);
          label.setStyle({
            borderColor: "#808080",
            color: "#333",
            cursor: "pointer"
          });

          (function () {
            var index = i;
            var _iw = createInfoWindow(i);
            var _marker = marker;
            _marker.addEventListener("click", function () {
              this.openInfoWindow(_iw);
            });
            _iw.addEventListener("open", function () {
              _marker.getLabel().hide();
            })
            _iw.addEventListener("close", function () {
              _marker.getLabel().show();
            })
            label.addEventListener("click", function () {
              _marker.openInfoWindow(_iw);
            })
            if (!!json.isOpen) {
              label.hide();
              _marker.openInfoWindow(_iw);
            }
          })()
        }
      }
      //创建InfoWindow
      function createInfoWindow(i) {
        var json = markerArr[i];
        var iw = new BMap.InfoWindow(
          "<b class='iw_poi_title' title='" + json.title + "'>"
          + json.title + "</b><div class='iw_poi_content'>"
          + json.content + "</div>", {
            "width": 220
          });

        return iw;
      }
      //创建一个Icon
      function createIcon(json) {
        var icon = new BMap.Icon(
          "http://app.baidu.com/map/images/us_mk_icon.png",
          new window.BMap.Size(json.w, json.h), {
            imageOffset: new window.BMap.Size(-json.l, -json.t),
            infoWindowOffset: new window.BMap.Size(json.lb + 5, 1),
            offset: new window.BMap.Size(json.x, json.h)
          })
        return icon;
      }
      initMap();
    }
  };
</script>




<style>
  #side_left {
    float: left;
    width: 10.1667%;
    min-height: 1000px;
    padding-top: 20px;
    /* box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.5); */
  }

  .news_content {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: all 0.8s ease-in-out;
    font-size: 15px;
  }

  .about-btn-box {
    width: 100%;
    padding: 17px 0;
  }

  .about-btn {
    display: block;
    width: 100%;
    height: 31px;
    line-height: 31px;
    color: #000;
    font-size: 16px;
    text-align: center;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
  }

  .about-btn-box.active {
    background: #FAFAFA;
  }

  .about-btn-box.active .about-btn {
    border-left: 3px solid #0082C6;
  }

  /* 
  可比简介
*/

  .cooby-intro {
    text-align: center;
  }

  .intro-content {
    font-size: 15px;
    color: #17191A;
    /* text-indent: 32px; */
    line-height: 25px;
    text-align: left;
    margin-top: 20px;
  }


  .intro-content div {
    min-height: 30px;
    margin: 10px 0;
    line-height: 30px;
  }


  /* .cooby-intro img {
    margin-top: 24px;
  } */

  /* .cooby-intro h2 {
    width: 100%;
    line-height: 1;
    font-size: 18px;
    color: #17191A;
    margin-top: 12px;
    text-align: left;
  }

  .cooby-intro h3 {
    width: 100%;
    line-height: 1;
    font-size: 18px;
    color: #17191A;
    margin-top: 12px;
  } */
</style>