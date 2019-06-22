<template>
    <v-form>
      <h2>Регистрация</h2>
      <v-layout align-center column>
        <v-text-field
        v-model="login"
        label='Login'
        required
        @input="$v.login.$touch()"
        @blur="$v.login.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          required
          ></v-text-field>
        <v-btn>Регистрация</v-btn>
      </v-layout>
    </v-form>
</template>

<script>
    export default {
        name: "Registration"
    }
</script>

<style scoped>

</style>
