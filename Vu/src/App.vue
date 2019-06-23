<template>
  <v-app id="app">
    <v-content>
      <v-container fluid class="noMargin">
        <app-header></app-header>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer dark></v-footer>
  </v-app>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'App',
  components: {Header},
  data () {
    return {
      authorized: false
    }
  },
  methods: {
    getAuthorized: function () {
      if (localStorage.getItem('loggedUser')) {
        this.authorized = JSON.parse(localStorage.getItem('loggedUser')).isLogged
      } else {
        this.authorized = false
      }
    }
  }
}
</script>

<style>
  .noMargin {
    padding: 0;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
