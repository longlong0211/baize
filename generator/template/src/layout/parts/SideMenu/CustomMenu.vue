<template>
  <!-- 如果有子菜单（有children属性），使用sub-menu -->
  <el-submenu v-if="menu.children && menu.children.length" :index="parentPath" >
    <span slot="title" v-text="menu.displayName" />
    <!-- 递归此组件 -->
    <custom-menu
      v-for="sMenu in menu.children"
      :key="sMenu.id"
      :menu="sMenu"
      :parent-path="`${parentPath}/${sMenu.resourceIdentity}`"
    />
  </el-submenu>
  <!-- 否则为单菜单 -->
  <el-menu-item v-else :index="parentPath">
    <span>{{ menu.displayName }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'CustomMenu',
  props: {
    menu: { // 菜单对象
      type: Object,
      required: true
    },
    parentPath: { // 父路径
      type: String,
      required: true
    }
  }
}
</script>
