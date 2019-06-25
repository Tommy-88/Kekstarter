<template>
    <v-form>
      <div class="container-fluid">
      <div class="row justify-content-center">
      <h2>Регистрация</h2>
      </div>
      <v-layout align-center column>
        <div class="row justify-content-center">
        <div class="col-md-7 col-sm-7 col-lg-8 text-center">
        <v-text-field
        v-model="login"
        label='Login'
        type="login"
        required
        @input="$v.login.$touch()"
        @blur="$v.login.$touch()"
        ></v-text-field>
        </div>
        <div class="col-md-7 col-sm-7 col-lg-8 text-center">
        <v-text-field
          v-model="email"
          label="email"
          type="email"
          required
        ></v-text-field>
        </div>
        <div class="col-md-7 col-sm-7 col-lg-8 text-center">
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          required
          ></v-text-field>
        </div>
        <div class="col-md-7 col-sm-7 col-lg-8 text-center">
         <v-btn type="submit" color="blue" dark>Регистрация</v-btn>
        </div>
        </div>
      </v-layout>
      </div>
    </v-form>
</template>

<script>
export default {
  name: 'Registration'
}
</script>

<style scoped>

</style>
