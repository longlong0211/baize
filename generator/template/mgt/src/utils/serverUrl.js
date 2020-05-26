/**
 * url拼接上服务器地址
 * @param url         'login.json'
 * @returns {string}  'http://www.921cha.com/eku-telemedicine-web-workshop/login.json'
 */
import config from '../configs/config'
import { PROJECT_TYPE } from '../const'

export default function getServerUrl (url, useMockHost, projectType) {
  switch (projectType) {
    case PROJECT_TYPE.JIH_WEB:
      return JhWeb(url, useMockHost)
    case PROJECT_TYPE.HCRM:
      return HcrmWeb(url, useMockHost)
    case PROJECT_TYPE.SCRM:
      // TODO 【待添加】
      return ''
    default:
      return JhWeb(url, useMockHost)
  }
}

/**
 * @return {string}
 */
function JhWeb (url, useMockHost) {
  if (url.indexOf('api') !== -1 || url.indexOf('api') !== -1) {
    // 如果已经是完整的url, 则直接返回
    return url
  }
  switch (process.env.VUE_APP_RUN_ENV) {
    case 'dev':
    case 'development':
      return useMockHost ? config.mockHost + url : config.url.dev + url
    case 'uat':
      return config.url.uat + url
    case 'pre':
      return config.preHost + url
    case 'pre2_0':
      return config.pre2_0Host + url
    case 'production':
      return config.productHost + url
    default:
      return config.productHost + url
  }
}

/**
 * @return {string}
 */
function HcrmWeb (url, useMockHost) {
  if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development') {
    return useMockHost ? config.mockHost + url : config.HCRM_DEV_API_HOST + url
  } else if (process.env.NODE_ENV === 'uat') {
    return config.HCRM_UAT_API_HOST + url
  } else if (process.env.NODE_ENV === 'pre') {
    return config.HCRM_PRE_API_HOST + url
  } else if (process.env.NODE_ENV === 'production') {
    return config.HCRM_PRO_API_HOST + url
  } else {
    return config.HCRM_PRO_API_HOST + url
  }
}
