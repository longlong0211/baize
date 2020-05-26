/* eslint-disable no-empty */
import * as appApi from '../../api/appointment'

const state = {
  patientId: null
}

// actions
const actions = {
  async getNotice (...[, params]) {
    const response = await appApi.getNotice(params)
    return response.data
  },
  async saveNotice (...[, params]) {
    return appApi.saveNotice(params)
  }
}

// getters
const getters = {

}

// mutations
const mutations = {
  setPatientId (state, patientId) {
    state.patientId = patientId
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
