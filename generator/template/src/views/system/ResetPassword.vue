<template>
  <el-form class="form" ref="form" :model="form" :rules="rules" label-width="85px">
    <el-form-item label="账号:">
      <el-input :value="userInfo.userName" disabled></el-input>
    </el-form-item>
    <el-form-item label="角色:">
      <el-input :value="(userInfo.roleNames || []).join()" disabled></el-input>
    </el-form-item>
    <el-form-item prop="oldPassword" label="原密码:">
      <el-input v-model="form.oldPassword" show-password></el-input>
    </el-form-item>
    <el-form-item prop="newPassword" label="新密码:">
      <el-input v-model="form.newPassword" show-password></el-input>
    </el-form-item>
    <el-form-item prop="confirmNewPassword" label="确认密码:">
      <el-input v-model="form.confirmNewPassword" show-password></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">确认提交</el-button>
      <el-button type="primary" @click="$router.back()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { sha256 } from 'js-sha256'

export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('新密码不能为空!'))
      } else {
        if (this.form.confirmNewPassword !== '') {
          this.$refs.form.validateField('confirmNewPassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码!'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次密码必须输入一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        confirmNewPassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapActions('app', ['updatePwd']),
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return
        const { userName, roleNames } = this.userInfo
        const values = Object.entries(this.form)
          .reduce((obj, [key, value]) => {
            obj[key] = sha256(value)
            return obj
          }, {})
        const params = {
          userName,
          roleNames,
          ...values
        }
        console.log(1, params)
        this.updatePwd(params).then(res => res && this.$router.push('/login'))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -180px 0 0 -180px;
  width: 360px;
  height: 360px;
  padding: 36px;
  box-shadow: 0 0 100px rgba(0,0,0,.08);
  border-radius: 8px;
}
</style>
