<template>
  <el-container class="app-container">
    <el-header v-if="!isInQiankun"><Header/></el-header>
    <el-container class="app-content">
      <el-aside width="240px" v-if="!isInQiankun"><SideMenu/></el-aside>
      <el-main>
        <Tabs/>
        <router-view/>
      </el-main>
    </el-container>
    <el-backtop v-if="!isInQiankun" target=".el-main" />
    <!-- <el-footer v-if="!isInQiankun">Footer</el-footer> -->
  </el-container>
</template>

<script>
import Header from './parts/header'
import SideMenu from './parts/SideMenu'
import Tabs from './parts/tabs'
const isInQiankun = window.__POWERED_BY_QIANKUN__

export default {
  components: {
    Header,
    SideMenu,
    Tabs
  },
  data () {
    return {
      isInQiankun
    }
  },
  mounted () {
    // 获取字典表
    this.$store.dispatch('app/getDataDict')
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    height: 100%;
  }
  .app-content {
    overflow: auto;
    height: 100%;
  }

  .el-header {
    height: 83px!important;
  }

  .el-main {
    min-width: 500px;
    padding: 20px;
    background-color: #f8f8f8;
  }
</style>
