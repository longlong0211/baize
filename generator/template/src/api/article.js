import { get } from '../helpers/axios'
import { APIS } from '../const'

export function queryList (params = {}) { // 查询列表
  return get(APIS.ARTICLE_LIST, { ...params })
}
