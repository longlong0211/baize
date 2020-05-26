<template>
  <div class="anesthesia-questionnaire">
    <!-- 搜索条件 -->
    <el-form ref="conditionForm" label-width="90px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="episode No." prop="episodeCode">
            <el-input v-model="episodeCode" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="MRN" prop="patientCode">
            <el-input v-model="patientCode" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="手术名称" prop="operName">
            <el-input v-model="operName" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="申请医生" prop="applyName">
            <el-input v-model="applyName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="申请日期">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="短信已发">
            <el-select style="width: 100%;" v-model="sendSmsStatus" placeholder="请选择">
              <el-option label="全部" value=""/>
              <el-option v-for="item in dictOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="问卷已阅">
            <el-select style="width: 100%;" v-model="readStatus" placeholder="请选择">
              <el-option label="全部" value=""/>
              <el-option v-for="item in dictOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="问卷已填">
            <el-select style="width: 100%;" v-model="writeStatus" placeholder="请选择">
              <el-option label="全部" value=""/>
              <el-option v-for="item in dictOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="condition-buttons" style="text-align: left">
        <el-col :span="12">
          <el-button type="primary" @click="queryList({ current: 1 })">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-col>
        <el-col :span="11"  style="text-align: right">
          <el-button class="download-btn" type="success" @click="download">导出记录</el-button>
        </el-col>
      </el-form-item>
    </el-form>

    <!-- 数据列表 -->
    <el-table
      :data="list"
      class="list-table"
      v-loading="loading"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="50">
      </el-table-column>
      <el-table-column
        prop="episodeCode"
        label="episode No."
        width="180">
      </el-table-column>
      <el-table-column
        prop="patientCode"
        label="MRN"
        width="120">
      </el-table-column>
      <el-table-column
        label="手术名称"
        width="220">
        <span slot-scope="scope">{{ `${scope.row.operCnName} | ${scope.row.operEnName}` }}</span>
      </el-table-column>
      <el-table-column
        prop="applyNameCn"
        label="申请医生"
        width="180">
      </el-table-column>
      <el-table-column
        prop="opeApplyDate"
        label="申请时间">
      </el-table-column>
      <el-table-column
        width="80"
        prop="sendSmsStatusStr"
        label="短信已发">
      </el-table-column>
      <el-table-column
        width="80"
        prop="readStatusStr"
        label="问卷已阅">
      </el-table-column>
      <el-table-column
        width="80"
        prop="writeStatusStr"
        label="问卷已填">
      </el-table-column>
      <el-table-column
        width="160"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <a v-if="showQrcodeButton(scope.row)" :href="scope.row.contentPdfUrl" target="_blank">查看反馈</a>
          <div v-else>
            <span v-if="showAnother2(scope.row)" @click="openResendModal(scope.row.id, scope.row.mainTel)">重发短信</span> |
            <span v-if="showAnother2(scope.row)" @click="setQrCodeUrl(scope.row.questionnaireUrl)">问卷二维码</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.current"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="pagination.size"
        layout="sizes, prev, pager, next"
        :total="pagination.total"
      />
    </div>

    <!-- 二维码弹窗 -->
    <el-dialog
      class="qrcode-modal"
      title="问卷二维码"
      :visible.sync="qrCodeModalVisible"
      width="25%"
      :before-close="closeQrcodeDialog"
      @open="qrCodeOpened"
    >
      扫码填写"麻醉风险评估调查问卷"
      <div id="qrcode"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeQrcodeDialog">关闭</el-button>
      </span>
    </el-dialog>

    <!-- 重发短信弹窗 -->
    <el-dialog
      class="resend-modal"
      title="重发短信"
      :visible.sync="reSendSmsModalVisible"
      width="26%"
      :before-close="closeResendDialog"
    >
      <el-form ref="phoneForm" :model="phoneForm" label-width="auto">
        <el-form-item label="患者手机号" :rules="activePhoneRules" prop="activePhone">
          <el-input maxlength="11" v-model="phoneForm.activePhone" />
        </el-form-item>
      </el-form>
      <p class="tip">点击确定，将会给患者重新发送"麻醉风险评估调查问卷"短信。</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeResendDialog">取消</el-button>
        <el-button :loading="smsLoading" type="primary" @click="reSendSms">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { APIS } from '../../helpers/constant' // 原VUEX API
import { createNamespacedHelpers } from 'vuex' // 原VUEX API
import { createHelpers } from 'vuex-map-fields'
import QRCode from 'qrcode2'

const { mapFields } = createHelpers({
  getterType: 'demo/getConditionField',
  mutationType: 'demo/setConditionField'
})
// 创建demo空间下的STORE API
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('demo')
const { mapState: appMapstate } = createNamespacedHelpers('app')
const DICT = {
  YES: 1, // 是
  NO: 0 // 否
}
export default {
  name: 'list',
  data () {
    return {
      qrcode: null, // 二维码实例
      activeQrcodeUrl: '', // 当前二维码地址
      activeId: '', // 当前选择项id
      phoneForm: {
        activePhone: '' // 表单手机号
      },
      activePhoneRules: { required: true, validator: this.checkPhone, trigger: 'blur' }
    }
  },
  computed: {
    ...mapState(['list', 'pagination']),
    ...appMapstate(['loading']),
    ...mapFields([
      'episodeCode',
      'patientCode',
      'operName',
      'applyName',
      'opeApplyDateStart',
      'opeApplyDateEnd',
      'sendSmsStatus',
      'readStatus',
      'writeStatus',
      'dateRange'
    ]),
    dictOptions () {
      const options = []
      for (let d in DICT) {
        let label = DICT[d] === DICT.YES ? '是' : '否'
        options.push({ label, value: DICT[d] })
      }
      return options
    },
    loading () {
      return this.getRequestLoading([APIS.ANESTHESIA_QUESTIONNAIRE_LIST])
    },
    smsLoading () {
      return this.getRequestLoading([APIS.ANESTHESIA_SEND_SMS])
    },
    qrCodeModalVisible () {
      return Boolean(this.activeQrcodeUrl)
    },
    reSendSmsModalVisible () {
      return Boolean(this.activeId)
    }
  },
  filters: {
    statusLabel (value) {
      if (parseInt(value) === DICT.YES) {
        return '是'
      }
      return '否'
    }
  },
  methods: {
    ...mapActions(['queryList', 'sendSms', 'download']),
    ...mapMutations(['resetCondition', 'setPagination', 'resetState']),
    mergePagination (newPagination) {
      const pagination = {
        ...this.pagination,
        ...newPagination
      }
      this.setPagination(pagination)
    },
    handleCurrentChange (current) {
      this.mergePagination({ current })
      this.queryList({ current })
    },
    handleSizeChange (size) {
      this.mergePagination({ size })
      this.queryList({ current: 1, size })
    },
    checkPhone (rule, value, callback) {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^[1][0-9]{10}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    },
    openResendModal (id, phone) {
      this.activeId = id
      this.phoneForm.activePhone = phone
      setTimeout(() => {
        this.$refs.phoneForm.clearValidate()
      }, 0)
    },
    reSendSms () {
      this.$refs.phoneForm.validate().then(async () => {
        await this.sendSms({ id: this.activeId, phone: this.phoneForm.activePhone })
        this.closeResendDialog()
      })
    },
    closeResendDialog () {
      this.activeId = ''
      this.phoneForm.activePhone = ''
    },
    closeQrcodeDialog () {
      this.activeQrcodeUrl = ''
    },
    showQrcodeButton (item) { // 是否显示'查看反馈'
      return item.writeStatus === DICT.YES
    },
    showAnother2 (item) { // 是否显示另外两个按钮（'重发短信'、'问卷二维码'）
      return item.writeStatus === DICT.NO
    },
    query () {
      this.queryList()
    },
    handleReset () {
      this.resetCondition()
      this.$refs.conditionForm.clearValidate()
      this.queryList({ current: 1 })
    },
    qrCodeOpened () {
      setTimeout(() => {
        if (!this.qrcode) {
          this.qrcode = new QRCode(document.getElementById('qrcode'), {
            text: this.activeQrcodeUrl,
            width: 128,
            height: 128,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
          })
        }
        this.qrcode.clear()
        this.qrcode.makeCode(this.activeQrcodeUrl)
      }, 0)
    },
    setQrCodeUrl (url) {
      this.activeQrcodeUrl = url
    }
  },
  created () {
    this.queryList({ current: 1 }) // 查询列表
  },
  destroyed () {
    this.resetState()
  }
}
</script>

<style lang="less">
  .anesthesia-questionnaire {
    @color: #409EFF;
    background-color: white;
    /* 导出按钮样式 */
    .download-btn {
      margin-right: 4px;
    }

    /* 分页 */
    .page-block {
      margin-top: 20px;
    }

    /* 操作按钮样式 */
    .list-table tr td:last-child div {
      a, span {
        color: @color;
        cursor: pointer;
        text-decoration: none;
      }
    }

    /* dialog标题居左显示 */
    .el-dialog__header {
      text-align: left;
    }
    .qrcode-modal .el-dialog__body {
      color: @color;
      font-size: 16px;
      font-weight: bold;
      /* 二维码dialog样式 */
      #qrcode {
        text-align: center;
        margin-top: 10px;
        img {
          margin: auto;
        }
      }
    }
    .resend-modal .tip {
      text-align: left;
      color: gray;
    }
  }
</style>
