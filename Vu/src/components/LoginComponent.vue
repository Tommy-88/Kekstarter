<template>
  <main>
    <form>
      <div class="container-fluid">
      <v-layout align-center column fill-height>
      <div class="row justify-content-center">
      <div class="col-md-7 col-sm-7 col-lg-8 text-center">
        <h2>Вход</h2>
      </div>
        <div class="col-md-7 col-sm-7 col-lg-8 text-center">
        <v-text-field
          v-model="login"
          label="Login"
          required
        ></v-text-field>
        </div>
        <div class="col-md-7 col-sm-7 col-lg-8 text-center">
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>
        </div>
        <div class="col-md-7 col-sm-7 col-lg-8 text-center">
        <v-btn v-on:click="authUser(login, password)" color="blue" dark>Login</v-btn>
        </div>
      </div>
      </v-layout>
      </div>
    </form>
  </main>
</template>

<script>
export default {
  name: 'LoginComponent',
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    authUser: function (login, password) {
      if (login === 'admin' && password === 'admin') {
        var loggedUser = {userid: login, isLogged: true}
        const parsed = JSON.stringify(loggedUser)
        localStorage.setItem('loggedUser', parsed)
        this.$router.push({name: 'allFees', params: {userid: login}})
      } else {
        alert('Error')
      }
    }
  }
}
</script>

<style scoped>
  h2 {
    color: darkcyan;
    margin-top: 20px;
  }
</style>
