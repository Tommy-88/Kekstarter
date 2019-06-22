import Vue from 'vue'
import Router from 'vue-router'
import AllFeesComponent from '@/components/AllFeesComponent'
import CircleProgress from 'vue2-circle-progress'
import Fee from '@/components/Fee'
import NavBar from '@/components/NavBar'
import Home from '@/components/HomeComponent'
import Login from '@/components/LoginComponent'
import Header from '@/components/Header'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.component('navbar', NavBar)
Vue.component('home', Home)
Vue.component('app-header', Header)
Vue.use(Vuetify)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user/:userid/fees',
      name: 'allFees',
      component: AllFeesComponent
    },
    {
      path: '/user/:userid/fee/:id',
      name: 'fee',
      component: Fee
    },
    {
      path: '/auth',
      name: 'auth',
      component: Login
    }
  ]
}
)
