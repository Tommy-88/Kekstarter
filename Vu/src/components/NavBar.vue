<template>
    <v-navigation-drawer
      v-model="drawer"
      app
      width=120%
      dark
      permanent
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Навигация</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click="moveTo(item)"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
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
      authorized: true,
      drawer: true,
      items: [
        { title: 'Главная', icon: 'home', name: 'home', show: true }
      ],
      logged: [
        {title: 'Мои сборы', icon: 'dashboard', name: 'allFees', show: true},
        {title: 'Новый сбор', name: 'create'},
        {title: 'Выход', icon: 'power_setting_new'}
      ],
      unlogged: [
        {title: 'Вход', name: 'auth'},
        {title: 'Регистрация', name: 'register'}
      ],
      right: null
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
      this.$router.push('/')
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
