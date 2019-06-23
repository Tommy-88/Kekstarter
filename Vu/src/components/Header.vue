<template>
  <header>
    <v-toolbar-side-icon class="icon" @click="isShown = !isShown"></v-toolbar-side-icon>
    <navbar v-if="isShown"></navbar>
    <div class="row justify-content-center">
       <div class="col-8">
    <div class="name" v-on:click="toHome">KekStarter</div>
    </div>
    </div>
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
    margin-top:0.6%;
    font-size: 30px;
    font-family: monospace;
    cursor: pointer;
    font-style: italic;
    display: inline-block;
  }

</style>
