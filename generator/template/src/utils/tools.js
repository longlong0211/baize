import { PermissionHelper } from '../helpers/PermissionHelper'
import { useEffect, useState } from 'react'

export function browserInfo () {
  const ua = navigator.userAgent
  let M = ua.match(
    /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
  let tem
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || []
    return 'IE ' + (tem[1] || '')
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
    if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera')
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1])
  return M.join(' ')
}

export function isPermission (key) {
  return PermissionHelper.checkOperationPermission(key)
}

/**
 * 执行异步代码的effect
 * @param call
 * @param unBind
 */
export function useAsyncEffect (call, unBind) {
  useEffect(() => {
    call && call()
    return unBind || (() => {})
  }, [])
}

/**
 * 是否可以使用摄像头
 * @return {boolean}
 */
export function useHasUserMedia () {
  const [hasMedia, setHasMedia] = useState(false)

  // eslint-disable-next-line
  useEffect(() => {
    // 老的浏览器可能根本没有实现 mediaDevices，所以我们可以先设置一个空的对象
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {}
    }

    // 一些浏览器部分支持 mediaDevices。我们不能直接给对象设置 getUserMedia
    // 因为这样可能会覆盖已有的属性。这里我们只会在没有getUserMedia属性的时候添加它。
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        // 首先，如果有getUserMedia的话，就获得它
        const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia

        // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
        }

        // 否则，为老的navigator.getUserMedia方法包裹一个Promise
        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject)
        })
      }
    }
    // 请求摄像头权限
    navigator.mediaDevices.getUserMedia({ audio: false, video: true })
      .then(() => {
        // 成功
        setHasMedia(true)
      })
      // eslint-disable-next-line handle-callback-err
      .catch(() => {
        // 失败
        setHasMedia(false)
      })
  }, [])

  return hasMedia
}
