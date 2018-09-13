<template>
    <!-- 提示弹窗 -->
    <div class="message-tips " ref="alertTips" :class="{'hide':!show}">
        <div class="tips">{{message}}</div>
    </div>
</template>
<script>
    import browser from '@/util/browser'
    export default {
        props: {
            tips: {
                default() {
                    return '提示消息'
                }
            },
            time: {
                default() {
                    return 2000
                }
            },
            color: {
                default() {
                    return '#000'
                }
            }
        },
        data() {
            return {
                message: "",
                duration: 3000,
                show: false
            };
        },
        mounted() {
            this.show = true;
            // this.$refs.alertTips.style.display = "block";
            setTimeout(() => {
                this.close();
            }, this.duration)
        },
        methods: {
            close() {
                this.show = false;
                if (browser.isIE()) {
                    this.destroyElement();
                } else {
                    this.$el.addEventListener('transitionend', this.destroyElement);
                }
            },
            destroyElement() {
                this.$el.removeEventListener("transitionend", this.destroyElement);
                this.$destroy(true);
                this.$el.parentNode.removeChild(this.$el);
            }
        }

    }
</script>
<style scoped>
    /* 
        *弹窗提示的样式
        *使用方法：
            *1，第一步在需要的地方引入该组件
            *2，引入的组件中，在data里面设置一个值，用来传递弹窗信息给弹窗组件，
            *3，每次需要使用弹窗组件的时候，需要该改变这个这个值，弹窗就会自动出现和消失
            *4，有个待处理的bug，每次传入的弹窗信息不能跟上一次的一样，否则会被认为没有传入
     */

    .message-tips {
        /* 直接复用登陆框的背景样式 */
        /* display: none; */
        position: fixed;
        z-index: 20;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background: rgba(0, 0, 0, .3);
    }

    .message-tips .tips {
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
        transition: all .2s linear;
    }

    .message-tips.hide {
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


    .message-tips.hide .tips {
        opacity: 0;
        transform: translate3d(-50%, -250%, 0);
    }

    .message-tips.show .tips {
        opacity: 0;
        transform: translate3d(-50%, -50%, 0);
    }
</style>