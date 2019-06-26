import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    projects: [],
    activeUser: null,
    activeProject: JSON,
    token: localStorage.getItem('user-token') || '',
    status: '',
    hasLoadedOnce: false
  },
  getters: {
    projects(state) {
      return state.projects
    },
    activeProject(state) {
      return state.activeProject
    },
    projectsByTopic: state => topic => {
      return state.projects.filter(project => project.topic === topic)
    },
    projectsByUser: state => id_user => {
      return state.projects.filter(project => project.id_user.id === id_user)
    },
    activeProjects(state) {
      return state.projects.filter(project => project.isActive)
    },
    isAuthenticated: state => !!state.token,
    token(state) {
      return state.token
    }
  },
  mutations: {
    ADD_PROJ(state, proj) {
      state.projects.push(proj)
    },
    SET_PROJ(state, projs) {
      state.projects = projs
    },
    SET_USER(state, user) {
      state.activeUser = user
    },
    SET_ACTIVE_PROJ(state, proj) {
      state.activeProject = proj
    },
    CLOSE_PROJECT(state, proj) {
      state.projects[proj.id].isActive = !state.projects[proj.id].isActive
    },
    DEAUTH_USER(state) {
      state.activeUser = null
    },
    AUTH_REQUEST(state) {
      state.status = 'loading'
    },
    AUTH_SUCCESS(state, resp) {
      state.status = 'success'
      state.token = resp.token
      state.hasLoadedOnce = true
    },
    AUTH_ERROR(state) {
      state.status = 'error'
      state.hasLoadedOnce = true
    },
    AUTH_LOGOUT (state) {
      state.token = ''
    },
    USER_REQUEST(state) {
      state.status = 'loading'
    },
    USER_SUCCESS(state) {
      state.status = 'success'
      Vue.set(state, 'profile', resp)
    },
    USER_ERROR(state) {
      state.status = 'error'
    }
  },
  actions: {
    async setUser({commit, dispatch}, user) {
        commit('AUTH_REQUEST')
         await axios.post('http://95.179.136.92/api/v1/user/authorization', {
          email: user.login,
          password: user.password
        }).then(response => {
          const token = response.data[0].token
          localStorage.setItem('user-token', token)
          localStorage.setItem('user', response.data[0].id_user)
          axios.defaults.headers.common['Authorization'] = token
          commit('AUTH_SUCCESS', user)
          dispatch('USER_REQUEST')
        }).catch( e => {
          commit('AUTH_ERROR', e)
          localStorage.removeItem('user-token')
        })
    },
    deauthUser ({commit, dispatch}, token) {
      return new Promise((resolve, reject) => {
        axios.post('http://95.179.136.92/api/v1/user/deauthorization').then(response => {
          commit('AUTH_LOGOUT')
          alert('im here')
          localStorage.removeItem('user-token')
          resolve()
        }).catch(e => {
          alert(e)
        })
      })
    },
    addProj({commit}, proj) {
      axios.post('http://95.179.136.92/api/v1/project/create', {
        name: proj.name,
        id_user: 2,
        targetAmount: proj.targetAmount,
        currentAmount: proj.currentAmount,
        description: proj.description,
        topic: proj.topic,
        telNumber: proj.telNumber
      }, {headers: {'Content-Type':'application/json', 'Authorization': 'e3248dd1bb493a5257b015b328feab70'}}).then( resp => {
          commit('ADD_PROJ', proj)
        }
      ).catch(e => {
        alert(e)
      })
    },
    getProjs ({commit}, projs) {
     axios.get('http://95.179.136.92/api/v1/show/projects').then(
       r=>r.data).then(projects => {
         commit('SET_PROJ', projects)
     }).catch( e =>{
       alert(e)
     })
    },
    async getActiveProj ({commit}, proj) {
      await axios.post('http://95.179.136.92/api/v1/show/project', {
        id: proj.id
      }).then (r=>r.data).then( project => {
        commit('SET_ACTIVE_PROJ', project)
        console.log(project.name)
      }).catch(e=>{
        alert(e)
      })
    },
    closeProject ({commit}, proj) {
      const config = {
        headers: {
          'Content-Type':'application/json', 'Authorization': 'e3248dd1bb493a5257b015b328feab70'
        }
      }
      axios.patch('http://95.179.136.92/api/v1/project/status', {
          id: proj.id
        },
        config
      ).then(resp => {
        commit('CLOSE_PROJECT', proj)
      }).catch(e => {
        alert(e)
      })
    }
  }
})
