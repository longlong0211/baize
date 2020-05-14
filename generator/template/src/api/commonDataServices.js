import { get } from '../helpers/axios'

// 获取所有院区下拉数据
export function getClinicAllList (params = {}) {
  return get('/cms/clinic/all/list', params)
}

// 获取所有科室下拉数据
export async function getDepartmentAllList (params = {}) {
  return get('/cms/department/all/list', params)
}
