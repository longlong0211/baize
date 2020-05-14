import OSS from 'ali-oss'
import localforage from 'localforage'
import _ from 'lodash'
import request from '../request'

const clientMaps = new Map()

/**
 * oss断点续传
 */
export default class OssUtils {
  /**
   * 获取当前上传的oss实例
   * @returns {*|Map<any, any>|Map}
   */
  static getClientMaps () {
    return clientMaps
  }

  static close () {
    try {
      // 中断所有上传
      OssUtils.getClientMaps().forEach(v => {
        v && v.cancel()
      })
      // 清除所有实例
      clientMaps.clear()
    } catch (e) { }
  }

  // 新增断点数据
  static insert = async (id, params) => {
    return localforage.setItem(`${id}`, params)
  }

  // 根据唯一key查询断点信息
  static queryByPrimaryKey = async (id) => {
    return localforage.getItem(`${id}`)
  }

  // 根据唯一key删除断点信息
  static deleteByPrimaryKey = (id) => {
    return localforage.removeItem(`${id}`)
  }

  static getOssConfig (ossConfig) {
    const { accessKeyId, accessKeySecret, securityToken: stsToken, endpoint, bucketName: bucket } = ossConfig
    return { accessKeyId, accessKeySecret, endpoint, bucket, stsToken }
  }

  /**
   * oss上传文件
   * @param ossConfig oss参数
   * @param file 文件对象
   * @param onProgress 进度回调
   * @param archivesRelationId 后台记录的ID
   * @param archivesId 对应的档案id
   * @returns {Promise<*|*|*>}
   */
  static upload = async (ossConfig, file, onProgress, archivesRelationId, archivesId) => {
    const client = new OSS(OssUtils.getOssConfig(ossConfig))
    const options = {
      progress: async (percent, checkpoint) => {
        try {
          onProgress && onProgress(percent, checkpoint)
          if (percent === 1 || !checkpoint) {
            // 删除断点信息
            await OssUtils.deleteByPrimaryKey(archivesRelationId)
          } else {
            await OssUtils.insert(archivesRelationId, { archivesRelationId, archivesId, percent, checkpoint: JSON.stringify(checkpoint) })
          }
        } catch (e) {
          console.error(e)
        }
      },
      mime: file.type,
      partSize: 1024 * 1024
    }
    const query = await OssUtils.queryByPrimaryKey(archivesRelationId)
    if (query && !_.isEmpty(query.checkpoint)) {
      Object.assign(options, { checkpoint: Object.assign(JSON.parse(query.checkpoint), { file }) })
    }
    // 存储client对象
    clientMaps.set(archivesRelationId, client)
    return client.multipartUpload(ossConfig.directory + OssUtils.uuidv4() + file.name.substring(file.name.lastIndexOf('.')), file, options)
  }

  // uuid
  static uuidv4 () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    }).split('-').join('')
  }

  // 获取访问资源的url
  static async signatureUrl (ossConfig, ossObjectName, fileName) {
    const client = new OSS(OssUtils.getOssConfig(ossConfig))
    // 有效期正服60天
    const expires = process.env.NODE_ENV === 'production' ? 60 * 60 * 24 * 60 : 60
    return client.signatureUrl(ossObjectName, { response: { 'content-disposition': 'attachment; filename="' + fileName + '"' }, expires })
  }

  // 直接下载文件
  static async downloadFile (ossConfig, ossObjectName, fileName) {
    try {
      const url = await OssUtils.signatureUrl(ossConfig, ossObjectName, fileName)
      OssUtils.download(url, fileName)
    } catch (e) { }
  }

  static download (url, fileName) {
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = fileName
    anchor.style.display = 'none'
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
  }

  /**
   * 上传文件
   * @param file
   * @returns {Promise<Promise<*>|Promise<*>|*|void|undefined|Observable<AjaxResponse>|IDBRequest<IDBValidKey>|Promise<void>>}
   */
  static async _upload (file) {
    const filename = file.name
    const extName = filename.substring(filename.lastIndexOf('.'), filename.length)
    const { data } = await request('/system/common/file/sts-token', {
      method: 'GET'
    }) || {}
    const ossClient = new OSS(OssUtils.getOssConfig(data))
    return ossClient.put(`${data.directory}${data.uuid}${extName}`, file)
  }
}
