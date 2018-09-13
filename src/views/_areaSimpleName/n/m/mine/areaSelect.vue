<template>
    <div>
        <mine-top :topTitle="mineTop.topTitle" :back="mineTop.back" :shadow="mineTop.shadow"></mine-top>
        <div class="search-bar">
            <input type="text" @input='input' v-model="searchData">
        </div>
        <scrolling @scroll="scroll" ref="listview" :data="areaList" class="scroll">
            <div class="list">
                <div class="unit-wrap" v-for="group in areaList" v-show="!group.hide" ref="listGroup">
                    <div class="title">{{group.cFistLetter}}</div>
                    <ul class="unit-box">
                        <li v-for="areaItem,index in group.areaCodeList" :key='index' @click="areaSelect(areaItem)" v-show="!areaItem.hide"><span class="name">{{areaItem.name}}</span><span class="num">+{{areaItem.zone}}</span></li>
                    </ul>
                </div>
            </div>
        </scrolling>
        <div class="shortcut">
            <ul>
                <li v-for="item,index in areaList" @click="moveTo(index)">{{item.cFistLetter}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
/** 
 * 
 * @author wxw
 * @since 2018-07-20 09:28
 */
import mineTop from "./base/mine-top.vue"
import scrolling from './base/scrolling.vue'
import { resolveUrl } from '@/util/common/url.js'
import login from '@/store/modules/m/mine/login.js'
import { queryPhoneAreaCodeList } from '@/api/wei'
export default {
    components: {
        scrolling,
        mineTop

    },
    data() {
        return {
            scrollY: 0,
            probeType: 3,
            listenScroll: true,
            touch: {},
            areaList: [],
            listHeight: [],
            searchData: '',
            selectList: [],
            loginUrl: resolveUrl(this.$store, '/n/m/mine/login'),
            mineTop: {
                topTitle: '选择国家或地区',
                back: true,
                shadow: true
            }
        }
    },

    mounted() {
        this.getAreaList()
    },
    watch: {
        areaList() {
            setTimeout(() => {
                this._calculateHeight()
            }, 20)
        }
    },
    methods: {
        getAreaList() {
            queryPhoneAreaCodeList().then(response => {
                let result = response.data;
                if (result.success) {
                    this.areaList = result.data
                }
            })
        },
        areaSelect(areaItem) {
            localStorage.setItem('curAreaNum', areaItem.zone)
            localStorage.setItem('curAreaName', areaItem.name)
            window.location.href = this.loginUrl
        },
        input(e) {
            this.selectList = [];
            var that = this;
            this.areaList.forEach(listItem => {
                listItem.hide = true;
                listItem.areaCodeList.forEach(item => {
                    item.hide = true;
                    if (item.name.indexOf(that.searchData) > -1 || item.zone.toString().indexOf(that.searchData) > -1) {
                        listItem.hide = false;
                        item.hide = false
                    }
                })
            })
        },
        _calculateHeight() {
            this.listHeight = []
            const list = this.$refs.listGroup
            let height = 0
            this.listHeight.push(height)
            for (let i = 0; i < list.length; i++) {
                let item = list[i]
                height += item.clientHeight
                this.listHeight.push(height)
            }
        },
        _scrollTo(index) {
            if (!index && index !== 0) {
                return
            }
            if (index < 0) {
                index = 0
            } else if (index > this.listHeight.length - 2) {
                index = this.listHeight.length - 2
            }
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
            this.scrollY = this.$refs.listview.scroll.y
        },
        scroll(pos) {
            this.scrollY = pos.y
        },
        getData(el, name, val) {
            const prefix = 'data-'
            if (val) {
                return el.setAttribute(prefix + name, val)
            }
            return el.getAttribute(prefix + name)
        },
        onShortcutTouchStart(e) {
            let firstTouch = e.touches[0]
            this.touch.y1 = firstTouch.pageY

            this._scrollTo(anchorIndex)
        },
        // onShortcutTouchMove(e) {
        //     let firstTouch = e.touches[0]
        //     this.touch.y2 = firstTouch.pageY
        //     let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        //     let anchorIndex = parseInt(this.touch.anchorIndex) + delta

        //     this._scrollTo(anchorIndex)
        // },
        moveTo(index) {
            this._scrollTo(index)
        }
    }
}
</script>
<style src="../base/static/css/base.css"></style>
<style src="../base/static/css/themes.css"></style>
<style scoped lang="less">
.search-bar {
    z-index: 999;
    height: .82rem;
    width: 100%;
    background: #c9c9ce;
    padding: .09rem .12rem;
    font-size: 0;
    position: fixed;
    top: .89rem;
    left: 0;
    input {
        height: .63rem;
        padding: 0 .8rem;
        background: url('~@/assets/m/images/search.png') .15rem center no-repeat #fff;
        background-size: .42rem .38rem;
        outline: none;
        border: none;
        border-radius: .15rem;
        font-size: .32rem;
        width: 7.2rem;
        display: block;
        margin: 0 auto;
    }
}

.list {
    .title {
        height: .5rem;
        background: #f8f8f8;
        font-weight: bold;
        color: #000;
        font-size: .3rem;
        text-indent: .45rem;
    }
    .unit-box {
        padding: 0 .65rem 0 .45rem;
        li {
            overflow: hidden;
            height: .8rem;
            border-bottom: 1px solid #f8f8f8;
            padding-top: .2rem;
            .name {
                color: #000;
                font-size: .3rem;
                float: left;
            }
            .num {
                color: #a9a9ad;
                font-size: .3rem;
                float: right
            }
        }
    }
}

.shortcut {
    position: fixed;
    right: .1rem;
    top: 3.26rem;
    width: .25rem;
    li {
        text-align: center;
        width: .25rem;
        height: .35rem;
        font-size: .2rem;
        line-height: .35rem;
        font-weight: 500;
    }
}
.scroll{
	position: fixed;
	top: 1.71rem;
	left: 0;
	width: 100%;
}
</style>