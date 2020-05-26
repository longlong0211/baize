<template>
  <el-header height="83px">
    <div class="logo">
      <img src='../assets/images/logo.png'/>
    </div>
    <div class="tag-views">
      <el-tag
        :key="index"
        v-for="(tagView, index) in tagViews"
        closable
        :effect="tagView.checked ? 'dark' : 'plain'"
        :class="{ active: tagView.checked }"
        @close="() => {deleteTagView(index)}"
      >
        <router-link :to="tagView.fullPath">{{ tagView.title }}</router-link>
      </el-tag>
    </div>
    <div class="right">
      <ul class="widgets">
        <li
          class="full-screen"
          :class="{ 'fulled-screen': isFullScreen }"
          v-if="isEnabledFullScreen"
          @click="toggleFullScreen"
          title="全屏"
        />
      </ul>
      <el-dropdown @command="menuClick">
        <span class="el-dropdown-link">
          <i class="el-icon-user" />{{ userName }}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">注销</el-dropdown-item>
          <el-dropdown-item command="reset">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import screenfull from 'screenfull'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('app')
export default {
  name: 'Header',
  data () {
    return {
      isEnabledFullScreen: false, // 是否支持全屏
      isFullScreen: false // 当前全屏状态
    }
  },
  computed: {
    ...mapGetters(['userName', 'tagViews'])
  },
  methods: {
    ...mapActions(['logout']),
    ...mapMutations(['deleteTagView']),
    menuClick (command) {
      command === 'logout' ? this.logout() : this.logout()
    },
    toggleFullScreen () {
      screenfull.toggle()
    },
    changeFullScreen () {
      this.isFullScreen = screenfull.isFullscreen
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.isEnabledFullScreen = screenfull.isEnabled
      if (screenfull.isEnabled) {
        screenfull.on('change', this.changeFullScreen)
      }
    })
  },
  beforeDestroy () {
    screenfull.off('change', this.changeFullScreen)
  }
}
</script>

<style scoped lang="less">
  .el-header {
    line-height: 100%;
    display: flex;
    justify-content: space-between;
    background: #fff;
    box-shadow: 4px 4px 40px 0 rgba(0,0,0,.05);
    position: relative;
    align-items: center;
    .el-icon-user{
      margin-right: 10px;
    }
    .logo {
      width: 224px;
      padding: 10px 0 10px 40px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      text-align: center;
      cursor: pointer;
      img {
        width: 100px;
        height: 63px;
      }

      .changeBar {
        height: 47px;
        align-self: center;
      }

      span {
        vertical-align: text-bottom;
        font-size: 16px;
        text-transform: uppercase;
        display: inline-block;
      }
    }
    .tag-views {
      flex-grow: 1;
      text-align: left;
      > span {
        margin-left: 15px;
        cursor: default;
      }
      a {
        color: #000;
        text-decoration: none;
      }
      .active a {
        color: #fff;
      }
    }
    .right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .widgets {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: 25px;
        li {
          width: 30px;
          height: 30px;
          padding: 5px;
          cursor: pointer;
          &::after {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        li:hover { /* 动画 */
          background-color: rgba(0,0,0,.06);
          &::after {
            animation: bigger .6s linear 0s infinite alternate;
            transform-origin: center;
          }
          @keyframes bigger {
            from {
              transform: scale(1, 1);
            }
            to {
              transform: scale(1.2, 1.2);
            }
          }
        }
        .full-screen {
          &::after {
            background: transparent url("../assets/images/fullscreen-icon.png") no-repeat top left / 200% auto;
          }
          &.fulled-screen::after {
            background-position: top right;
          }
        }
      }
      .el-dropdown-link {
        line-height: 100%;
        i.el-icon-user {
          font-size: 18px;
          font-weight: 600;
          position: relative;
          top: 1px;
        }
        cursor: pointer;
      }
    }
  }
</style>
