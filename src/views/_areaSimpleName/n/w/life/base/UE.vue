<template>
    <div class="editor-wrap">
        <div id="editor" type="text/plain" class="editor"></div>
    </div>
</template>
<script>
if (process.browser) {
    require('../../../../../../../../static/UE/ueditor.config.js')
    require('../../../../../../../../static/UE/ueditor.all.min.js')
    require('../../../../../../../../static/UE/lang/zh-cn/zh-cn.js')
    require('../../../../../../../../static/UE/ueditor.parse.min.js')
}
export default {
    name: 'UE',
    data() {
        return {
            ue: '',
            uedata: [],
            xierudata: []
        }
    },
    mounted() {
        this.UEInit();
       
       
    },
    methods: {
        getContent() {
            var HTML = this.ue.getContent();
            return HTML
        },
        setContent() {
            if(this.$route.query.fill){
                var formData = JSON.parse(localStorage.formData)
                var html = formData.UEHTML ? formData.UEHTML : ""
                this.ue.setContent(html)
            }
        },
        UEInit() {
            var _this = this;
            UE.delEditor('editor');//解决重复跳转editor不会显示的bug
            this.ue = window.UE.getEditor('editor', {
                toolbars:[
                    [
                      'fontsize', 'forecolor', 'backcolor', '|','bold', 'underline', 'undo', 'redo', '|','justifyleft', 'justifycenter','justifyright', 'justifyjustify'
                    ]
                ] 
            })
            this.ue.addListener( 'ready', function( editor ) {

                _this.setContent()
            });
           
        }
    }
}
</script>

<style scoped>
    .editor-wrap{
        display: inline-block;
        width:530px;height:180px;
    }
    .editor{
        width:100%;height:100%;
        display: inline-block;
    }
</style>