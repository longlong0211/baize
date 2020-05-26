<template>
  <el-menu
    :default-active="currentRoute"
    class="el-menu-vertical"
    background-color="#3e3e3e"
    text-color="#fff"
    router
    unique-opened
  >
    <custom-menu
      v-for="menu in menus"
      :key="menu.id"
      :menu="menu"
      :parent-path="`/${menu.resourceIdentity}`"
    />
  </el-menu>
</template>

<script>
import CustomMenu from './CustomMenu'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('app')

export default {
  name: 'SideMenu',
  components: { CustomMenu },
  computed: {
    ...mapState(['menus']),
    currentRoute () {
      const activeMenu = this.$route.query.activeMenu
      return activeMenu || this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical {
  height: 100%;
}
::v-deep .el-menu-item.is-active {
  color: #fff;
  background: #1890ff!important;
}
</style>
