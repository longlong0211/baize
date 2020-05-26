import Vue from 'vue'
import Storage from '../helpers/Storage'

const { LOCAL_KEY: { USER_OPERATIONS } } = require('../const')
const operations = Storage.local[USER_OPERATIONS]

Vue.use({
  install (Vue) {
    const vue = Vue
    Vue.directive('permission', function (el, binding) {
      if (
        binding.value === false ||
        (binding.value !== true && binding.value !== undefined && operations.indexOf(binding.value) === -1)
      ) {
        setTimeout(() => {
          el.comment = el.comment || document.createComment(`no permission of ${binding.value}`)
          el.parentElement && el.parentElement.replaceChild(el.comment, el)
        }, 0)
      } else {
        el.comment && el.comment.parentElement && el.comment.parentElement.replaceChild(el, el.comment)
      }
    })

    vue.prototype.permission = function (auth) {
      if (typeof auth === 'boolean') return auth
      if (!auth) return true
      return operations.indexOf(auth) !== -1
    }
  }
})
