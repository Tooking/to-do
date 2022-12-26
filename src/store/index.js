import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    tasks: []
  },
  getters: {
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setTasksList (state, payload) {
      state.tasks = payload
    }
  },
  actions: {
    getTasks ({ commit }) {
      commit('setLoading', true)
      axios.get('/posts').then(({ data }) => {
        commit('setTasksList', data)
        commit('setLoading', false)
      })
    },
    createTask ({ commit, dispatch }, payload) {
      commit('setLoading', true)
      axios.post('/posts', payload)
        .then(() => {
          dispatch('getTasks')
        })
        .catch(err => {
          console.log(err)
          commit('setLoading', false)
        })
    },
    updateTask ({ commit, dispatch }, { id, payload }) {
      commit('setLoading', true)
      axios.put(`/posts/${id}`, payload)
        .then(() => {
          dispatch('getTasks')
        })
        .catch(err => {
          console.log(err)
          commit('setLoading', false)
        })
    },
    deleteTask ({ commit, dispatch }, id) {
      commit('setLoading', true)
      axios.delete(`/posts/${id}`)
        .then(() => {
          dispatch('getTasks')
        })
        .catch(err => {
          console.log(err)
          commit('setLoading', false)
        })
    }
  }
})
