import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import store from './store'

import './plugins/element'
import './plugins/permission'
import './plugins/sanitizeHTML'
import './configs/debugger'

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
  console.log(process.env.VUE_APP_NAME, 'app bootstraped')
}

export async function mount (props) {
  // console.log(process.env.VUE_APP_NAME, 'props from main framework', props)
  render()
}

export async function unmount () {
  instance.$destroy()
  instance = null
  router = null
  createRouter.$router = null
}
