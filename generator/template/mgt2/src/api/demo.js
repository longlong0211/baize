import { get, post } from '../helpers/axios'
import { APIS } from '../helpers/constant'
export default {
  queryList (params = {}) { // 查询列表
    return get(APIS.ANESTHESIA_QUESTIONNAIRE_LIST, { ...params })
  },
  sendMessage (params = {}) { // 重发短信
    return post(APIS.ANESTHESIA_SEND_SMS, { ...params })
  },
  download (params = {}) { // 导出
    return get(APIS.ANESTHESIA_DOWNLOAD, { ...params })
  }
}
