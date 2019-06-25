import Vue from 'vue'
import Router from 'vue-router'
import AllFeesComponent from '@/components/AllFeesComponent'
import CircleProgress from 'vue2-circle-progress'
import Fee from '@/components/Fee'
import NavBar from '@/components/NavBar'
import Home from '@/components/HomeComponent'
import Login from '@/components/LoginComponent'
import Header from '@/components/Header'
import Registration from '@/components/Registration'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import CreateProjectComponent from '@/components/CreateProjectComponent'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import FeesViewForm from '@/components/FeesViewForm'

Vue.component('navbar', NavBar)
Vue.component('home', Home)
Vue.component('app-header', Header)
Vue.use(Vuetify, {
    iconfont: 'md'
})
Vue.use(Router)

export default new Router({
    routes: [{
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
        },
        {
            path: '/register',
            name: 'register',
            component: Registration
        },
        {
            path: '/user/:userid/create',
            name: 'create',
            component: CreateProjectComponent
        }
    ]
})