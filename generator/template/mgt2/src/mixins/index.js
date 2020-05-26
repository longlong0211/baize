import { verifyOperationPermission } from '../helpers/authority'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters: appMapGetters } = createNamespacedHelpers('app') // app空间下的STORE API

export default {
  computed: {
    ...appMapGetters(['getRequestLoading'])
  },
  methods: {
    verifyOperationPermission, // 验证操作权限（开发过程中用于获取用户是否有某个权限）
    getLoading (path) { // 全局通过请求路径获取loading状态
      return this.getRequestLoading(path)
    }
  }
}
