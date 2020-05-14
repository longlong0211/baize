
import Cookies from 'js-cookie'
import config from '../configs/config'
class StorageHelper {
  /**
   * 设置 本地存储接口
   * @param key
   * @param val
   */
  static set (key, val) {
    return localStorage.setItem(key, val)
  }

  /**
   * 获取 本地存储接口
   * @param key
   */
  static get (key) {
    return localStorage.getItem(key)
  }

  /**
   * 移除指定的缓存
   */
  static remove (key) {
    localStorage.removeItem(key)
  }

  /**
   * 设置 本地存储接口(会话级别)
   */
  static sessionSet (key, val) {
    return sessionStorage.setItem(key, val)
  }

  /**
   * 获取 本地存储接口(会话级别)
   */
  static sessionGet (key) {
    return sessionStorage.getItem(key)
  }

  /**
   * 移除指定的缓存(会话级别)
   */
  static sessionRemove (key) {
    sessionStorage.removeItem(key)
  }

  /**
   * 判断是否是域名
   *
   * @static
   * @returns {boolean} HIS、总部、SCRM有无统一二级域名
   * @memberof UserHelper
   */
  static isSLDomain () {
    return window.location.hostname.includes(this.getDomain())
  }

  /**
   * 设置 cookie存储
   * @param key
   * @param valueString
   */
  static cookieSet (key = '', valueString = '') {
    const isSLDomain = StorageHelper.isSLDomain()
    const cookieParam = !isSLDomain ? null : { domain: this.getDomain() }
    if (cookieParam) {
      return Cookies.set(key, valueString, cookieParam)
    } else {
      return Cookies.set(key, valueString)
    }
  }

  /**
   * 获取 cookie存储
   * @param key
   */
  static cookieGet (key = '') {
    const isSLDomain = StorageHelper.isSLDomain()
    const cookieParam = !isSLDomain ? null : { domain: this.getDomain() }
    if (cookieParam) {
      return Cookies.get(key, cookieParam)
    } else {
      return Cookies.get(key)
    }
  }

  /**
   * 移除 cookie存储
   * @param key
   */
  static cookieRemove (key = '') {
    const isSLDomain = StorageHelper.isSLDomain()
    const cookieParam = !isSLDomain ? null : { domain: this.getDomain() }
    if (cookieParam) {
      return Cookies.remove(key, cookieParam)
    } else {
      return Cookies.remove(key)
    }
  }

  static removeAllCookie () {
    var keys = document.cookie.match(/[^ =;]+(?==)/g)
    if (keys) {
      for (var i = keys.length; i--;) {
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
      }
    }
  }

  static cookieRemoveAll () {
    const keys = document.cookie.match(/[^ =;]+(?==)/g)
    if (!keys) { return }
    const isSLDomain = StorageHelper.isSLDomain()
    const cookieParam = !isSLDomain ? '' : `;domain=${this.getDomain()};`
    for (let i = keys.length; i--;) {
      if (cookieParam) {
        Cookies.remove(keys[i], cookieParam)
      } else {
        Cookies.remove(keys[i])
      }
    }
  }

  /**
   * 获取域名
   * @param {*} env development or production
   */
  static getDomain () {
    return config.domain[process.env.NODE_ENV]
  }
}

export default StorageHelper
export { StorageHelper }
