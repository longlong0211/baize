<template>
  <div class="login-wrap">
    <div class="login-form">
      <div class="logo">
        <img src='../assets/images/logo.png'/>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="name">
          <el-input type="text" autocomplete v-model="ruleForm.username" placeholder="请输入用户名，不超过30个字符"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入大于6位且小于16位的密码" v-model="ruleForm.password"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { sha256 } from 'js-sha256'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('app')
export default {
  name: 'index',
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.login({ username: this.ruleForm.username, password: sha256(this.ruleForm.password) })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="less">
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 700px;
    .login-form {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -180px 0 0 -180px;
      width: 360px;
      height: 360px;
      padding: 36px;
      box-shadow: 0 0 100px rgba(0, 0, 0, .08);
      border-radius: 8px;
      button {
        width: 100%;
      }

      p {
        color: rgb(204, 204, 204);
        text-align: center;
        margin-top: 16px;

        span {
          &:first-child {
            margin-right: 16px;
          }
        }
      }
    }

    .logo {
      text-align: center;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      margin-bottom: 45px;

      img {
        width: 100px;
        margin-right: 8px;
      }

      span {
        vertical-align: text-bottom;
        font-size: 16px;
        text-transform: uppercase;
        display: inline-block;
      }
    }
  }
</style>
