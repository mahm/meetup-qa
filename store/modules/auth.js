import { auth, GoogleAuthProvider } from '~/plugins/firebase'

export default {
  namespaced: true,

  state () {
    return {
      data: {}
    }
  },
  mutations: {
    setAuth (state, payload) {
      state.data = payload
    }
  },
  getters: {
    data: (state) => {
      return state.data
    },
    isAuthenticated: (state) => {
      return Object.keys(state.data).length
    },
    ownerAttributes: (state) => {
      return {
        name: state.data.displayName,
        photoURL: state.data.photoURL
      }
    }
  },
  actions: {
    setAuth: ({ state, commit }, payload) => {
      commit('setAuth', payload)
    },
    signInWithGoogle: ({ commit }) => {
      return new Promise((resolve, reject) => {
        auth.signInWithRedirect(GoogleAuthProvider)
        resolve()
      })
    },
    signOut: ({ commit }) => {
      auth.signOut()
        .then(() => {
          commit('setAuth', null)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
