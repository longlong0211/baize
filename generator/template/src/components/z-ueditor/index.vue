<template>
  <vue-ueditor-wrap
    v-if="ueditorEnable"
    ref="ueditor"
    v-model="currentValue"
    :config="config"
    :destroy="true"
    :init="init"/>
</template>

<script>
// 参考 https://github.com/HaoChuan9421/vue-ueditor-wrap
import VueUeditorWrap from 'vue-ueditor-wrap'
import { mapState } from 'vuex'
import config from './ueditor.config'

export default {
  name: 'z-ueditor',
  components: {
    VueUeditorWrap
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      ueditorEnable: state => state.setting && state.setting.ueditor.enable
    })
  },
  data () {
    return {
      config,
      currentValue: ''
    }
  },
  watch: {
    // 对外提供 v-model
    value: {
      handler (val) {
        if (this.currentValue !== val) {
          this.currentValue = val
        }
      },
      immediate: true
    },
    // 对外提供 v-model
    currentValue (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    init () {
      // 注册一个测试按钮
    }
  }
}
</script>
