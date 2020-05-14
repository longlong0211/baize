<template>
  <el-tabs
    class="tabs"
    :value="current"
    type="card"
    closable
    v-if="tagViews.length && current !== '/index'"
    @tab-click="handleClick"
    @tab-remove="handleRemove"
  >
    <el-tab-pane
      v-for="tag in tagViews"
      :key="tag.fullPath"
      :label="tag.title"
      :name="tag.fullPath"
    ></el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('app', ['tagViews']),
    current () {
      return this.$route.fullPath
    }
  },
  methods: {
    ...mapMutations('app', ['deleteTagView']),
    handleClick (tab) {
      const page = this.tagViews.find(page => page.fullPath === tab.name)
      if (page && this.current !== page.fullPath) {
        this.$router.push(page.fullPath)
      }
    },
    handleRemove (name) {
      if (this.tagViews.length <= 1) return
      const index = this.tagViews.findIndex(page => page.fullPath === name)
      this.deleteTagView(index)
      const newTab = this.tagViews[index] || this.tagViews.slice(-1)[0]
      if (name === this.current && newTab) {
        this.$router.push(newTab.fullPath)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs ::v-deep {
  .el-tabs__header {
    border-bottom: none;
  }
  .el-tabs__item {
    margin-right: 5px;
    border: 1px solid #E4E7ED!important;
    border-radius: 2px;
    background: #fafafa;
  }
  .el-tabs__nav {
    border: none!important;
  }
  .is-active {
    background: #fff;
  }
}
</style>
