<template>
  <header>
    <div class="name" v-on:click="toHome">Kekstarterer</div>
    <button class="logout" v-if="authorized" v-on:click="logout">Выход</button>
    <div class="settings" v-if="authorized">Настройки</div>
    <div class="myFees" v-if="authorized" v-on:click="toFees">Мои сборы</div>
    <button class="register" v-if="!authorized">Регистрация</button>
    <button class="login" v-if="!authorized" v-on:click="login">Вход</button>
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
  .logout {
    border: solid red 2px;
    background-color: red;
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
  .login {
    border: solid white 2px;
    background-color: dodgerblue;
  }
  .register {
    border: solid white 2px;
    float: right;
    background-color: darkcyan;
  }

</style>
