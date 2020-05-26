import demo from '../../api/demo'
import { getField, updateField } from 'vuex-map-fields'
import { formatParams, getCommonParams } from '../../helpers'
import { APIS } from '../../helpers/constant'
import qs from 'qs'
import moment from 'moment'
import { Message } from 'element-ui'
import Vue from 'vue'
const defaultCondition = {
  episodeCode: '',
  patientCode: '',
  operName: '',
  applyName: '',
  opeApplyDateStart: '',
  opeApplyDateEnd: '',
  sendSmsStatus: '',
  readStatus: '',
  writeStatus: '',
  dateRange: null
}

const state = {
  pagination: {
    current: 1,
    size: 10,
    total: 0
  },
  list: [], // 列表
  condition: { ...defaultCondition } // 条件
}

// actions
const actions = {
  async queryList ({ commit, state }, params = {}) {
    params = formatParams({ ...state.condition, ...params })
    if (state.condition.dateRange && state.condition.dateRange.length) {
      params.opeApplyDateStart = moment(state.condition.dateRange[0]).startOf('day').valueOf()
      params.opeApplyDateEnd = moment(state.condition.dateRange[1]).endOf('day').valueOf()
    }
    try {
      const { pagination } = state
      const { data } = await demo.queryList({ size: pagination.size, current: pagination.current, ...params })
      const {
        records = [],
        current = 1,
        size = 10,
        total = 0
      } = data
      commit('setList', { list: records })
      commit('setPagination', {
        current,
        size,
        total
      })
    } catch (e) {}
  },
  async download ({ commit, state }, params = {}) {
    params = formatParams({ ...state.condition, ...params })
    params.opeApplyDateStart && (params.opeApplyDateStart = moment(params.opeApplyDateStart).valueOf())
    params.opeApplyDateEnd && (params.opeApplyDateEnd = moment(params.opeApplyDateEnd).valueOf())
    try {
      let queryStr = qs.stringify({ ...getCommonParams(), ...params })
      window.open(`${process.env.VUE_APP_BASE_URL}${APIS.ANESTHESIA_DOWNLOAD}?${queryStr}`)
    } catch (e) {}
  },
  async sendSms ({ commit, state }, params = {}) {
    params = formatParams({ ...state.condition, ...params })
    try {
      const { code, msg } = await demo.sendMessage({ ...params })
      if (code === 0) {
        Message({
          message: '发送成功',
          type: 'success'
        })
        return true
      } else {
        Message({
          message: msg,
          type: 'error'
        })
      }
    } catch (e) {
      return false
    }
  }
}

// getters
const getters = {
  getConditionField ({ condition }) {
    return getField(condition)
  }
}

// mutations
const mutations = {
  setList (state, { list }) {
    state.list = list
  },
  setPagination (state, pagination) {
    state.pagination = pagination
  },
  setCondition (state, { condition }) {
    state.condition = condition
  },
  resetCondition (state) {
    state.condition = { ...defaultCondition }
  },
  setConditionField (state, field) {
    // 注意：如果属性中未定义set的字段（field.path）即字段未绑定至视图DOM，视图不会刷新，需要调用Vue的set API监听属性改变渲染DOM
    state.condition[field.path] === undefined && Vue.set(state.condition, [field.path], field.value)
    updateField(state.condition, field)
  },
  resetState (state) {
    state.pagination = {
      current: 1,
      size: 10,
      total: 0
    }
    state.list = []
    state.condition = { ...defaultCondition }
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
