<template>
  <div>
    <el-upload
      class="avatar-uploader"
      accept="image/png,image/jpg,image/jpeg"
      :action="oss.host"
      :data="uploadData"
      :disabled="!!value"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      v-on="$listeners"
      v-bind="$attrs"
    >
      <template v-if="value">
        <img :src="value" class="avatar">
        <span class="el-upload-list__item-actions">
          <span @click="handlePictureCardPreview(value)" >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span @click="handlePictureRemove" >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </template>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <el-dialog :visible.sync="dialogVisible"><img width="100%" :src="dialogImageUrl"></el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { random } from '../../../../helpers/string'

export default {
  props: ['value', 'limitWidth', 'limitHeight'],
  data () {
    return {
      uploadData: null,

      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    ...mapState('app', ['oss'])
  },
  mounted () {
    if (!this.oss.host) this.getOssParams()
  },
  methods: {
    ...mapActions('app', ['getOssParams']),
    handlePictureCardPreview (url) {
      this.dialogImageUrl = url
      this.dialogVisible = true
    },
    handlePictureRemove () {
      setTimeout(() => this.$emit('update:value', ''), 0)
    },
    handleAvatarSuccess (res, file) {
      this.$emit('update:value', URL.createObjectURL(file.raw))
    },
    async beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      let res
      if (this.limitWidth || this.limitHeight) {
        res = await new Promise((resolve, reject) => {
          const _URL = window.URL || window.webkitURL
          const img = new Image()
          img.onload = () => {
            if (this.limitWidth && img.width !== this.limitWidth) {
              this.$message.error(`请上传宽度为${this.limitWidth}px头像图片!`)
              return reject(false)
            }
            if (this.limitHeight && img.height !== this.limitHeight) {
              this.$message.error(`请上传高度为 ${this.limitHeight}px头像图片!`)
              return reject(false)
            }
            resolve(true)
          }
          img.src = _URL.createObjectURL(file)
        })
        if (!res) return false
      }

      await new Promise((resolve) => {
        this.uploadData = {
          ...this.oss.postParams,
          key: `${this.oss.directory}${random(18)}.${file.type.slice(6)}`
        }
        setTimeout(resolve, 0)
      })

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader ::v-deep .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-upload-list__item-actions {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  line-height: 178px;
  &:hover {
    background: rgba(#000, .2);
    span {
      color: #fff!important;
      display: inline-block;
    }
  }
  span {
    font-size: 20px;
    display: none;
    margin: 0 10px;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
