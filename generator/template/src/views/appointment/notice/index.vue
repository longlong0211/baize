<template>
  <div :style="{ backgroundColor: 'white', padding: 15 }">
    <el-form ref="form" class="form clear-fix" :model="form" :rules="rules" label-width="200px">
      <el-form-item label="启用放假公告:">
        <el-switch
          v-model="form.mainNoticeStatus"
          active-text="开"
          inactive-text="关">
        </el-switch>
      </el-form-item>
      <el-form-item prop="mainNoticeRemark" label="公告备注:">
        <el-input v-model="form.mainNoticeRemark" placeholder="请输入公告备注不超过200个字符"></el-input>
      </el-form-item>
      <el-form-item prop="mainNoticeImgCn" label="首页公告图片（中文）:">
        <z-upload :value.sync="form.mainNoticeImgCn" :limit-width="600"/>
      </el-form-item>
      <el-form-item prop="mainNoticeRemark" label="跳转链接(中文):">
        <el-input v-model="form.mainNoticeLocationCn" placeholder="请输入链接（仅支持嘉会官网链接或公众号文章链接)"></el-input>
      </el-form-item>
      <el-form-item prop="mainNoticeImgEn" label="首页公告图片:">
        <z-upload :value.sync="form.mainNoticeImgEn" :limit-width="600"/>
      </el-form-item>
      <el-form-item prop="mainNoticeRemark" label="跳转链接(英文):">
        <el-input v-model="form.mainNoticeLocationCn" placeholder="请输入链接（仅支持嘉会官网链接或公众号文章链接）"></el-input>
      </el-form-item>
      <el-form-item prop="date" label="首页公告显示日期:">
        <el-date-picker
          v-model="form.date"
          type="datetimerange"
          format="yyyy-MM-DD HH:mm"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
      </el-date-picker>
      </el-form-item>
      <el-form-item label-width="0px" style="textAlign: center">
        <el-button type="primary" @click="onSubmit('form')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import zUpload from './part/z-upload'

export default {
  components: {
    zUpload
  },
  data () {
    return {
      form: {},
      rules: {
        mainNoticeRemark: [{ max: 200, message: '请输入公告备注不超过200个字符', trigger: 'blur' }],
        mainNoticeImgCn: [{ required: true, message: '请上传首页公告图片（中文）', trigger: 'blur' }],
        mainNoticeImgEn: [{ required: true, message: '请上传首页公告图片(英文)', trigger: 'blur' }],
        mainNoticeLocationCn: [{ max: 500, message: '请输入链接（仅支持嘉会官网链接或公众号文章链接）', trigger: 'blur' }],
        mainNoticeLocationEn: [{ max: 500, message: '请输入链接（仅支持嘉会官网链接或公众号文章链接）', trigger: 'blur' }],
        date: [
          { required: true, message: '请选择首页公告显示日期', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getNotice().then(data => {
      const { startTime, endTime, ...others } = data
      this.form = {
        ...others,
        date: [startTime, endTime]
      }
    })
  },
  methods: {
    ...mapActions('appointment', ['getNotice', 'saveNotice']),
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return
        const { date: [startTime, endTime], ...others } = this.form
        this.saveNotice({
          ...others,
          startTime,
          endTime
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  max-width: 600px;
  overflow: auto;
}
</style>
