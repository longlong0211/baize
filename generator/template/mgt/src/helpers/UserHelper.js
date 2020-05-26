/**
 * Created by coeus on 17/3/14.
 */

import { LOCAL_STORAGE } from '../const'
import { StorageHelper } from './StorageHelper'

/**
 * 设置登录状态
 * @param status
 */
export function setLoginStatus (status) {
  StorageHelper.cookieSet(LOCAL_STORAGE.KEY.LOGIN_STATUS, status)
}

/**
 * 获取登录状态
 */
export function getLoginStatus () {
  return StorageHelper.cookieGet(LOCAL_STORAGE.KEY.LOGIN_STATUS)
}

/**
 * 移除登录状态
 */
export function clearLoginStatus () {
  StorageHelper.sessionRemove(LOCAL_STORAGE.KEY.LOGIN_STATUS)
}

/**
 * 设置userName
 * @param userName
 */
export function setUserName (userName) {
  StorageHelper.cookieSet(LOCAL_STORAGE.KEY.USER_NAME, userName)
}

/**
 * 获取userName
 */
export function getUserName () {
  return StorageHelper.cookieGet(LOCAL_STORAGE.KEY.USER_NAME)
}
/**
 * 设置登录用户名
 * @param userName
 */
export function setLoginUserName (userName) {
  StorageHelper.cookieSet(LOCAL_STORAGE.KEY.LOGIN_USER_NAME, userName)
}

/**
 * 获取登录用户名
 */
export function getLoginUserName () {
  return StorageHelper.cookieGet(LOCAL_STORAGE.KEY.LOGIN_USER_NAME)
}

/**
 * 移除userName
 */
export function clearUserName () {
  StorageHelper.sessionRemove(LOCAL_STORAGE.KEY.USER_NAME)
}

/**
 * 设置userId
 * @param userId
 */
export function setUserId (userId) {
  StorageHelper.cookieSet(LOCAL_STORAGE.KEY.USER_ID, userId)
}

/**
 * 获取userId
 */
export function getUserId () {
  return StorageHelper.cookieGet(LOCAL_STORAGE.KEY.USER_ID)
}

/**
 * 移除userId
 */
export function clearUserId () {
  StorageHelper.sessionRemove(LOCAL_STORAGE.KEY.USER_ID)
}

/**
 * 设置登录状态
 * @param token 在同二级域名下（总部、连锁、scrm）共享cookie
 */
export function setToken (token) {
  StorageHelper.cookieSet(LOCAL_STORAGE.KEY.JIAHUI_WEB_TOKEN, token)
}

/**
 * 获取登录状态
 */
export function getToken () {
  return StorageHelper.cookieGet(LOCAL_STORAGE.KEY.JIAHUI_WEB_TOKEN)
}

/**
 * 移除登录状态
 */
export function clearToken () {
  StorageHelper.cookieRemoveAll()
}
