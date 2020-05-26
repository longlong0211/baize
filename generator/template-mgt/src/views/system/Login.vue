<template>
  <div class="set_min_height">
    <div class="form">
      <div class="logo"><img src="@/assets/logo.png"/></div>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名，不超过30个字符"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入大于6位且小于16位的密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="promptDown">
      <a style="color: #ccc" target="_blank" href="https://pc.qq.com/detail/1/detail_2661.html">
        请使用谷歌浏览器(Chrome)获取最佳用户体验
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { sha256 } from 'js-sha256'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'blur' },
          { max: 30, message: '长度在 30 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { max: 16, message: '长度在 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions('app', ['login']),
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return
        this
          .login({ ...this.form, password: sha256(this.form.password) })
          .then(res => {
            const redirect = this.$route.query.redirect
            res && this.$router.push(redirect || '/')
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.set_min_height{
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 700px;
}

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
  button {
    width: 100%;
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
  }
}

.promptDown{
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 40px;
  font-size: 12px;
  text-align: center;
  a {
    text-decoration: none;
  }
  &:hover a{
    text-decoration: underline;
  }
}
</style>
