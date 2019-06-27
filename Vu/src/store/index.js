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
    projectById: state => id =>{
      return state.projects.find(project => project.id === id)
    },
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
      state.projects[proj.id].isActive = false
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
    },
    UPDATE_PROJ(state, proj) {
      state.projects[proj.id] = proj
    },
    OPEN_PROJECT(state, proj) {
      state.projects[proj.id].isActive = true
    }
  },
  actions: {
    async setUser({commit, dispatch}, user) {
        commit('AUTH_REQUEST')
         const response = await axios.post('http://95.179.136.92/api/v1/user/authorization', {
          email: user.login,
          password: user.password
        }).catch( e => {
          commit('AUTH_ERROR', e)
           alert(e)
          localStorage.removeItem('user-token')
        })
      const token = response.data[0].token
      localStorage.setItem('user-token', token)
      localStorage.setItem('user', response.data[0].id_user.name)
      localStorage.setItem('user-id', response.data[0].id_user.id)
      //axios.defaults.headers.common['Authorization'] = token
      commit('AUTH_SUCCESS', user)
      dispatch('USER_REQUEST')
    },
    deauthUser ({commit, dispatch}, token) {
        axios.post('http://95.179.136.92/api/v1/user/deauthorization', {},{
          headers: {'Authorization' : token.toString()}
        }).then(response => {
          commit('AUTH_LOGOUT')
          localStorage.removeItem('user-token')
        }).catch(e => {
          alert(e)
        })
    },
    addProj({commit}, proj) {
      axios.post('http://95.179.136.92/api/v1/project/create', {
        name: proj.name,
        id_user: Number(localStorage.getItem('user-id')),
        targetAmount: proj.targetAmount,
        currentAmount: proj.currentAmount,
        description: proj.description,
        topic: proj.topic,
        telNumber: proj.telNumber
      }, {headers: {'Content-Type':'application/json', 'Authorization': proj.token.toString()}}).then( resp => {
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
          'Content-Type':'application/json', 'Authorization': localStorage.getItem('user-token').toString()
        }
      }
      axios.patch('http://95.179.136.92/api/v1/project/status', {
          id: proj.id,
        isActive: false
        },
        config
      ).then(resp => {
        alert('starting')
        commit('CLOSE_PROJECT', proj)
        alert('finished')
      }).catch(e => {
        alert(e)
      })
    },
    openProject ({commit}, proj) {
      const config = {
        headers: {
          'Content-Type':'application/json', 'Authorization': localStorage.getItem('user-token').toString()
        }
      }
      axios.patch('http://95.179.136.92/api/v1/project/status', {
          id: proj.id,
        isActive: true
        },
        config
      ).then(resp => {
        commit('OPEN_PROJECT', proj)
      }).catch(e => {
        alert(e)
      })
    },
    updateProject({commit}, proj) {
      const config ={
        headers: {
          'Content-Type':'application/json', 'Authorization': localStorage.getItem('user-token').toString()
        }
      }
      axios.patch('http://95.179.136.92/api/v1/user/changeproject', {
        id: proj.id,
        telNumber: proj.telNumber,
        topic: proj.topic,
        description: proj.description,
        targetAmount: proj.targetAmount,
        name: proj.name,
        isActive: proj.isActive
      }, config).then(response => {
        commit('UPDATE_PROJ', proj)
      }).catch(e => {
        alert(e)
      })
    }
  }
})
