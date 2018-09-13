<template>
    <!-- 提示弹窗 -->
    <div class="alert-tips" ref="alertTips" :class="{'hide':isHide}">
        <div class="tips">{{tips}}</div>
    </div>
</template>
<script>
    export default {
        props: {
            tips: {
                default () {
                    return '提示消息'
                }
            },
            time: {
                default () {
                    return 2000
                }
            },
            color: {
                default () {
                    return '#000'
                }
            }
        },
        data() {
            return {
                isHide: true,
            };
        },
        beforeMount() {},
        mounted() {},
        watch: {
            tips() {
                if (!!this.tips) {
                    this.show();
                } else {}
            }
        },
        methods: {
            hide() {
                setTimeout(() => {
                    this.isHide = true;
                    setTimeout(() => {
                        this.$refs.alertTips.style.display = "none";
                    }, 400);
                }, this.time);
            },
            show() {
                this.$refs.alertTips.style.display = "block";
                setTimeout(() => {
                    this.isHide = false;
                    this.hide();
                });
            }
        }
    }
</script>
<style>
    /* 
        *弹窗提示的样式
        *使用方法：
            *1，第一步在需要的地方引入该组件
            *2，引入的组件中，在data里面设置一个值，用来传递弹窗信息给弹窗组件，
            *3，每次需要使用弹窗组件的时候，需要该改变这个这个值，弹窗就会自动出现和消失
            *4，有个待处理的bug，每次传入的弹窗信息不能跟上一次的一样，否则会被认为没有传入
     */

    .alert-tips {
        /* 直接复用登陆框的背景样式 */
        display: none;
        position: fixed;
        z-index: 20;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background: rgba(0, 0, 0, .3);
    }

    .alert-tips .tips {
        position: absolute;
        padding: 12px 10px;
        min-width: 120px;
        background: rgba(0, 0, 0, .5);
        top: 50%;
        left: 50%;
        font-size: 18px;
        color: #fff;
        border-radius: 4px;
        text-align: center;
        transform: translate3d(-50%, -50%, 0);
        -ms-transform: translateX(-50%) translateY(-50%);
        transition: all .2s linear;
    }

    .alert-tips.hide {
        animation: bghide .2s .2s linear 1 forwards;
        -o-animation: bghide .2s .2s linear 1 forwards;
        -ms-animation: bghide .2s .2s linear 1 forwards;
        -moz-animation: bghide .2s .2s linear 1 forwards;
        -webkit-animation: bghide .2s .2s linear 1 forwards;
    }

    @keyframes bghide {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    .shake {}

    .alert-tips.hide .tips {
        opacity: 0;
        transform: translate3d(-50%, -250%, 0);
    }

    .alert-tips.show .tips {
        opacity: 0;
        transform: translate3d(-50%, -50%, 0);
    }
</style>