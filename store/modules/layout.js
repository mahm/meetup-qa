export default {
  namespaced: true,

  state () {
    return {
      header: true
    }
  },
  mutations: {
    setHeader (state, value) {
      state.header = value
    }
  },
  getters: {
    header (state) {
      return state.header
    }
  },
  actions: {
    setHeader ({ commit }, value) {
      commit('setHeader', value)
    }
  }
}
