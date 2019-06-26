<template>
  <main>
    <form @submit.prevent="authUser(login, password)">
      <v-layout align-center column fill-height>
        <h2>Вход</h2>
        <v-text-field
          v-model="login"
          label="Login"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>
        <v-btn type="submit" color="blue" dark>Войти</v-btn>
      </v-layout>
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
     this.$store.dispatch('setUser', { login, password })
      this.$router.push('/')
      document.location.reload()
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
