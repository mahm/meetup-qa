import Vue from 'vue'
import { app } from '~/plugins/firebase'

const db = app.firestore()
const groupsRef = db.collection('groups')

async function getComments (groupId, questionId) {
  return await groupsRef.doc(groupId).collection(`questions/${questionId}/comments`).get()
    .then((querySnapshot) => {
      let comments = []
      querySnapshot.forEach((doc) => {
        comments.push({ id: doc.id, ...doc.data() })
      })
      return comments
    })
}

export default {
  namespaced: true,
  unsubscribe: null,

  state () {
    return {
      groupId: null,
      data: []
    }
  },
  mutations: {
    init (state, payload) {
      state.groupId = payload.groupId
      state.data = payload.data
    },
    add (state, payload) {
      const index = state.data.findIndex(question => question.id === payload.id)
      if (index === -1) {
        state.data.push(payload)
      }
    },
    set (state, payload) {
      const index = state.data.findIndex(question => question.id === payload.id)
      if (index !== -1) {
        Vue.set(state.data, index, payload)
      }
    },
    remove (state, payload) {
      const index = state.data.findIndex(question => question.id === payload.id)
      if (index !== -1) {
        state.data.splice(index, 1)
      }
    }
  },
  getters: {
    data (state) {
      return state.data
    }
  },
  actions: {
    clear: ({ commit }, groupId) => {
      const payload = { groupId, data: [] }
      commit('init', payload)
    },
    startListener ({ commit }, groupId) {
      if (this.unsubscribe) {
        console.warn('questions/listener is running: ', this.unsubscribe)
        this.unsubscribe()
        this.unsubscribe = null
      }
      groupsRef.doc(groupId).collection('questions')
        .onSnapshot(querySnapshot => {
          querySnapshot.docChanges().forEach(async change => {
            const comments = await getComments(groupId, change.doc.id)
            const payload = {
              id: change.doc.id,
              body: change.doc.data().body,
              owner: change.doc.data().owner,
              createdAt: change.doc.data().createdAt,
              updatedAt: change.doc.data().updatedAt,
              comments: comments
            }
            if (change.type === 'added') {
              commit('add', payload)
            } else if (change.type === 'modified') {
              commit('set', payload)
            } else if (change.type === 'removed') {
              commit('remove', payload)
            }    
          })
        }, (e) => { console.error(e) })
    },
    stopListener () {
      if (this.unsubscribe) {
        console.warn('questions/listener is stopping: ', this.unsubscribe)
        this.unsubscribe()
        this.unsubscribe = null
      }
    },
    add ({ state, rootGetters }, payload) {
      const _payload = {
        title: payload.title,
        owner: rootGetters['user/ownerAttributes']
      }
      groupsRef.doc(state.groupId).collection('questions').add(_payload)
        .then(doc => {
          // nothing
        })
        .catch(e => console.log('questions/add error: ', e))
    },
    delete ({ state }, payload) {
      groupsRef.doc(state.groupId).collection('questions').doc(payload.id).delete()
        .then(() => {
          // nothing
        })
        .catch(e => console.log('questions/delete error: ', e))
    }
  }
}