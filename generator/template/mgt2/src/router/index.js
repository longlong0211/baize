/* eslint-disable no-unused-vars */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MainView from '../views/MainView.vue'
import Login from '../views/Login.vue'
import Error403 from '../views/403.vue'
import Error404 from '../views/404.vue'
import jsCookie from 'js-cookie'
import { verifyRoutePermission, getResourceTitleByRoute } from '../helpers/authority'
import Storage from '../helpers/Storage'
import { COOKIE_KEY } from '../helpers/constant'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: MainView,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/403',
    name: '403',
    component: Error403
  },
  {
    path: '/404',
    name: '404',
    component: Error404
  },
  {
    path: '/demo',
    name: 'demo',
    component: MainView, // 主视图
    children: [
      {
        path: 'demoList',
        name: 'demoList',
        component: () => import('../views/demo/list.vue')
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default function createRouter () {
  const router = new VueRouter({
    mode: 'history',
    base: window.__POWERED_BY_QIANKUN__ ? `/portal${process.env.VUE_APP_PUBLIC_PATH}` : process.env.VUE_APP_PUBLIC_PATH,
    routes
  })

  createRouter.$router = router

  router.beforeEach((to, from, next) => { // 全局钩子函数
    // console.log(53, to)
    if (to.name === 'login' || to.name === '403' || to.name === '404') {
      next()
    } else {
      const token = jsCookie.get(COOKIE_KEY.JIAHUI_WEB_TOKEN)
      if (token) { // 已登录过
        // verifyRoutePermission(to) ? next() : next({ name: '403' }) // 验证路由权限
        next()
      } else {
        next({ name: 'login' })
      }
    }
    // console.log(to)
  })

  router.afterEach((to) => {
    if (to.name === 'login' || to.name === '403' || to.name === '404') {
      return
    }
    try {
      !window.__POWERED_BY_QIANKUN__ && store.commit('app/pushTagView', { fullPath: to.fullPath, title: getResourceTitleByRoute(to) })
    } catch (e) {}
  })

  return router
}
