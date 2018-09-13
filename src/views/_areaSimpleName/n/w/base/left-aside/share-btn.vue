<template>
    <!-- <div class="blue_header clearfloat">
            <h3>分享</h3>
        </div> -->
    <affix>
        <div>
            <div class="bdsharebuttonbox" id="new_details_share">
                <a class="bds_qzone" data-cmd="qzone" title="分享到QQ空间">
                    QQ空间
                </a>
                <a class="bds_weixin" data-cmd="weixin" title="分享到微信" @click="hideMoreDialog()">
                    微信
                </a>
                <a class="bds_tsina" data-cmd="tsina" title="分享到新浪微博">微博
                </a>
                <a class="popup_twi" data-cmd="twi" title="分享到Twitter">Twitter
                </a>
                <a href="javascript:window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(document.location.href)+'&amp;t='+encodeURIComponent(document.title),'_blank');void(0)" class="facebook-share" title="分享到facebook">facebook</a>
                <a class="bds_more" data-cmd="more" @click.stop="hideWeixinDialog()">更多</a>
            </div>
            <!-- <div class="bdsharebuttonbox">
            <a href="#" class="bds_more" data-cmd="more"></a>
            <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
            <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
            <a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>
            <a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a>
            <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
        </div> -->

        </div>
    </affix>
</template>
<script>
    import affix from '../common/affix.vue'
    export default {
        props: {

        },
        methods: {

        },
        beforeMount() {
            // document
        },
        mounted() {
            this.setShareData();
        },
        components: {
            affix
        },
        methods: {
            setShareData() {
                // 不通用的实现， 紧急处理官网详情页新浪分享没有图片问题, 取内容第一张图片
                let imgs = document.querySelectorAll(".news-content img")
                let firstImgUrl = ""
                if (imgs != null) {
                    for(let i = 0; i < imgs.length; i++){
                        let imgUrl = imgs[i].getAttribute("src")
                        if(imgUrl != null && imgUrl.length > 0 && imgUrl.indexOf("http") < 0){
                            continue
                        }
                        firstImgUrl = imgUrl
                        break;
                    }
                }

                window._bd_share_config =
                    { "common": { "bdSnsKey": {}, "bdText": "", "bdMini": "2", "bdPic": firstImgUrl, "bdStyle": "0", "bdSize": "16" }, "share": {} };
                /* (document) 0[ */
                (document.getElementsByTagName('head')[0] || body).appendChild(document.createElement('script')).src = '/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)/* ] */;
            },
            hideMoreDialog() {
                let box = document.querySelector(".bdshare_dialog_box");
                if (box != null) {
                    box.style.display = "none";
                }
            },
            hideWeixinDialog() {
                let box = document.querySelector(".bd_weixin_popup");
                if (box != null) {
                    box.style.display = "none";
                }
            }
        },
    };
</script>
<style>
    .detail_left {
        float: left;
        width: 10.1667%;
        min-height: 1000px;
        padding-top: 20px;
        /* box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.5); */
    }

    /*新闻列表的百度分享*/

    #new_details_share {
        width: 100%;
    }

    #new_details_share>a {
        display: block;
        margin: 20px 0 0 0;
        width: 100%;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        padding-left: 55px;
        color: #666666;
        background-size: 42px 232px;
    }

    #new_details_share>a i {
        display: inline-block;
        width: 46px;
        height: 32px;
        margin-top: 0!important;
    }

    /* 
    重置分享样式
     */

    .bdsharebuttonbox a.bds_qzone {
        background: url('~@/assets/web/share-icon.png') no-repeat 0px 0px;
    }

    .bdsharebuttonbox a.bds_weixin {
        background: url('~@/assets/web/share-icon.png') no-repeat 0px -40px;
    }

    .bdsharebuttonbox a.bds_tsina {
        background: url('~@/assets/web/share-icon.png') no-repeat 0px -80px;
    }

    .bdsharebuttonbox a.popup_twi {
        background: url('~@/assets/web/share-icon.png') no-repeat 0px -120px;
    }

    .bdsharebuttonbox a.facebook-share {
        background: url('~@/assets/web/share-icon.png') no-repeat 0px -160px;
    }

    .bdsharebuttonbox a.bds_more {
        background: url('~@/assets/web/share-icon.png') no-repeat 0px -200px;
    }

    /* .bdshare_popup_bg,.bdshare_popup_box{
        display:inline!important;
    } */

    .bdshare_popup_bottom {}

    .bdshare_popup_bottom .popup_more {
        display: none;
    }

    .bd_weixin_popup .bd_weixin_popup_main {
        padding: 10px 10px 5px!important;
    }
</style>