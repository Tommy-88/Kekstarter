<template>
  <main>
    <h2>Вход</h2>
    <form  v-on:submit="authUser(login, password)">
      <input v-model="login" placeholder="Login">
      <input v-model="password" type="password" placeholder="Password">
      <button>Войти</button>
    </form>
  </main>
</template>

<script>
export default {
  name: 'LoginComponent',
  methods: {
    authUser: function (login, password) {
      if (login === 'admin' && password === 'admin') {
        var loggedUser = {userid: login, isLogged: true}
        const parsed = JSON.stringify(loggedUser)
        localStorage.setItem('loggedUser', parsed)
        this.$router.push({name: 'allFees', params: {userid: login}})
      }
      else {
        alert('Error')
      }
    }
  }
}
</script>

<style scoped>
  h2 {
    color: darkcyan;
  }
  input {
    border: solid grey 2px;
    height: 50px;
    border-radius: 20px;
    width: 250px;
    margin: 20px auto;
    display: block;
    font-size: 25px;
  }
  button {
    border: solid white 2px;
    background-color: dodgerblue;
    font-style: italic;
    font-size: medium;
    height: 45px;
    width: 140px;
    padding: 10px;
    margin: 20px;
    border-radius: 10px;
    color: white;
    cursor: pointer;
  }
</style>
