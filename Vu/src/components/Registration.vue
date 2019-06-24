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
        <v-btn type="submit" color="blue" dark>Регистрация</v-btn>
      </v-layout>
    </form>
  </main>
</template>

<script>
    export default {
        name: "Registration"
    }
</script>

<style scoped>

</style>
