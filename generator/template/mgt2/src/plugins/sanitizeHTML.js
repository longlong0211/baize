import Vue from 'vue'
import { sanitizeHTML, sanitizeHTMLPureTxt } from '../helpers'

const plugin = {
  install (Vue, option) {
    Vue.prototype.$sanitizeHTML = sanitizeHTML
    Vue.prototype.$sanitizeHTMLPureTxt = sanitizeHTMLPureTxt
  }
}

Vue.use(plugin)
