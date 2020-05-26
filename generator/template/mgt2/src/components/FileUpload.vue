<template>
  <div>
    <el-upload
      :class="{ 'upload-control': true, 'hide-trigger': fileList.length >= limit }"
      list-type="picture-card"
      :disabled="disabled"
      :accept="computedAccept"
      :multiple="false"
      :limit="limit"
      :file-list="fileList"
      :data="extraOssData"
      :action="oss.host"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
    >
      <i class="el-icon-plus" />
      <div slot="file" slot-scope="{file}">
        <img v-if="isImageType" class="el-upload-list__item-thumbnail" :src="file.url" /><!-- 图片模式概览 -->
        <div v-else class="file-icon"><!-- 文件模式概览 -->
          <i class="el-icon-document" />
        </div>
        <span class="el-upload-list__item-actions">
          <!-- 预览按钮 -->
          <span class="el-upload-list__item-preview" @click="() => { onPreview(file) }">
            <i class="el-icon-view" />
          </span>
          <!-- 删除按钮 -->
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="onRemove(file)">
            <i class="el-icon-delete" />
          </span>
        </span>
      </div>
      <p slot="tip">提示：{{ imageTipTxt }}上传文件大小不能超过 {{ qualityLimit }}MB!</p>
    </el-upload>
    <el-dialog v-if="isImageType" :visible.sync="imageDialogVisible">
      <img width="100%" :src="activeImageUrl" />
    </el-dialog>
  </div>
</template>

<script>
import { MAXIMUM_FILE_UPLOAD_LIMIT } from '../helpers/constant'
import uploadMixin from '../mixins/upload'
export default {
  name: 'ImageUpload',
  model: {
    prop: 'value',
    event: 'change' // 事件名修改为change
  },
  props: {
    type: {
      type: String,
      required: true,
      default: 'image',
      validator (value) {
        return ['image', 'file'].indexOf(value) !== -1 // 必须是图片或者文件类型
      }
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    accept: {
      type: String,
      required: false,
      default: '*'
    },
    value: {
      type: String,
      required: false,
      default: ''
    },
    limit: {
      type: Number,
      required: false,
      default: 1
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 'auto'
    },
    qualityLimit: { // 文件上传限制
      type: Number,
      required: false,
      default: MAXIMUM_FILE_UPLOAD_LIMIT
    }
  },
  mixins: [ uploadMixin ],
  watch: {
    /*
    * 为了保证fileList改变时UI不抖动（抖动的原因是因为对象发生了改变）要保证已经在fileList里的file/类file对象不改变，只创建新的类file对象
    * */
    value (val) {
      const fileListFromStr = this.value ? Array.from(
        this.value.split(','),
        url => {
          const existFile = this.fileList.find(item => item.url === url)
          if (existFile) {
            return existFile
          }
          return {
            name: this.getFileName(url), // 文件名
            status: 'success',
            url
          }
        }
      ) : []
      this.fileList = fileListFromStr
    }
  },
  data () {
    return {
      activeImageUrl: '',
      activeFile: null, // 当前活动file
      fileList: []
    }
  },
  computed: {
    computedAccept () {
      if (this.type === 'image') {
        return '.jpg, .jpeg, .png'
      }
      return this.accept
    },
    isImageType () { // 是否图片模式
      return this.type === 'image'
    },
    imageTipTxt () {
      let txt = ''
      if (this.isImageType) {
        if (this.width !== 'auto') {
          txt += '宽=' + this.width + 'px '
        }
        if (this.height !== 'auto') {
          let hTxt = `高=${this.height}px`
          txt += txt ? `，${hTxt}` : hTxt
        }
        return txt ? '图片限制尺寸：' + `${txt}；` : ''
      }
      return ''
    },
    imageDialogVisible: {
      get () {
        return Boolean(this.activeImageUrl)
      },
      set (visibleStatus = false) {
        this.activeImageUrl = visibleStatus ? this.activeImageUrl : ''
      }
    },
    extraOssData () {
      if (!this.activeFile) {
        return {}
      }
      return this.fetchExtraOssData(this.activeFile.name)
    }
  },
  methods: {
    getFileName (str) {
      return str.substring(str.lastIndexOf('/') + 1)
    },
    onPreview (file) { // 预览
      if (!this.isImageType) {
        window.open(file.url)
        return
      }
      this.activeImageUrl = file.url
    },
    extractUrlStringFromFileList (fileList = []) {
      const urls = Array.from(fileList, file => file.url || '')
      return urls.join(',')
    },
    async onSuccess (response, file, fileList) { // 上传成功时，取回图片url
      const fileUrlOnOss = await this.getOssFileUrl({ key: this.extraOssData.key })
      file.url = fileUrlOnOss
      const urlString = this.extractUrlStringFromFileList(fileList)
      // console.log(203, urlString)
      this.fileList = fileList
      this.$emit('change', urlString)
    },
    onRemove (file) { // 删除文件时
      // console.log(208, file, this.fileList)
      const newFileList = this.fileList.filter(item => item.uid !== file.uid)
      this.fileList = newFileList
      const urlString = this.extractUrlStringFromFileList(newFileList)
      this.$emit('change', urlString)
    },
    checkImageQualitySize (file) { // 检查质量大小是否超过给定值
      return file.size < (this.qualityLimit * 1024 * 1024)
    },
    checkImagePxLimitPromise (file, width, height) { // 检查图片尺寸是否符合给定限制的Promise对象
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          const Img = new Image()
          Img.src = e.target.result
          Img.onload = () => {
            let wOk = width === 'auto' ? true : Img.width === width
            let hOk = height === 'auto' ? true : Img.height === height
            if (wOk && hOk) {
              resolve(true)
            } else {
              reject(new Error('图片尺寸不符合'))
              this.$message.error(`请上传图片尺寸宽：${this.width}px，高：${this.height}px的图片`)
            }
          }
        }
      })
    },
    async beforeUpload (file) {
      this.activeFile = file
      const isPassOssParams = await this.fetchOssParams() // OSS参数是否通过
      const isLtQualityLimit = this.checkImageQualitySize(file) // 是否小于指定的质量大小
      if (!isLtQualityLimit) {
        this.$message.error(`上传文件大小不能超过 ${this.qualityLimit}MB!`)
      }
      if (isPassOssParams && isLtQualityLimit) {
        // 这里一定要返回Promise，不能在这里catch，如果catch后控件捕获不到错误会认为校验通过
        if (this.isImageType) {
          return this.checkImagePxLimitPromise(file, this.width, this.height)
        }
        return true
      }
      return false
    }
  },
  mounted () {
    this.fetchOssParams()
  }
}
</script>

<style lang="less">
  .hide-trigger {
    .el-upload--picture-card {
      display: none;
    }
  }
  .upload-control {
    .file-icon {
      width: 100%;
      height: 100%;
      text-align: center;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-icon-document {
        font-size: 48px;
      }
    }
  }
</style>
