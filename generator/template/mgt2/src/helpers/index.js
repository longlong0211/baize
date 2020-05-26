import { Notification } from 'element-ui'
import SanitizeHTML from 'sanitize-html'
import jsCookie from 'js-cookie'
import { MESSAGE_TIME, COOKIE_KEY, COMMON_PARAMS } from './constant'
import axios from 'axios'
import router from '../router'

/*
* 错误提示
* */
const showError = (config) => {
  Notification({
    ...config,
    type: 'error',
    duration: MESSAGE_TIME
  })
}
/*
* 数据解析、catch错误
* */
const resolveData = (response) => {
  try {
    const { data } = response // 接口实际返回的数据
    if (data.code !== 0) {
      showError({
        title: '错误',
        message: data.msg || '未知错误'
      })
      if (data.code === 10) { // 管理员未登录
        // removeAllCookie()
        if (router.currentRoute.name === 'login') {
          return
        }
        window.location.href = '/login'
      }
    }
    return data
  } catch (e) {
    showError({
      title: '请求错误',
      message: '请稍后重试！'
    })
  }
}
/*
* 格式化富文本，防止攻击、过滤标签
* */
const sanitizeHTML = (html) => {
  return html ? SanitizeHTML(html, {
    parser: {
      lowerCaseTags: true
    },
    allowedTags: ['b', 'i', 'code', 'p', 'a', 'div', 'ul', 'em', 'strong', 'span', 'article', 'section', 'img', 'ol', 'h1', 'h2', 'h3', 'h4', 'h5', 'blockquote', 'table', 'thead', 'tbody', 'th', 'tr', 'td', 'small', 'label', 'br', 'dl', 'dd', 'dt', 'style'],
    allowedAttributes: false
  }) : ''
}
/*
* 格式化富文本为纯文本
* */
const sanitizeHTMLPureTxt = (html) => { // pure text
  return html ? sanitizeHTML(html, {
    allowedTags: [],
    allowedAttributes: {}
  }) : ''
}
/*
* 是否登录，判断是否有token即可
* */
const isLogin = () => {
  return !!jsCookie.get(COOKIE_KEY.JIAHUI_WEB_TOKEN)
}
/*
* 接口是否请求成功
* */
const isRequestSuccess = (code) => {
  return code === 0
}
/*
* 清除所有cookie
* */
const removeAllCookie = (code) => {
  Object.keys(jsCookie.get()).forEach(key => jsCookie.remove(key))
}
/*
* 读取网络流信息
* */
const readAsStream = async (url) => {
  const data = await axios.get(url).data
  return data
}
/*
* 获取通用请求参数
* */
const getCommonParams = () => {
  const commonParams = COMMON_PARAMS
  return {
    ...commonParams,
    _token: jsCookie.get(COOKIE_KEY.JIAHUI_WEB_TOKEN)
  }
}

/*
* 格式化、删除无用请求参数
* */
const formatParams = (params) => {
  const p = {}
  for (let v in params) {
    let value = params[v]
    if (Object.prototype.toString.call(params[value]) === '[object String]') {
      value = value ? value.replace(/(^\s*)|(\s*$)/g, '') : ''
    }
    if (value || value === 0) {
      p[v] = value
    }
  }
  return p
}

export { showError, resolveData, sanitizeHTML, sanitizeHTMLPureTxt, isLogin, isRequestSuccess, removeAllCookie, readAsStream, getCommonParams, formatParams }
