<template>
    <!-- 友情链接 -->
    <div class="friendly-link-box">
        <div class="blue_header clearfloat">
            <h3>友情链接</h3>
            <ul class="link-continent">
            <li v-for="link in friendlyLinkMap" :class="{'active':link.friendLinkName == selected.friendLinkName}" :key="link.friendLinkName"
                @click.stop="selectContinent(link)">{{link.friendLinkName}}</li>
        </ul>
        </div>
        
        <div class="link-continent-detail">
            <a v-for="area in selected.friendlyLinkList" :key="area.friendlyLinkId" :href="area.url" target="_blank">
                {{area.friendLinkName}}
            </a>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    friendlyLinkMap: {
      default() {}
    }
  },
  data() {
    return {
      selected: {}
    };
  },
  mounted() {
    this.selected = this.friendlyLinkMap[0];
  },
  methods: {
    selectContinent(continent) {
      this.selected = continent;
    }
  }
};
</script>
<style>
/* 
    *友情链接区域
*/
.friendly-link-box {
  width: 100%;
  margin-top: 17px;
}
/*大洲选择的样式*/

.link-continent {
    float:right;
  display: inline-block;
}

.link-continent li {
  display: inline-block;
  height: 22px;
  line-height: 22px;
  margin-right:8px;
  font-size: 14px;
  color: #666666;
  cursor: pointer;
}

.link-continent .active {
  color: #0082c6;
}

/*具体的国家选择*/
.link-continent-detail{
    padding-top:7px;
}
.link-continent-detail a {
  display: inline-block;
  /* width: 80px; */
  line-height: 1;
  text-align: left;
  font-size: 14px;
  color: #666;
  padding-right:20px;
  margin-top:13px;
  cursor: pointer;
}
</style>