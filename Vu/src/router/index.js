import Vue from 'vue'
import Router from 'vue-router'
import AllFeesComponent from '@/components/AllFeesComponent'
import CircleProgress from 'vue2-circle-progress'
import ItemComponent from '@/components/ItemComponent'
import HeaderComponent from '@/components/HeaderComponent'
import Home from '@/components/HomeComponent'
import Login from '@/components/LoginComponent'

Vue.component('item-component', ItemComponent)
Vue.component('circle-progress', CircleProgress)
Vue.component('header-component', HeaderComponent)
Vue.component('home', Home)
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
      component: ItemComponent
    },
    {
      path: '/auth',
      name: 'auth',
      component: Login
    }
  ]
}
)
