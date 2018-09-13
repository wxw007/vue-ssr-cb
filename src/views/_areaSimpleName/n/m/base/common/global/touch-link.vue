<template>
    <v-touch @tap="toUrl()" :tag="tag">
        <slot></slot>
    </v-touch>
</template>
<script>
    import '@/util/plugins/touch.js'
    /** 
     * 
     * @author wzw
     * @since 2018-02-07 14:55
     */
    export default {
        props: {
            tag: {
                default: "a"
            },
            href: {
                default: ""
            },
            to: {
                default: ""
            },
            replace: {
                default: ""
            }
        },
        methods: {
            toUrl() {
                if (this.to != null && this.to.length > 0) {
                    this.$router.push(this.to);
                } else if (this.replace != null && this.replace.length > 0) {
                    this.$router.replace(this.replace);
                } else if (this.href != null && this.href.length > 0) {
                    window.location = this.href;
                } 
            }
        }
    }
</script>