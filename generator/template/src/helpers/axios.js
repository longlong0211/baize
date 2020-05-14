import axios from 'axios'
import Qs from 'qs'
import Router from '../router'
import { showError, resolveData, getCommonParams } from '../helpers'
import { REQUEST_TIME_OUT } from '../const'
import store from '../store'

const $router = () => Router.$router

// 环境切换
const baseURL = process.env.VUE_APP_BASE_API

const service = axios.create({
  baseURL,
  timeout: REQUEST_TIME_OUT,
  headers: {
    // post请求头默认为formData（具体以后端接收）
    post: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
  }
})

// 请求态[可选]
service.interceptors.request.use(
  config => {
    store.commit('app/setRequestLoading', { requestPath: config.url, loadingStatus: true })
    return config
  }
)
service.interceptors.response.use(
  response => {
    store.commit('app/setRequestLoading', { requestPath: response.config.url, loadingStatus: false })
    return response
  },
  error => {
    if (error.response) {
      store.commit('app/setRequestLoading', { requestPath: error.response.config.url, loadingStatus: false })
    }
    return Promise.reject(error)
  }
)
// 请求拦截器
service.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = Qs.stringify({ ...getCommonParams(), ...config.data })
    } else {
      config.params = { ...getCommonParams(), ...config.params }
    }
    if (typeof config.handerError === 'undefined') {
      config.handerError = true
    }
    return config
  },
  error => Promise.error(error)
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      const res = response.data
      if (res.code === 0 || !response.config.handerError) {
        return Promise.resolve(res)
      }
    }
    return Promise.reject(response)
  }
)
service.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status) {
      const ResError = error.response.data
      switch (error.response.status) {
        case 200:
          resolveData(error.response)
          break
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
              query: { redirect: $router().currentRoute.fullPath }
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
            message: ResError.message || ResError.msg
          })
      }
      return Promise.reject(ResError || error.response)
    }
    // 判断请求异常信息中是否含有超时timeout字符串
    if (error.message && error.message.includes('timeout')) {
      showError({
        title: '错误',
        message: '请求超时'
      })
    }
    return Promise.reject(error)
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
const get = (url, params = {}, handerError = true) => {
  return service.get(url, {
    params,
    handerError
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的参数]
 */
const post = (url, data = {}, handerError = true) => {
  return service.post(url, data, { handerError })
}

/**
 * delete方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
const Delete = (url, params = {}, handerError = true) => {
  return service.delete(url, {
    params,
    handerError
  })
}

export { get, post, Delete }
