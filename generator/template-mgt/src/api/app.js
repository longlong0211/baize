import { get, post } from '../helpers/axios'
import { APIS } from '../const'

export function login (params = {}) { // 登录
  return post('/system/login', params)
}
export function logout (params = {}) { // 登出
  return post('/system/logout', params)
}
export function updatePwd (params = {}) { // 重置密码
  return post('/system/staff/password/update', params)
}
export function requestOssParams (params = {}) { // 请求OSS参数
  return get(APIS.OSS_PARAMS, params)
}
export function requestOssFileUrl (params = {}) { // 获取文件在OSS的url
  return get(APIS.OSS_FILE_URL, params)
}
export function requestDataDict (params = {}) { // 获取数据字典
  return get(APIS.DATA_DICT, params)
}
export function requestAuthorityMenu (params = {}) { // 获取权限及菜单信息
  return get(APIS.AUTHORITY_MENU, params)
}
