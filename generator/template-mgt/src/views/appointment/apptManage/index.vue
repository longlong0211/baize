<template>
  <div class="page">
    <el-form inline :model="form" size="small" ref="form" label-width="100px">
      <el-form-item style="display: block" label="预约创建日期:" prop="reservationCreateDate">
        <el-date-picker
          v-model="form.reservationCreateDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="预约门诊日期:" prop="reservationClinicDate">
        <el-date-picker
          v-model="form.reservationClinicDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="院区:" prop="clinicId">
        <el-select v-model="form.clinicId" placeholder="请选择">
          <el-option value="" label="不限"></el-option>
          <el-option
            v-for="item in clinicAllList"
            :key="item.id"
            :label="`${item.nameCn} （ ${item.nameEn} ）`"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="科室:" prop="deptId">
        <el-select v-model="form.deptId" placeholder="请选择">
          <el-option value="" label="不限"></el-option>
          <el-option
            v-for="item in departmentAllList"
            :key="item.id"
            :label="`${item.nameCn} （ ${item.nameEn} ）`"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="医生:" prop="doctorName">
        <el-input v-model="form.doctorName" placeholder="请输入医生"></el-input>
      </el-form-item>
      <el-form-item label="病历号:" prop="medicalNo">
        <el-input v-model="form.medicalNo" placeholder="请输入病历号"></el-input>
      </el-form-item>
      <el-form-item label="就诊人姓名:" prop="patientName">
        <el-input v-model="form.patientName" placeholder="请输入就诊人姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号码:" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="状态:" prop="subscribeStatus">
        <el-select v-model="form.subscribeStatus" placeholder="请选择">
          <el-option value="" label="不限"></el-option>
          <el-option
            v-for="item in stateList"
            :key="item.value"
            :label="item.displayName"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <div style="display: block" class="el-form-item">
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button type="primary" @click="resetForm('form')">清空</el-button>
        <el-button style="float: right" type="primary" @click="onExport">导出</el-button>
      </div>
    </el-form>
    <div class="table-header">预约列表（共 {{pagination.total}} 条记录）</div>
    <el-table
      class="table"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column prop="createTime" label="预约创建时间" align="center"></el-table-column>
      <el-table-column prop="apptTime" align="center" label="预约门诊时间"></el-table-column>
      <el-table-column prop="doctorName" align="center" label="院区/科室/医生">
        <template slot-scope="{row}">
          <div>院区：{{row.siteName}}</div>
          <div>科室：{{row.deptName}}</div>
          <div>医生：{{row.doctorName}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="就诊人">
        <template slot-scope="{row}">
          <div>{{row.patientName}} （{{row.gender}}<template v-if="row.birthDate">/{{row.birthDate}}</template>)</div>
          <div>病历号：{{row.patientCode}}</div>
          <div>手机号：{{row.mobile}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="apptRemark" label="就诊原因" align="center"></el-table-column>
      <el-table-column prop="paymentTypeName" label="结算方式" align="center"></el-table-column>
      <el-table-column label="保险信息" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{row.payorName}}</span>
          <a class="a-btn" v-if="row.cardPositiveUrl" @click="handlePreview(row)">商保卡照片</a>
        </template>
      </el-table-column>
      <el-table-column prop="apptStatusName" label="状态" align="center" width="80"></el-table-column>
      <el-table-column prop="apptSource" label="预约来源" align="center" width="100"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.current"
      :page-sizes="[10, 20, 30, 40, 50, 100, 500]"
      :page-size="pagination.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>

    <el-dialog
      title="图片预览"
      :visible.sync="dialogVisible"
      class="preview-dialog"
      width="60%">
      <el-row>
        <el-col :span="11">
          <img alt='商保卡图片' :src="imagesItem.cardPositiveUrl" />
          <a :href="imagesItem.cardPositiveUrl" target='_blank' :download="imagesItem.cardPositiveUrl">下载商保卡正面图片</a>
        </el-col>
        <el-col :span="11" :offset="2">
          <img alt='商保卡图片' :src="imagesItem.cardReverseUrl" />
          <a :href="imagesItem.cardReverseUrl" target='_blank' :download="imagesItem.cardReverseUrl">下载商保卡反面图片</a>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState, mapMutations } from 'vuex'
import { getBookingList } from '../../../api/appointment'
import { getClinicAllList, getDepartmentAllList } from '../../../api/commonDataServices'
import { removeEmptyValue, open } from '../../../utils'
import getServerUrl from '../../../utils/serverUrl'

import { formatedCommParams } from '../../../utils/request'
import { DataDictHelper } from '../../../helpers/DataDictHelper'
import { DATADICT_KEY } from '../../../const'

export default {
  data () {
    return {
      form: {
        reservationCreateDate: [moment().subtract(6, 'days').toDate(), moment().toDate()],
        reservationClinicDate: [],
        clinicId: null,
        deptId: null,
        doctorName: '',
        medicalNo: '',
        patientName: '',
        mobile: '',
        subscribeStatus: null
      },

      clinicAllList: [], // 院区
      departmentAllList: [], // 科室
      stateList: DataDictHelper.queryDataDictWithKey(DATADICT_KEY.APP_SUBSCRIBE_STATUS) || [], // 状态下拉数据

      tableData: [],
      pagination: {},

      dialogVisible: false,
      imagesItem: {}
    }
  },
  computed: {
    ...mapState('appointment', ['patientId'])
  },
  mounted () {
    this.getBookingList({ patientId: this.patientId })
    this.setPatientId(null)
    // 院区
    this.getClinicAllList()
    // 科室
    this.getDepartmentAllList()
  },
  methods: {
    ...mapMutations('appointment', ['setPatientId']),
    getBookingList (params = {}) {
      getBookingList({ ...this.getFormatData(this.form), ...params }).then(res => {
        const { records, ...pagination } = res.data
        this.tableData = records
        this.pagination = pagination
      })
    },
    getClinicAllList () {
      getClinicAllList().then(res => {
        this.clinicAllList = res.data
      })
    },
    getDepartmentAllList () {
      getDepartmentAllList().then(res => {
        this.departmentAllList = res.data
      })
    },
    handlePreview (row) {
      this.dialogVisible = true
      this.imagesItem = row
    },
    handleSizeChange (val) {
      this.getBookingList({
        current: 1,
        size: val,
        ...this.getFormatData(this.form)
      })
    },
    handleCurrentChange (val) {
      this.getBookingList({
        current: val,
        size: this.pagination.size,
        ...this.getFormatData(this.form)
      })
    },
    onSubmit () {
      this.getBookingList({
        ...this.getFormatData(this.form)
      })
    },
    getFormatData () {
      const {
        reservationCreateDate: [createStartTime, createEndTime],
        reservationClinicDate: [startTime, endTime],
        ...others
      } = this.form
      return {
        ...removeEmptyValue(others),
        ...createStartTime ? {
          createStartTime: moment(createStartTime).format('YYYY-MM-DD'),
          createEndTime: moment(createEndTime).format('YYYY-MM-DD')
        } : null,
        ...startTime ? {
          startTime: moment(startTime).format('YYYY-MM-DD'),
          endTime: moment(endTime).format('YYYY-MM-DD')
        } : null
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.form.reservationCreateDate = []
    },
    onExport () {
      const queryString = formatedCommParams(this.getFormatData(this.form))
      open(getServerUrl('/app/subscribe/mgt/appt/export?' + queryString))
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 20px;
  background: #fff;
}
.table-header {
  font-size: 14px;
  font-variant: tabular-nums;
  color: rgba(#000, .65);
  position: relative;
  top: 1px;
  border: 1px solid #e8e8e8;
  padding: 16px;
  border-radius: 4px 4px 0 0;
}
.table {
  &::v-deep th {
    background: #fafafa;
  }
}
.el-select {
  width: 179px;
}
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
.a-btn {
  cursor: pointer;
}
.preview-dialog {
  img {
    display: block;
    margin-bottom: 10px;
  }
  a {
    cursor: pointer;
  }
}
</style>
