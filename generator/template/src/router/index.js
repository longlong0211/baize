import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/layout.vue'
import Home from '../views/Home.vue'
import Login from '../views/system/Login.vue'
import ResetPassword from '../views/system/ResetPassword.vue'

import store from '../store'
import Storage from '../helpers/Storage'
import { getResourceTitleByRoute } from '../helpers/authority'
const { LOCAL_KEY: { PERMISSIONS } } = require('../const')

Vue.use(VueRouter)

const systemRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/resetpassword',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/403',
    name: '403',
    component: () => import('../views/system/40x.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/system/40x.vue')
  }
]

const appointmentRoutes = [
  {
    path: '/appointment',
    name: 'appointment',
    component: Layout,
    children: [
      {
        path: 'appt_notice',
        name: 'notice',
        component: () => import('../views/appointment/notice')
      },
      {
        path: 'appt_user',
        name: 'userManage',
        component: () => import('../views/appointment/userManage')
      },
      {
        path: 'appt_manage',
        name: 'apptManage',
        component: () => import('../views/appointment/apptManage')
      },
      { path: '*', component: () => import('../views/system/40x.vue') }
    ]
  }
]

const routes = [
  {
    path: '/',
    name: 'main',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'Index',
      component: Home
    }]
  },
  ...appointmentRoutes,
  ...systemRoutes,
  { path: '*', redirect: '/404', hidden: true }
]

export default function createRouter () {
  const router = new VueRouter({
    mode: 'history',
    base: window.__POWERED_BY_QIANKUN__ ? '/portal/jiahuiMgt' : process.env.BASE_URL,
    routes
  })

  createRouter.$router = router

  // 获取权限
  const isNotHasMenu = systemRoutes.map(item => item.name)
  router.beforeEach(async (to, from, next) => {
    const menus = store.state.app.menus
    if (!menus && !isNotHasMenu.includes(to.name)) {
      await store.dispatch('app/getOperationResource')
    }
    next()
  })

  // 验证权限
  const isIgnoreValidate = [...isNotHasMenu, 'Index']
  router.beforeEach((to, from, next) => {
    if (isIgnoreValidate.includes(to.name)) return next()
    const permissions = Storage.local[PERMISSIONS]
    if (!permissions.includes(to.path)) return next({ name: '403' })
    next()
  })

  // 存储tag
  router.afterEach(to => {
    if (isNotHasMenu.includes(to.name)) return
    store.commit('app/pushTagView', { fullPath: to.fullPath, title: getResourceTitleByRoute(to) })
  })

  return router
}
