import { app } from '~/plugins/firebase'

const db = app.firestore()
const groupsRef = db.collection('groups')

export default {
  namespaced: true,

  state () {
    return {
      data: []
    }
  },
  mutations: {
    init (state, payload) {
      state.data = payload
    },
    add (state, payload) {
      state.data.push(payload)
    }
  },
  getters: {
    data (state) {
      return state.data
    },
    groupData (state) {
      return (groupId) => {
        return state.data.find((group) => { return group.id === groupId })
      }
    }
  },
  actions: {
    clear: ({ commit }) => {
      commit('init', [])
    },
    fetch: ({ commit }) => {
      groupsRef.orderBy('createdAt', 'desc').get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            commit('add', { id: doc.id, ...doc.data() })
          })
        })
    }
  }
}
