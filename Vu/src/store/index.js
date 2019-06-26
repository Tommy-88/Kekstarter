import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    projects: [],
    activeUser: Object,
    activeProject: JSON
  },
  getters: {
    projects(state) {
      return state.projects
    },
    activeProject(state) {
      return state.activeProject
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
    }
  },
  actions: {
    addProj({commit}, proj) {
      axios.post('http://127.0.0.1:8000/api/v1/project/create', {
        name: proj.name,
        id_user: 2,
        targetAmount: proj.targetAmount,
        currentAmount: proj.currentAmount,
        description: proj.description,
        topic: proj.topic,
        telNumber: proj.telNumber
      }, {headers: {'Content-Type':'application/json', 'Authorization': 'e3248dd1bb493a5257b015b328feab70'}}).then( resp => {
          commit('ADD_PROJ', proj)
          alert('added')
        }
      ).catch(e => {
        alert(e)
      })
    },
    getProjs ({commit}, projs) {
     axios.get('http://127.0.0.1:8000/api/v1/show/projects').then(
       r=>r.data).then(projects => {
         commit('SET_PROJ', projects)
     }).catch( e =>{
       alert(e)
     })
    },
    async getActiveProj ({commit}, proj) {
      await axios.post('http://127.0.0.1:8000/api/v1/show/project', {
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
      axios.patch('http://127.0.0.1:8000/api/v1/project/status', {
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
