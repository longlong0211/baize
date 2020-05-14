<template>
  <div class="header">
    <div class="logo">
      <router-link to="/"><img src="@/assets/logo.png" /></router-link>
      <!-- {siderFold ? '' : <p style={{
        wordBreak: 'break-all',
        fontSize: '16px',
        margin: '0 10px'
      }}>{/* config.logoText + getSuffix() */}</p>} -->

      <div class="changeBar">
        <!-- {isNavbar
          ? <Popover placement='bottomLeft' onVisibleChange={switchMenuPopover} visible={menuPopoverVisible}
            overlayClassName={styles.popovermenu} trigger='click' content={<Menus {...menusProps} />}>
            <div class="siderbutton">
              <Icon type='bars' />
            </div>
          </Popover>
          : null} -->
      </div>
    </div>
    <div class="admin">
      <el-dropdown @command="handleCommand" v-if="userInfo.name">
        <span class="el-dropdown-link"><i class="el-icon-user-solid"></i>{{userInfo.name}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">注销</el-dropdown-item>
          <el-dropdown-item command="reset">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span v-else class="el-dropdown" @click="$router.push('/login')">未登录</span>
    </div>
  </div>
</template>

<script>
import { mapState, createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('app')

export default {
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapActions(['logout']),
    handleCommand (command) {
      switch (command) {
        case 'logout':
          this.logout().then(() => this.$router.push({
            path: '/login',
            query: {
              redirect: this.$route.fullPath
            }
          }))
          break
        case 'reset':
          this.$router.push({ path: '/resetpassword' })
          break

        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #fff;
  // box-shadow: @shadow-2;
  position: relative;

  .logo {
    width: 224px;
    padding: 10px 0 5px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    cursor: pointer;
    // transition: @transition-ease-out;
    img {
      width: 100px;
      height: 63px;
      // transition: @transition-ease-out;
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

    // .anticon {
      // transition: @transition-ease-out;
    // }
  }

  .admin {
    padding-right: 6px;
    align-self: center;
    position: relative;
  }

  .siderbutton {
    height: 47px;
    width: 47px;
    line-height: 47px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    position: absolute;
    // transition: @transition-ease-in;

    // &:hover {
      // color: @primary-color;
      // background-color: fade(@primary-color, 15%);
    // }
  }
}

.el-dropdown-link {
  cursor: pointer;
}
</style>
