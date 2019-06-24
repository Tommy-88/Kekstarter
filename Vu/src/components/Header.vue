<template>
  <header>
    <v-toolbar-side-icon class="icon" @click="isShown = !isShown"></v-toolbar-side-icon>
    <navbar v-if="isShown"></navbar>
    <div class="name" v-on:click="toHome">Kekstarter</div>
    <v-icon large class="search_icon" @click="isSearch = !isSearch">search</v-icon>
    <search v-if="isSearch"></search>
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
        isShown: false,
        isSearch: false
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
  .search_icon{
    float: right;
    margin: 10px;
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
  @media screen and (max-width: 800px) {
    header {
      height: 60px;
    }
    .name {
      margin: 10px 40px;
      font-size: 22px;
    }
  }

</style>
