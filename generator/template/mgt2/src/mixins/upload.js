/* eslint-disable camelcase */
import { random, getFileSuffix } from '../helpers/string'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('app')

export default {
  computed: {
    ...mapGetters(['oss'])
  },
  methods: {
    ...mapActions(['getOssParams', 'getOssFileUrl']),
    fetchExtraOssData (fileName) { // 获取OSS上传所需额外参数
      const fileSuffix = getFileSuffix(fileName)
      const { directory, postParams: { policy, OSSAccessKeyId, success_action_status, signature } } = this.oss
      return {
        key: `${directory}${random(18)}.${fileSuffix}`,
        policy,
        OSSAccessKeyId,
        success_action_status,
        signature
      }
    },
    async fetchOssParams () { // 检查、检出OSS参数状态
      let { expire } = this.oss
      if (!expire || (expire - 10) * 1000 < Date.now()) { // 没有数据或者数据已过期（提前10s规避网络请求产生的时间差）则重新请求
        const ossData = await this.getOssParams()
        if (ossData.expire) {
          return true
        }
        return false
      }
      return true
    }
  }
}
