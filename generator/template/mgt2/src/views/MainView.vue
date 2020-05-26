<template>
  <el-container id="app">
    <custom-header v-if="!isInQiankun" />
    <el-container>
      <el-aside v-if="!isInQiankun" width="240px">
        <side-menu/>
      </el-aside>
      <el-main :key="key">
        <router-view />
      </el-main>
    </el-container>
    <el-backtop v-if="!isInQiankun" target=".el-main" />
  </el-container>
</template>

<script>
import SideMenu from '../components/SideMenu/Index'
import CustomHeader from '../components/Header'
const isInQiankun = window.__POWERED_BY_QIANKUN__

export default {
  name: 'MainView',
  components: { SideMenu, CustomHeader },
  data () {
    return {
      isInQiankun
    }
  },
  computed: {
    key () {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="less">
  @import '../assets/less/common.less';
  /* slide-fade效果 */
  .slide-fade-enter-active {
    transition: all .5s ease;
  }
  .slide-fade-leave-active {
    transition: all 0s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
  /* fade-transform效果 */
  .fade-transform-leave-active, .fade-transform-enter-active {
    transition: all .5s;
  }
  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
  }
  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    flex-direction: column;
  }
  .el-header, .el-footer {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #3e3e3e;
    color: #333;
    width: 240px;
    text-align: left;
  }

  .el-container {
    height: 100%;
  }

  .el-container {
    .el-container {
      box-sizing: border-box;
    }
    .el-main {
      height: 100%;
      background-color: #f8f8f8;
      box-sizing: border-box;
      > div {
        padding: 20px;
      }
    }
  }
</style>
