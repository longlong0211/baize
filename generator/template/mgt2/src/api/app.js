import { get, post } from '../helpers/axios'
import { APIS } from '../helpers/constant'
const baseURL = process.env.VUE_APP_BASE_API
export default {
  login (params = {}) { // 登录
    return post(APIS.LOGIN, params)
  },
  logout (params = {}) { // 登出
    return post(APIS.LOGOUT, params)
  },
  requestOssParams (params = {}) { // 请求OSS参数
    return get(APIS.OSS_PARAMS, params)
  },
  requestOssFileUrl (params = {}) { // 获取文件在OSS的url
    return get(APIS.OSS_FILE_URL, params)
  },
  requestDataDict (params = {}) { // 获取数据字典
    return get(APIS.DATA_DICT, params, { baseURL })
  },
  requestAuthorityMenu (params = {}) { // 获取权限及菜单信息
    return get(APIS.AUTHORITY_MENU, params, { baseURL })
  }
}
