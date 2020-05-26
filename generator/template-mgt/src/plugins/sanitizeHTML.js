import Vue from 'vue'
import { sanitizeHTML, sanitizeHTMLPureTxt } from '../helpers'

const plugin = {
  install (Vue) {
    Vue.prototype.$sanitizeHTML = sanitizeHTML
    Vue.prototype.$sanitizeHTMLPureTxt = sanitizeHTMLPureTxt
  }
}

Vue.use(plugin)
