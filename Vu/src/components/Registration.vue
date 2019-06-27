<template>
  <main>
    <form>
      <h2>Регистрация</h2>
      <v-layout align-center column>
        <v-text-field class="textField"
        v-model="login"
        :rules="loginRules"
        label='Login'
        type="login"
        required
        ></v-text-field>
<!--        @input="$v.login.$touch()"-->
<!--        @blur="$v.login.$touch()"-->
        <v-text-field class="textField"
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          type="email"
          required
        ></v-text-field>
        <v-text-field class="textField"
          v-model="password"
          :rules="pswdRules"
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
      data () {
          return {
            login: '',
            loginRules: [
              v => !!v || 'Это поле обязательно',
              v => v.length > 4 || 'Слишком короткий пароль',
              v => !!v.match(/'^[a-zA-Z][a-zA-Z0-9-_]{1,40}$'/) || 'Логин может содержать буквы, и цифры и символы \'_\', \'-\''
            ],
            email: '',
            emailRules: [
              v => !!v || 'Это поле обязательно',
              v => !!v.match(/.+@.+\..+/i) || 'Некорректный e-mail'
            ],
            password: '',
            pswdRules: [
              v => !!v || 'Это поле обязательно',
              v => v.length > 4 || 'Слишком короткий пароль'
            ],
          }
      },
      methods: {
          registerUser: function () {
            if (!this.$refs.form.validate()) return
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
  .textField {
    width: 300px;
  }
</style>
