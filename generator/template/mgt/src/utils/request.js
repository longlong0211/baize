// import fetch from 'dva/fetch'
// import 'whatwg-fetch'
import { ObjectUtil } from '../helpers/ObjectUtil'
// import { CheckNewDate } from '../helpers/CheckNewDate'
// import { StorageHelper } from '../helpers/StorageHelper'
// import { notification } from 'antd'
import { trim } from '../utils/stringUtils'
import getServerUrl from './serverUrl'
import * as UserHelper from '../helpers/UserHelper'
import { PROJECT_TYPE } from '../const'

const commParams = {
  language: 'zh_CN',
  app_key: 'airahPeethiGaif8Aizo',
  terminal_type: '2'
}

// let diffTimeArr = []
/**
 * 通用参数
 * @returns {Array}
 */
export function formatedCommParams (params = {}) {
  return formatParams({
    ...commParams,
    _token: UserHelper.getToken(),
    ...params
  }).formData
}

/**
 * 通用参数处理
 *
 * @export
 * @param {*} url
 * @param {*} options
 * @param {*} [projectType=PROJECT_TYPE.JIH_WEB]
 * @returns
 */
export function concatFetchUrl (url, options = {}, useMockHost = false, projectType = PROJECT_TYPE.JIH_WEB) {
  const params = {
    ...options.data,
    ...commParams,
    _token: UserHelper.getToken()
  }

  const formatParam = formatParams(params)
  if (options.method && options.method.toUpperCase() === 'POST') {
    return {
      fetchUrl: getServerUrl(url, useMockHost, projectType),
      newOptions: {
        method: 'POST',
        // credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formatParam.formData,
        ...commParams
      }
    }
  } else {
    if (ObjectUtil.isEmpty(formatParam.formData)) {
      return {
        fetchUrl: getServerUrl(url, useMockHost, projectType),
        newOptions: {
          // credentials: 'include'
        }
      }
    } else {
      return {
        fetchUrl: getServerUrl(url, useMockHost, projectType) + '?' + formatParam.formData,
        newOptions: {
          // credentials: 'include'
        }
      }
    }
  }
}

// async function request (url, options = {}, useMockHost = false, projectType = PROJECT_TYPE.JIH_WEB) {
//   if (!options.cross) {

//     let res

//     try {
//       const { fetchUrl, newOptions } = concatFetchUrl(url, options, useMockHost, projectType)
//       res = await fetch(fetchUrl, newOptions)

//       if (res.ok) {
//         const data = await res.json()

//         if (data.code !== 0) {
//           let notification = {
//             type: 'error',
//             message: '操作失败',
//             description: data.msg
//           }
//           showNotification(notification)
//         }
//         if (data.code === 4 || data.code === 10 || data.code === 11) {
//           sessionStorage.clear()
//           UserHelper.clearToken()
//           setTimeout(() => {
//             window.location = '/'
//           }, 1000)
//         }

//         // 缓存本地时间与服务器时间差
//         // eslint-disable-next-line no-mixed-operators
//         if (data.st && data.st !== '' || typeof data.st === 'number') {
//           const diff = data.st - new Date().getTime()
//           diffTimeArr.push(diff)
//           if (diffTimeArr.length >= 10) {
//             diffTimeArr = diffTimeArr.slice(-10)
//           }
//           StorageHelper.set('TIME_OFFSET', CheckNewDate.getAvg(diffTimeArr))
//         }

//         return data
//       } else {
//         let notification = {
//           type: 'error',
//           message: '网络请求失败',
//           description: `接口:"${url}"\n错误码:${res.status}\n错误信息:${res.statusText}`
//         }
//         showNotification(notification)
//         return { code: -10000, msg: `接口:"${url}"\n错误码:${res.status}\n错误信息:${res.statusText}` }
//       }
//     } catch (error) {
//       let notification = {
//         type: 'error',
//         message: '网络请求失败',
//         description: `接口:"${url}"\n错误信息:${error}`
//       }
//       showNotification(notification)
//       return { code: -10000, msg: `接口:"${url}"\n错误信息:${error}` }
//     }
//   }
// }

/**
 * 格式化参数
 * @param params  参数      {name:admin, password:123}
 * @returns {formData: Array, undefinedKeys: Array}   'name=admin&password=123'
 */
export function formatParams (params = {}) {
  let formData = []
  const undefinedKeys = []

  for (const property in params) {
    const encodedKey = encodeURIComponent(property)
    // 参数值 去空格
    const uncodedValue = trim(params[property])
    const encodedValue = encodeURIComponent(uncodedValue)

    if (!params[property] && params[property] !== 0 && params[property] !== '') {
      undefinedKeys.push(property)
    } else {
      formData.push(encodedKey + '=' + encodedValue)
    }
  }

  formData = formData.join('&')

  return { formData: formData, undefinedKeys: undefinedKeys }
}

/**
 * 错误提示
 * @param errorInfo
 */
// const showNotification = (info) => {
//   notification[info.type]({
//     message: info.message,
//     description: info.description,
//     duration: 6
//   })
// }

/**
 * 网络请求是否成功
 */
export function isSuccess (code) {
  return code === 0
}

/**
 * hcrm相关
 * @param url
 * @param options
 * @param useMockHost
 * @returns {Promise<any|{msg, code}|undefined>}
 */
// export async function requestHcrm (url, options, useMockHost) {
//   return request(url, options, useMockHost, PROJECT_TYPE.HCRM)
// }

/**
 * scrm相关
 * @param url
 * @param options
 * @param useMockHost
 * @returns {Promise<any|{msg, code}|undefined>}
 */
// export async function requestScrm (url, options, useMockHost) {
//   return request(url, options, useMockHost, PROJECT_TYPE.SCRM)
// }
