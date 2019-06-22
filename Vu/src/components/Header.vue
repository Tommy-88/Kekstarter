<template>
  <header>
    <div class="name" v-on:click="toHome">Kekstarter</div>
    <v-btn dark color="red" class="logout" v-if="authorized" v-on:click="logout">Выход</v-btn>
    <v-btn color="darkcyan" class="register" v-if="!authorized">Регистрация</v-btn>
    <v-btn color="blue" dark class="login" v-if="!authorized" v-on:click="login">Вход</v-btn>
  </header>
</template>

<script>
  export default {
    name: 'Header',
    props: {
    },
    data () {
      return {
        authorized: false
      }
    },
    methods: {
      logout: function () {
        localStorage.clear()
        if (this.$route.name === 'home') {
          document.location.reload()
        }
        this.$router.push('/')
      },
      login: function () {
        this.$router.push('/auth')
      },
      toHome: function () {
        this.$router.push({name: 'home'})
      },
      toFees: function () {
        var user = JSON.parse(localStorage.getItem('loggedUser'))
        const userid = user.userid
        this.$router.push({name: 'allFees', params: {userid: userid}})
      },
      getAuthorized: function () {
        if (localStorage.getItem('loggedUser')) {
          this.authorized = JSON.parse(localStorage.getItem('loggedUser')).isLogged
        }
        else {
          this.authorized = false
        }
      }
    },
    mounted() {
      this.$router.afterEach((to, from, next) => {
        this.getAuthorized()
      })
      this.getAuthorized()
    }
  }
</script>

<style scoped>
  header {
    background-color: darkcyan;
    height: 80px;
    margin: 0;
    padding: 0;
    position: relative;
    margin-bottom: 20px;
    padding-right: 40px;
  }
  button {
    font-style: italic;
    font-size: medium;
    height: 45px;
    width: 140px;
    padding: 10px;
    margin: 20px;
    float: right;
    border-radius: 10px;
    color: white;
    cursor: pointer;
  }
  div {
    display: inline-block;
    color: white;
    font-style: italic;
    cursor: pointer;
  }
  div .name {
    color: white;
    float: left;
    margin: 20px 80px;
    vertical-align: center;
    font-size: 28px;
    font-family: cursive;
  }
  div .myFees
  {
    color: white;
    float: right;
    padding: 10px;
    height: 20px;
    margin: 20px;
  }
  div .settings {
    padding: 10px;
    height: 20px;
    margin: 20px;
    float: right;
  }

</style>
