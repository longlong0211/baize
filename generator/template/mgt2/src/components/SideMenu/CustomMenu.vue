<template>
  <!-- 如果有子菜单（有children属性），使用sub-menu -->
  <el-submenu
    v-if="menu.children"
    :index="index"
  >
    <span slot="title" v-text="menu.displayName" />
    <!-- 递归此组件 -->
    <custom-menu
      v-for="(sMenu, sIndex) in menu.children"
      :key="sIndex"
      :index="index+String(sIndex)"
      :menu="sMenu"
      :parent-path="`${parentPath}/${sMenu.resourceIdentity}`"
    />
  </el-submenu>
  <!-- 否则为单菜单 -->
  <el-menu-item v-else :index="index">
    <a v-if="includesPathConfigWebsites(menu)" :href="parentPath">{{ menu.displayName }}</a><!-- 根据nginx配置的path访问，不走前端路由 -->
    <a v-else-if="!includesInCurrentHost(menu)" :href="`https://${menu.prefixUrl}${parentPath}`">{{ menu.displayName }}</a><!-- 根据不同域名访问，不走前端路由 -->
    <router-link v-else :to="parentPath">{{ menu.displayName }}</router-link> <!-- 站内路由 -->
  </el-menu-item>
</template>

<script>
import { PATH_CONFIG_WEBSITES } from '../../helpers/constant'
export default {
  name: 'CustomMenu',
  props: {
    menu: { // 菜单对象
      type: Object,
      required: true
    },
    index: { // element需要的索引
      type: String,
      required: true
    },
    parentPath: { // 父路径
      type: String,
      required: true
    }
  },
  methods: {
    /*
    * 是否是通过路径区分指向其它站定目录，
    * prefixUrl的值为nginx配置的path，参考肿瘤子网站菜单
    * */
    includesPathConfigWebsites (menu) {
      return PATH_CONFIG_WEBSITES.some(item => item === menu.prefixUrl)
    },
    /*
    * 是否是通过域名区分指向其它站点目录，
    * prefixUrl的值为一个嘉会子域名，参考HCRM菜单
    * */
    includesInCurrentHost (menu) {
      return location.host.includes(menu.prefixUrl)
    }
  }
}
</script>

<style scoped lang="less">
  .el-menu-item a {
    color: #fff;
    text-decoration: none;
    &:visited {
      color: #fff;
    }
  }
</style>
