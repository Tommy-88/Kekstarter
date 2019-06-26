<template>
    <v-navigation-drawer
      v-model="drawer"
      app
      width=170px
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
        <div v-if="this.isAuthorized">
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
      drawer: true,
      items: [
        { title: 'Главная', icon: 'home', name: 'home', show: true },
      ],
      logged: [
        { title: 'Мои сборы', icon: 'dashboard', name: 'allFees', show: true},
        { title: 'Новый сбор', name: 'create'},
        { title: 'Выход', icon: 'power_setting_new'}
      ],
      unlogged: [
        { title: 'Вход', name: 'auth'},
        { title: 'Регистрация', name: 'register'}
      ],
      right: null
    }
  },
  computed: {
    isShown: function (item) {
      return item.show
    },
    isAuthorized () {
      return this.$store.getters.isAuthenticated
    },
    username () {
      return this.$store.getters.user
    }
  },
  methods: {
    logout: function () {
      alert(localStorage.getItem('user-token'))
     this.$store.dispatch('deauthUser', localStorage.getItem('user-token'))
      localStorage.clear()
      this.$router.push('/')
      document.location.reload()
    },
    moveTo: function (item) {
      if (item.title === 'Выход') {
        this.logout()
      } else if (item.title === 'Вход')
        this.$router.push('/auth')
      else if (item.title === 'Регистрация')
        this.$router.push('/register')
      else if (item.title === 'Главная')
        this.$router.push('/')
      else
        this.$router.push({name: item.name, params: {userid: localStorage.getItem('user')}})
    }
  }
}
</script>

<style scoped>

</style>
