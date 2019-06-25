<template>
  <header>
    <v-toolbar-side-icon class="icon" @click="isShown = !isShown"></v-toolbar-side-icon>
    <navbar v-if="isShown"></navbar>
    <div class="row justify-content-center">
       <div class="col-md-8 col-sm-12 col-lg-9">
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
    height: 58px;
    position: relative;
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
  .name1{
    height: 10px;
    width: 10px;
  }
  @media screen and (max-width: 800px) {
    header {
      height: 55px;
    }
    .name {
      font-size: 30px;
    }
  }

</style>
