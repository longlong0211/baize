<template>
  <div class="page">
    <el-form inline :model="form" class="demo-form-inline" label-width="100px">
      <el-form-item label="登录手机:">
        <el-input v-model="form.loginPhone" placeholder="请输入登录手机"></el-input>
      </el-form-item>
      <el-form-item label="就诊人姓名:">
        <el-input v-model="form.fullName" placeholder="请输入就诊人姓名"></el-input>
      </el-form-item>
      <el-form-item label="证件号码:">
        <el-input v-model="form.credentialsNumber" placeholder="请输入证件号码"></el-input>
      </el-form-item>
      <el-form-item label="手机号码:">
        <el-input v-model="form.phone" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="table-header">用户列表（共 {{pagination.total}} 条记录）</div>
    <el-table
      class="table"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column prop="loginPhone" label="登录手机" align="center" width="100"></el-table-column>
      <el-table-column prop="fullName" align="center" label="就诊人姓名"></el-table-column>
      <el-table-column prop="credentialsName" align="center" label="证件类型"></el-table-column>
      <el-table-column prop="credentialsNumber" align="center" label="证件号码"></el-table-column>
      <el-table-column prop="gender" label="性别" align="center" width="50"></el-table-column>
      <el-table-column prop="birthDate" label="出生日期" align="center"></el-table-column>
      <el-table-column prop="mobile" label="手机号码" align="center"></el-table-column>
      <el-table-column prop="patientCode" label="病历号" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="80">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="operation(scope.row)">查看预约</el-button>
        </template>
      </el-table-column>
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
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getUserList } from '../../../api/appointment'
import { removeEmptyValue } from '../../../utils'

export default {
  data () {
    return {
      form: {
        loginPhone: '',
        fullName: '',
        credentialsNumber: '',
        phone: ''
      },
      tableData: [],
      pagination: {}
    }
  },
  mounted () {
    this.getUserList()
  },
  methods: {
    ...mapMutations('appointment', ['setPatientId']),
    getUserList (params = {}) {
      getUserList(params).then(res => {
        const { records, ...pagination } = res.data
        this.tableData = records
        this.pagination = pagination
      })
    },
    operation (row) {
      this.$router.push('/appointment/appt_manage')
      this.setPatientId(row.id)
    },
    handleSizeChange (val) {
      this.getUserList({
        current: 1,
        size: val,
        ...removeEmptyValue(this.form)
      })
    },
    handleCurrentChange (val) {
      this.getUserList({
        current: val,
        size: this.pagination.size,
        ...removeEmptyValue(this.form)
      })
    },
    onSubmit () {
      this.getUserList({
        ...removeEmptyValue(this.form)
      })
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
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
