import { get, post } from '../helpers/axios'

export function getNotice (params = {}) {
  return get('/app/notice/main', params)
}

export function saveNotice (params = {}) {
  return post('/app/notice/main/save', params)
}
// 用户管理列表
export function getUserList (params = {}) {
  return get('/app/patient/mgtList', params)
}

// 预约管理列表
export function getBookingList (params = {}) {
  return get('/app/subscribe/mgt/list', params)
}
