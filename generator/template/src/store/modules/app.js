/* eslint-disable no-empty */
import jsCookie from 'js-cookie'
import * as appApi from '../../api/app'
import * as UserHelper from '../../helpers/UserHelper'
import { StorageHelper } from '../../helpers/StorageHelper'
import { COOKIE_KEY, RESOURCE_TYPE, LOCAL_KEY } from '../../const'
import { isRequestSuccess, removeAllCookie } from '../../helpers'
import Storage from '../../helpers/Storage'
import { fetchUserResourcesFromRawData } from '../../helpers/authority'

const { DATA_DICT, PERMISSIONS, TAG_VIEWS, USER_MENUS, USER_OPERATIONS } = LOCAL_KEY

const state = {
  login: UserHelper.getLoginStatus() === 'success' && !!UserHelper.getToken(),
  loading: {},
  userInfo: Storage.local.userInfo || {},
  loginButtonLoading: false,
  menuPopoverVisible: false,
  siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
  darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
  isNavbar: document.body.clientWidth < 769 || window.__POWERED_BY_QIANKUN__,
  navOpenKeys: JSON.parse(StorageHelper.cookieGet('navOpenKeys') || '[]'), // 侧边栏菜单打开的keys

  forgotVisible: false, // 忘记密码对话框
  isForgot: false, // 忘记密码切换
  resetItem: {}, // 重置密码数据
  isChecked: false, // 是否记住密码
  modifyPwdModallVisible: false, // 修改密码对话框
  loginFlow: false, // 是否完成登录流程

  menus: null,
  tagViews: Storage.local[TAG_VIEWS] || [],
  oss: { // OSS存储相关信息，上传控件可以从这里获取数据，参数过期前均可使用，避免每次请求oss参数，造成资源浪费
    host: '', // 上传地址
    expire: null, // 参数过期时间
    directory: '', // 上传的目录
    postParams: { // oss上传时参数，如果过期需重新请求
      policy: '',
      OSSAccessKeyId: '',
      success_action_status: '200', // 如果不设置success_action_status为200，文件上传成功后则返回204状态码。
      signature: ''
    }
  }
}

// actions
const actions = {
  async login ({ state, commit }, params) {
    const isChecked = state.isChecked
    try {
      const { code, data } = await appApi.login(params)
      if (!isRequestSuccess(code)) throw new Error()

      const { _token, staff } = data
      jsCookie.set(COOKIE_KEY.JIAHUI_WEB_TOKEN, _token) // 设置token
      jsCookie.set(COOKIE_KEY.USER_NAME, staff.name) // 设置name

      if (data.status) {
        UserHelper.setLoginStatus('success')
        UserHelper.setUserName(staff.name)
        UserHelper.setLoginUserName(staff.userName)
        UserHelper.setUserId(staff.id)
        commit('setUserInfo', staff, { root: true })
      }

      // 缓存登录账号和密码
      if (isChecked === true) {
        StorageHelper.cookieSet('username', params.username)
        StorageHelper.cookieSet('password', params.password)
        StorageHelper.cookieSet('isChecked', isChecked)
      } else {
        StorageHelper.cookieRemove('username')
        StorageHelper.cookieSet('password')
        StorageHelper.cookieSet('isChecked')
      }
      return true
    } catch (e) {
      removeAllCookie()
    }
  },
  async logout ({ commit }) {
    try {
      const { code } = await appApi.logout()
      if (isRequestSuccess(code)) {
        removeAllCookie()
        commit('setUserName', { userName: '' })
        commit('setUserInfo', {}, { root: true })
      }
    } catch (e) {}
  },
  async updatePwd (...[, params]) {
    const { code } = await appApi.updatePwd(params)
    return isRequestSuccess(code)
  },
  async getOssParams ({ commit }) {
    try {
      const { code, data: { host, expire, directory, policy, accessKeyId, signature } } = await appApi.requestOssParams()
      if (isRequestSuccess(code)) {
        const oss = {
          host,
          expire,
          directory,
          postParams: {
            app_key: 'airahPeethiGaif8Aizo',
            policy,
            OSSAccessKeyId: accessKeyId,
            success_action_status: '200',
            signature
          }
        }
        commit('setOss', { oss })
        return oss
      }
    } catch (e) {
      return null
    }
  },
  async getOssFileUrl (params) {
    try {
      const { code, data } = await appApi.requestOssFileUrl(params)
      if (isRequestSuccess(code)) {
        return data
      }
    } catch (e) {
      return ''
    }
  },
  async getDataDict () {
    const { data } = await appApi.requestDataDict()
    Storage.local[DATA_DICT] = data
  },
  async getOperationResource ({ commit }) {
    try {
      const { code, data: { menu = [], resourceIdentity = [] } } = await appApi.requestAuthorityMenu()
      if (isRequestSuccess(code)) {
        Storage.local[USER_MENUS] = fetchUserResourcesFromRawData(menu, RESOURCE_TYPE.MENU)
        Storage.local[USER_OPERATIONS] = fetchUserResourcesFromRawData(menu, RESOURCE_TYPE.OPERATION)
        Storage.local[PERMISSIONS] = resourceIdentity

        // 存储menu
        commit('setMenus', Storage.local[USER_MENUS])
      }
    } catch (e) {}
  }
}

// getters
const getters = {

}

// mutations
const mutations = {
  pushTagView (state, { fullPath, title }) {
    const atIndex = state.tagViews.findIndex(item => item.fullPath === fullPath)
    if (atIndex !== -1) {
      state.tagViews.forEach(item => {
        item.checked = false
      })
      state.tagViews[atIndex].checked = true
    } else {
      state.tagViews.forEach(item => {
        item.checked = false
      })
      state.tagViews.push({
        fullPath,
        title,
        checked: true
      })
    }
    Storage.local[TAG_VIEWS] = state.tagViews
  },
  deleteTagView (state, index) {
    const { tagViews } = state
    if (tagViews.length <= 1) { // 最后一个不允许删除
      return
    }
    tagViews.splice(index, 1)
    tagViews[tagViews.length - 1].checked = true
    Storage.local[TAG_VIEWS] = tagViews
  },
  setUserName (state, { userName }) {
    state[COOKIE_KEY.USER_NAME] = userName
  },
  setRequestLoading (state, { requestPath, loadingStatus }) {
    state.loading[requestPath] = loadingStatus
  },
  setOss (state, { oss }) {
    state.oss = oss
  },
  setMenus (state, menuList) {
    state.menus = menuList
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
