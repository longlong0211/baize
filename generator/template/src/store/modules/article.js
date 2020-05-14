/* eslint-disable no-empty */
import Vue from 'vue'
import * as article from '../../api/article'
import { getField, updateField } from 'vuex-map-fields'

const state = {
  loading: false,
  list: [], // 列表
  condition: {
    name: '',
    gender: '1'
  }, // 条件
  form: { // 表单
    type: [],
    json: ''
  }
}

// actions
const actions = {
  async queryList ({ commit }, params) {
    commit('setLoading', { loading: true })
    try {
      const { data } = await article.queryList(params)
      const { records = [] } = data
      commit('setList', { list: records })
    } catch (e) {}
    commit('setLoading', { loading: false })
  },
  async queryDetail ({ commit }) {
    commit('setLoading', { loading: true })
    setTimeout(() => {
      commit('setForm', {
        form: { // 表单
          name: '你好啊',
          region: 'beijing',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '线下场地免费',
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582845845476&di=49431b6d667592f4e6f1c7b129ee28fe&imgtype=0&src=http%3A%2F%2Ft8.baidu.com%2Fit%2Fu%3D3571592872%2C3353494284%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1200%26h%3D1290',
          desc: '描述描述描述描述描述描述描述描述',
          json: ''
        }
      })
      commit('setLoading', { loading: false })
    }, 1000)
  }
}

// getters
const getters = {
  getConditionField ({ condition }) {
    return getField(condition)
  },
  getFormField ({ form }) {
    return getField(form)
  }
}

// mutations
const mutations = {
  setList (state, { list }) {
    state.list = list
  },
  setLoading (state, { loading }) {
    state.loading = loading
  },
  setCondition (state, { condition }) {
    state.condition = condition
  },
  setForm (state, { form }) {
    state.form = form
  },
  setConditionField (state, field) {
    updateField(state.condition, field)
  },
  setFormField (state, field) {
    // 注意：如果属性中未定义set的字段（field.path）即字段未绑定至视图DOM，视图不会刷新，需要调用Vue的set API监听属性改变渲染DOM
    state.form[field.path] === undefined && Vue.set(state.form, [field.path], field.value)
    updateField(state.form, field)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
