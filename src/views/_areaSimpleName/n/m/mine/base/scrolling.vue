<template>
    <div>
        <!-- 列表 -->
        <div class="scroll-wrapper" ref="wrapper">
            <div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
/** 
 * 
 * @author wxw
 * @since 2018-07-19 13:44
 */
import BScroll from 'better-scroll'
 const DIRECTION_H = 'horizontal'
  const DIRECTION_V = 'vertical'
export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: false
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      direction: {
        type: String,
        default: DIRECTION_V
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V
        })

        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }

        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>
<style scoped lang="less">
.bottom-tip,
.top-tip {
    width: 100%;
    font-size: .32rem;
    text-align: center;
    color: #aaa;
    height: .75rem;
    line-height: .75rem;
}

.top-tip {
    position: absolute;
    top: -.75rem;
}

.scroll-wrapper {
    overflow: auto;
    height: calc(100vh - 1.71rem)
}
</style>