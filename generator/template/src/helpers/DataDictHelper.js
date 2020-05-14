/**
 * Created by coeus on 17/3/21.
 */
import { isEmpty } from 'lodash'
import { LOCAL_STORAGE } from '../const'
import { StorageHelper } from './StorageHelper'

class DataDictHelper {
  /**
   * 设置数据字典
   * @param userId
   */
  static setDataDict (dataDict) {
    StorageHelper.set(LOCAL_STORAGE.KEY.DATADICT, JSON.stringify(dataDict))
  }

  /**
   * 获取数据字典
   */
  static getDataDict () {
    return JSON.parse(StorageHelper.get(LOCAL_STORAGE.KEY.DATADICT))
  }

  /**
   * 移除数据字典
   */
  static clearDataDict () {
    StorageHelper.remove(LOCAL_STORAGE.KEY.DATADICT)
  }

  /**
   * 通过key查找数据字典
   * @param key
   * @returns {*}
   */
  static queryDataDictWithKey (key) {
    if (isEmpty(DataDictHelper.getDataDict())) {
      return null
    }
    return DataDictHelper.getDataDict()[key]
  }

  /**
   * 获取数据字典value值
   * @param key
   * @param displayName
   * @returns {number}
   */
  static queryValue (key, displayName) {
    const dataDict = DataDictHelper.queryDataDictWithKey(key)
    let value = -1
    if (!isEmpty(dataDict)) {
      dataDict.map((item) => {
        if (item.displayName === displayName) {
          value = item.value
        }
      })
    }

    return value
  }

  /**
   * 获取数据字典displayName值
   * @param key
   * @param value
   * @returns {string}
   */
  static queryDisplayName (key, value) {
    const dataDict = DataDictHelper.queryDataDictWithKey(key)
    let displayName = ''
    if (!isEmpty(dataDict)) {
      dataDict.map((item) => {
        if (item.value === value) {
          displayName = item.displayName
        }
      })
    }
    return displayName
  }

  /**
   * 根据自定义key获取displayName值
   * @param key
   * @param value
   * @param dataKey
   * @returns {string}
   */
  static queryDisplayNameWithKey (key, value, dataKey, dataValue) {
    const dataDict = DataDictHelper.queryDataDictWithKey(key)
    let displayName = ''
    if (!isEmpty(dataDict)) {
      dataDict.map((item) => {
        if (item[dataValue] === value) {
          displayName = item[dataKey]
        }
      })
    }
    return displayName
  }
}

export default DataDictHelper
export { DataDictHelper }
