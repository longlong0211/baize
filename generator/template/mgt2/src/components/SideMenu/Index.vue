/* eslint-disable vue/no-use-v-if-with-v-for */
<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#3e3e3e"
    text-color="#fff"
    router
  >
    <custom-menu
      v-for="(menu, index) in menus"
      :key="index"
      :menu="menu"
      :index="String(index)"
      :parent-path="'/' + menu.resourceIdentity"
    />
  </el-menu>
</template>

<script>
import Storage from '../../helpers/Storage/index'
import { LOCAL_KEY } from '../../helpers/constant'
import CustomMenu from './CustomMenu'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('app')
const { DATA_DICT, USER_MENUS, USER_OPERATIONS, PERMISSIONS } = LOCAL_KEY
export default {
  name: 'SideMenu',
  components: { CustomMenu },
  data () {
    return {
      menus: []
    }
  },
  methods: {
    ...mapActions(['getDataDict', 'getOperationResource']),
    async init () { // 初始化，如果Storage里的数据不完整，重新请求
      const currentRouteName = this.$router.currentRoute.name
      if (currentRouteName === 'login' || currentRouteName === '403' || currentRouteName === '404') {
        return
      }
      if (!(Storage.local[USER_MENUS] && Storage.local[USER_OPERATIONS] && Storage.local[PERMISSIONS])) {
        await this.getOperationResource()
      }
      this.menus = Storage.local[USER_MENUS] || []
      if (!Storage.local[DATA_DICT]) {
        this.getDataDict()
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>

</style>
