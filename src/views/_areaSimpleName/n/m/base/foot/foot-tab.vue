<template>
    <!--底部导航-->
    <div class="bottom-nav clearfix">
        <touch-link class="news-nav-btn  fl" v-for="tab in tabList" :key="tab.name" :to="tab.url[0]" :class="{'on':isCurrentRoute(tab.url), 'wid50': isShowLifeService == '0'}">
            <div class="bottom-nav-title" :class="tab.activeClass">{{tab.name}}</div>
        </touch-link>
    </div>
</template>
<script>
    import { resolveUrl } from '@/util/common/url.js'
    import touchLink from '../common/global/touch-link.vue'
    /** 
     * 
     * @author wzw
     * @since 2018-02-06 08:37
     */
    export default {
        props:['isShowLifeService'],
        components:{
            touchLink
        },
        data() {
            return {
                tabList: [
                    { url: [resolveUrl(this.$store, "/n/m"), resolveUrl(this.$store, "/"), resolveUrl(this.$store, "/n/m/symposium")], name: "新闻", activeClass: "newsbtn"},
                    { url: [resolveUrl(this.$store, "/n/m/life")], name: "生活", activeClass: "lifebtn"},
                    { url: [resolveUrl(this.$store, "/n/m/mine")], name: "我的", activeClass: "mine-btn"}
                ],

            }
        },
        created(){
            if(this.isShowLifeService == '0'){
                this.tabList = [
                    { url: [resolveUrl(this.$store, "/n/m"), resolveUrl(this.$store, "/"), resolveUrl(this.$store, "/n/m/symposium")], name: "新闻", activeClass: "newsbtn"},
                    { url: [resolveUrl(this.$store, "/n/m/mine")], name: "我的", activeClass: "mine-btn"}
                ]
            }
        },
        methods: {
            to(path) {
                this.$router.replace(path);
            },
            isCurrentRoute(path) {
                for (let i = 0; i < path.length; i++) {
                    if (this.$route.path === path[i]) {
                        return true;
                    }
                }
                return false;
            }
        }

    }
</script>
<style scoped>
    /*底部导航*/
.bottom-nav{
    height: .98rem;
    line-height: .98rem;
    width: 7.5rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    right:0px;
    margin:0 auto;
    border-top:1px solid #f2f2f2;
    background: #ffffff;
    z-index: 10;
}
.news-nav-btn{
    width: 33.3%;
    text-align: center;
    line-height: .98rem;
}
.news-nav-btn.wid50{
    width: 50%;
}

.news-nav-btn-logo{
    padding: .3rem .15rem 0 1.38rem;
    width: .32rem;
    height: .4rem;
    display: inline-block;
}
.news-nav-btn-logo2{
    padding: .3rem .15rem 0 1.38rem;
    width: .4rem;
    height: .4rem;
    display: inline-block;
}
.bottom-nav-title{  
    font-size: .3rem;
    color: #879399;
}
.newsbtn::before{
    content: "";
    display: inline-block;
    background: url(~@/assets/m/images/19.jpg) left center no-repeat;
    background-size: contain;
    width: .32rem;
    height: .4rem;
    vertical-align: sub;
    margin-right: .16rem;
}
.news-nav-btn.on .newsbtn::before{
    content: "";
    display: inline-block;
    background: url(~@/assets/m/images/17.jpg) left center no-repeat;
    background-size: contain;
    width: .32rem;
    height: .4rem;
    vertical-align: sub;
    margin-right: .16rem;
}
.lifebtn::before{
    content: "";
    display: inline-block;
    background: url(~@/assets/m/images/18.jpg) left center no-repeat;
    background-size: contain;
    width: .4rem;
    height: .4rem;
    vertical-align: sub;
    margin-right: .16rem;
}
.news-nav-btn.on .lifebtn::before{
    content: "";
    display: inline-block;
    background: url(~@/assets/m/images/20.jpg) left center no-repeat;
    background-size: contain;
    width: .4rem;
    height: .4rem;
    vertical-align: sub;
    margin-right: .16rem;
}
.mine-btn::before{
    content: "";
    display: inline-block;
    background: url(~@/assets/m/images/mine.png) left center no-repeat;
    background-size: contain;
    width: .4rem;
    height: .4rem;
    vertical-align: sub;
    margin-right: .16rem;
}
.news-nav-btn.on .mine-btn::before{
    content: "";
    display: inline-block;
    background: url(~@/assets/m/images/mine-on.png) left center no-repeat;
    background-size: contain;
    width: .4rem;
    height: .4rem;
    vertical-align: sub;
    margin-right: .16rem;
}
.news-nav-btn.on .bottom-nav-title{
    color: #149ea4;
}
.news-nav-btn .off-img,.news-nav-btn.on .on-img{
    display: none;
}
.news-nav-btn.on .off-img{
    display: block;
} 
</style>