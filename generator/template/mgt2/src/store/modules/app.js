import appApi from '../../api/app'
import { COOKIE_KEY, RESOURCE_TYPE, LOCAL_KEY } from '../../helpers/constant'
import { isRequestSuccess, removeAllCookie } from '../../helpers'
import jsCookie from 'js-cookie'
import Storage from '../../helpers/Storage'
import { fetchUserResourcesFromRawData } from '../../helpers/authority'

const { DATA_DICT, PERMISSIONS, TAG_VIEWS, USER_MENUS, USER_OPERATIONS } = LOCAL_KEY

// import moment from 'moment'
// moment()
const state = {
  loading: {}, // 所有请求的loading状态
  [COOKIE_KEY.USER_NAME]: jsCookie.get(COOKIE_KEY.USER_NAME), // 昵称
  oss: { // OSS存储相关信息，上传控件可以从这里获取数据，参数过期前均可使用，避免每次请求oss参数，造成资源浪费
    host: '', // 上传地址
    expire: null, // 参数过期时间
    directory: '', // 上传的目录
    postParams: { // oss上传时参数，如果过期需重新请求
      'policy': '',
      'OSSAccessKeyId': '',
      'success_action_status': '200', // 如果不设置success_action_status为200，文件上传成功后则返回204状态码。
      'signature': ''
    }
  },
  tagViews: Storage.local[TAG_VIEWS] || [] // 记录的访问记录{ fullPath: '', checked: false }
}

// actions
const actions = {
  async login ({ commit, state, dispatch }, params) {
    try {
      const { code, data } = await appApi.login(params)
      if (isRequestSuccess(code)) {
        const { _token, staff } = data
        jsCookie.set(COOKIE_KEY.JIAHUI_WEB_TOKEN, _token) // 设置token
        jsCookie.set(COOKIE_KEY.USER_NAME, staff.name) // 设置token
        await dispatch('getDataDict') // 获取数据字典
        await dispatch('getOperationResource') // 获取权限信息
        location.replace('/') // 不要使用vue-router，这里销毁页面
      } else {
        removeAllCookie()
      }
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
        location.replace('/')
      }
    } catch (e) {}
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
  async getOssFileUrl ({ commit }, params) {
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
    try {
      const { code, data } = await appApi.requestDataDict()
      if (isRequestSuccess(code)) {
        Storage.local[DATA_DICT] = data
      }
    } catch (e) {}
  },
  async getOperationResource () {
    try {
      const { code, data: { menu = [], resourceIdentity = [] } } = await appApi.requestAuthorityMenu()
      if (isRequestSuccess(code)) {
        // console.log(102, fetchUserMenusFromRawMenus(menu))
        Storage.local[USER_MENUS] = fetchUserResourcesFromRawData(menu, RESOURCE_TYPE.MENU)
        Storage.local[USER_OPERATIONS] = fetchUserResourcesFromRawData(menu, RESOURCE_TYPE.OPERATION)
        Storage.local[PERMISSIONS] = resourceIdentity
      }
    } catch (e) {}
  }
}

// getters
const getters = {
  tagViews (state) {
    return state.tagViews
  },
  userName (state) {
    return state[COOKIE_KEY.USER_NAME]
  },
  oss (state) {
    return state.oss
  },
  getRequestLoading (state) {
    return (requestPath) => {
      return state.loading[requestPath] || false
    }
  }
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
    let { tagViews } = state
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
    const clonedLoading = JSON.parse(JSON.stringify(state.loading))
    clonedLoading[requestPath] = loadingStatus
    state.loading = clonedLoading
  },
  setOss (state, { oss }) {
    state.oss = oss
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
