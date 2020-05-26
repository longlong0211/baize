import Axios from 'axios'
import Qs from 'qs'
import Router from '../router'
import { showError, resolveData, getCommonParams } from '../helpers'
import { REQUEST_TIME_OUT } from './constant'
import store from '../store'

// 环境切换
const baseURL = process.env.VUE_APP_BASE_URL
const $router = () => Router.$router

Axios.defaults.baseURL = baseURL

// 请求超时时间
Axios.defaults.timeout = REQUEST_TIME_OUT

// post请求头默认为formData（具体以后端接收）
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
Axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.error(error)
  }
)

// 响应拦截器
Axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      const data = resolveData(response)
      return Promise.resolve(data)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          showError({
            title: '错误',
            message: '请登录'
          })
          setTimeout(() => {
            $router().replace({
              path: '/login',
              query: { redirect: $router().currentRoute.fullPath }
            })
          }, 1000)
          break
        // 403 无权限、或者token过期 TODO 与后端沟通什么时候会返回403
        case 403:
          showError({
            title: '请求错误',
            message: '暂无权限'
          })
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            $router().replace({
              path: '/login',
              query: {
                redirect: $router().currentRoute.fullPath
              }
            })
          }, 1000)
          break
        // 404请求不存在
        case 404:
          showError({
            title: '请求错误',
            message: '网络请求不存在'
          })
          break
        // 其他错误，直接抛出错误提示
        default:
          showError({
            title: '请求错误',
            message: error.response.data.message
          })
      }
      return Promise.reject(error.response)
    }
    // 判断请求异常信息中是否含有超时timeout字符串
    if (error.message.includes('timeout')) {
      showError({
        title: '错误',
        message: '请求超时'
      })
      return Promise.reject(error)
    }
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
const get = (url, params = {}, config = {}) => {
  store.commit('app/setRequestLoading', { requestPath: url, loadingStatus: true })
  return new Promise((resolve, reject) => {
    Axios.get(url, {
      ...config,
      params: {
        ...getCommonParams(),
        ...params
      }
    })
      .then(res => {
        store.commit('app/setRequestLoading', { requestPath: url, loadingStatus: false })
        resolve(res)
      })
      .catch(err => {
        store.commit('app/setRequestLoading', { requestPath: url, loadingStatus: false })
        reject(err)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
const post = (url, params = {}, config = {}) => {
  store.commit('app/setRequestLoading', { requestPath: url, loadingStatus: true })
  return new Promise((resolve, reject) => {
    Axios.post(url, Qs.stringify({ ...getCommonParams(), ...params }), { ...config })
      .then(res => {
        store.commit('app/setRequestLoading', { requestPath: url, loadingStatus: false })
        resolve(res)
      })
      .catch(err => {
        store.commit('app/setRequestLoading', { requestPath: url, loadingStatus: false })
        reject(err)
      })
  })
}

export { get, post }
