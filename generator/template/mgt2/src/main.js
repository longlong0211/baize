import Vue from 'vue'
import App from './App.vue'
import './configs/debugger'
import mixin from './mixins'
import './plugins/element'
import './plugins/sanitizeHTML'
import createRouter from './router'
import store from './store'

Vue.mixin(mixin)
Vue.config.productionTip = false

let instance = null
let router = null

function render () {
  router = createRouter()
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap () {
  // eslint-disable no-console
}

export async function mount (props) {
  // eslint-disable no-console
  render()
}

export async function unmount () {
  instance.$destroy()
  instance = null
  router = null
  createRouter.$router = null
}
