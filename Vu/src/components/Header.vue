<template>
  <header>
    <v-toolbar-side-icon class="icon" @click="isShown = !isShown"></v-toolbar-side-icon>
    <navbar v-if="isShown"></navbar>
    <div class="name" v-on:click="toHome">Kekstarter</div>
  </header>
</template>

<script>
  export default {
    name: 'Header',
    props: {
    },
    data () {
      return {
        authorized: false,
        isShown: false
      }
    },
    methods: {
      toHome: function () {
        this.$router.push('/')
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
    margin-bottom: 20px;
    padding-right: 40px;
  }
  .icon {
    float: left;
  }
  .name {
    color: white;
    float: left;
    margin: 20px 80px;
    vertical-align: center;
    font-size: 28px;
    font-family: cursive;
    cursor: pointer;
    font-style: italic;
    display: inline-block;
    width: 150px
  }

</style>
