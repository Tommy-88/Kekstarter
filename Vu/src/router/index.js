import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
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
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
