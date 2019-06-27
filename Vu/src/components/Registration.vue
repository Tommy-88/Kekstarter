<template>
  <main>
    <form>
      <h2>Регистрация</h2>
      <v-layout align-center column>
        <v-text-field
        v-model="login"
        label='Login'
        type="login"
        required
        @input="$v.login.$touch()"
        @blur="$v.login.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="email"
          type="email"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          required
          ></v-text-field>
        <v-btn type="submit" color="blue" dark v-on:click="registerUser">Регистрация</v-btn>
      </v-layout>
    </form>
  </main>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "Registration",
      methods: {
          registerUser: function () {
            axios.post('http://95.179.136.92/api/v1/user/create', {
              email: this.email,
              name: this.login,
              password: this.password
            }).then( response => {
              this.$router.push('auth')
            }).catch( e => {
              alert(e)
            })
          }
      }
    }
</script>

<style scoped>

</style>
