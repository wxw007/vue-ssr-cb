<template>
    <div>
        <div ref="point" :style="styles">
            <slot></slot>
        </div>
        <div v-show="slot" :style="slotStyle" ref="slotPoint"></div>
    </div>
</template>
<script>
    function getScrollTop(target) {
        let ret = target.pageYOffset;
        if (typeof ret !== 'number') {
            ret = window.document.documentElement.pageYOffset;
        }
        return ret;
    }
    function getScrollLeft(target) {
        let ret = target.pageXOffset;
        if (typeof ret !== 'number') {
            ret = window.document.documentElement.scrollLeft;
        }
        return ret;
    }
    function getOffset(element, scrollTop, scrollLeft) {
        const rect = element.getBoundingClientRect();
        const docEl = window.document.body;
        const clientTop = docEl.clientTop || 0;
        const clientLeft = docEl.clientLeft || 0;
        return {
            top: rect.top + scrollTop - clientTop,
            left: rect.left + scrollLeft - clientLeft
        };
    }
    export default {
        name: 'Affix',
        props: {
            offsetTop: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                affix: false,
                styles: {},
                slot: false,
                slotStyle: {}
            };
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll, false);
            window.addEventListener('resize', this.handleResize, false);
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.handleScroll, false);
            window.removeEventListener('resize', this.handleResize, false);
        },
        methods: {
            handleScroll() {
                const affix = this.affix;
                const scrollTop = getScrollTop(window);
                const scrollLeft = getScrollLeft(window);
                const elOffset = getOffset(this.$el, scrollTop, scrollLeft);
                const windowHeight = window.innerHeight;
                // Fixed Top
                if ((elOffset.top - this.offsetTop) < scrollTop && !affix) {
                    this.affix = true;
                    this.slotStyle = {
                        width: this.$refs.point.clientWidth + 'px',
                        height: this.$refs.point.clientHeight + 'px'
                    };
                    this.slot = true;
                    this.styles = {
                        top: `${this.offsetTop}px`,
                        left: `${elOffset.left}px`,
                        width: `${this.$el.offsetWidth}px`,
                        position: "fixed",
                        zIndex: 10,
                    };
                    this.$emit('on-change', true);
                } else if ((elOffset.top - this.offsetTop) > scrollTop && affix) {
                    this.slot = false;
                    this.slotStyle = {};
                    this.affix = false;
                    this.styles = null;
                    this.$emit('on-change', false);
                }
            },
            handleResize() {
                if (this.affix) {
                    const scrollTop = getScrollTop(window);
                    const scrollLeft = getScrollLeft(window);
                    const elOffset = getOffset(this.$el, scrollTop, scrollLeft);
                    this.slotStyle = {
                        width: this.$refs.point.clientWidth + 'px',
                        height: this.$refs.point.clientHeight + 'px'
                    };
                    this.styles = {
                        top: `${this.offsetTop}px`,
                        left: `${elOffset.left}px`,
                        width: `${this.$el.offsetWidth}px`,
                        position: "fixed",
                        zIndex: 10,
                    };
                }
            }
        }
    };
</script>