import Vue from 'vue'
import Vuex from 'vuex'
import Storage from '../helpers/Storage'
import setting from '../setting'

const req = context => context.keys().map(key => ({ moduleName: key, ...context(key) }))
const modules = req(require.context('./modules/', true, /\.js$/))
  .filter(e => e.default)
  .reduce((obj, item) => {
    obj[item.moduleName.slice(2, -3)] = item.default
    return obj
  }, {})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: Storage.local.userInfo || {},
    setting
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      Storage.local.userInfo = userInfo
    }
  },
  actions: {
  },
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
