import Vue from 'vue'
import Router from 'vue-router'
import AllFeesComponent from '@/components/AllFeesComponent'
import CircleProgress from 'vue2-circle-progress'
import ItemComponent from '@/components/ItemComponent'
import HeaderComponent from '@/components/HeaderComponent'

Vue.component('item-component', ItemComponent)
Vue.component('circle-progress', CircleProgress)
Vue.component('header-component', HeaderComponent)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'All Fees',
      component: AllFeesComponent
    }
  ]
}
)
