<template>
  <header>
    <div class="name">Kekstarterer</div>
    <button class="logout" v-if="this.isAuthorized" v-on:click="logout">Выход</button>
    <div class="settings" v-if="this.isAuthorized">Настройки</div>
    <div class="myFees" v-if="this.isAuthorized">Мои сборы</div>
    <button class="register" v-if="!this.isAuthorized">Регистрация</button>
    <button class="login" v-if="!this.isAuthorized" v-on:click="login">Вход</button>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    isAuthorized: Boolean
  },
  methods: {
    logout: function () {
      this.isAuthorized = false
    },
    login: function () {
      this.isAuthorized = true
    }
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
    cursor: default;
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
