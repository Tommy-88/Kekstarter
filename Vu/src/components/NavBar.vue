<template>
      <v-navigation-drawer
      v-model="drawer"
      app
      dark
      temporary
      width="220%"
      :mini-variant="mini"
    >
  <div v-if="this.authorized">
   <v-list class="pa-1">
          <v-list-tile v-if="mini" @click.stop="mini = !mini">
            <v-list-tile-action>
              <v-icon>chevron_right</v-icon>
            </v-list-tile-action>
          </v-list-tile>  
            <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img src= "https://cdn.vuetifyjs.com/images/lists/1.jpg">
            </v-list-tile-avatar>
           <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{ $route.params.userid }}</v-list-tile-title>
            </v-list-tile-content>
                <v-list-tile-action>
              <v-btn icon @click.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          </v-list-tile>
    </v-list>
  </div>
   <div v-else>
       <v-list class="pa-1">
          <v-list-tile v-if="mini" @click.stop="mini = !mini">
            <v-list-tile-action>
              <v-icon>chevron_right</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Менюха</v-list-tile-title>
            </v-list-tile-content>
                <v-list-tile-action>
              <v-btn icon @click.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          </v-list-tile>
    </v-list>
    </div>
      <v-list class="pa-2" dense>
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click="moveTo(item)"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        </v-list-tile>
        <v-divider></v-divider>
        <div v-if="this.authorized">
        <v-list-tile
          v-for="item in logged"
          :key="item.title" 
          @click="moveTo(item)">
          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
           <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
        </v-list-tile>
          <v-divider></v-divider>
        </div>
        <div v-else>
          <v-list-tile
            v-for="item in unlogged"
            :key="item.title"
            @click="moveTo(item)">
            <v-list-tile-content>
              <v-list-tile-title>{{item.title}}</v-list-tile-title>
            </v-list-tile-content>

             <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
          </v-list-tile>
        </div>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
  name: 'Header',
  props: {

  },
  data () {
    return {
      authorized: Boolean,
      drawer: true,
      items: [
        { title: 'Главная', icon: 'home', name: 'home', show: true }
      ],
      logged: [
        {title: 'Мои сборы', icon: 'dashboard', name: 'allFees', show: true},
        {title: 'Новый сбор', icon: 'widgets', name: 'create'},
        {title: 'Выход', icon: 'exit_to_app', name:'log_in'}
      ],
      unlogged: [
        {title: 'Вход', icon:'input',name: 'auth'},
        {title: 'Регистрация', icon: 'person_add', name: 'sign_in'}
      ],
      right: null,
      mini:false
    }
  },
  computed: {
    isShown: function (item) {
      return item.show
    }
  },
  methods: {
    logout: function () {
      this.$router.push('/')
      localStorage.clear()
      document.location.reload()
    },
    moveTo: function (item) {
      if (item.title === 'Выход') {
        this.logout()
      } else if (item.title === 'Вход') {
        this.$router.push('/auth')
      } else if (item.title === 'Регистрация') {
        this.$router.push('/register')
      } else if (item.title === 'Главная') {
        this.$router.push('/')
      } else {
        this.$router.push({name: item.name, params: {userid: JSON.parse(localStorage.getItem('loggedUser')).userid}})
      }
    },
    getAuthorized: function () {
      if (localStorage.getItem('loggedUser')) {
        this.authorized = JSON.parse(localStorage.getItem('loggedUser')).isLogged
      } else {
        this.authorized = false
      }
    }
  },
  mounted () {
    this.$router.afterEach((to, from, next) => {
      this.getAuthorized()
    })
    this.getAuthorized()
  }
}
</script>

<style scoped>

</style>
