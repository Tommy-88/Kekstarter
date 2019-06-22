<template>
  <v-card>
    <v-card-title primary-title>
      <div class="headline">Author</div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'ItemComponent',
  data () {
    return {
      item: JSON
    }
  },
  computed: {
    progressRate: function () {
      return this.collected / this.needed * 100
    }
  },
  methods: {
    addOne: function () {
      this.collected++
      this.$refs.unique.updateProgress(this.collected / this.needed * 100)
    },
    clearAll: function () {
      this.$router.push({name: 'fee'})
    }
  }
}
</script>

<style scoped>
  .list-item {
    padding: 0;
    display: flex;
    width: 100%;
    position: relative;
  }
  div .collected{
    margin: auto 0;
    margin-left: auto;
    margin-right: 10px;
    display: inline-block;
    max-width: 19%;
    float: right;
  }
  div .msg{
    padding: 0;
    font-size: 20px;
    margin: auto 10px;
    float: left;
    display: inline-block;
    max-width: 60%;
    color: darkcyan;
  }
  #delete{
    margin: auto 0;
    vertical-align: center;
    background-image: url("../assets/images/delete.png");
    float: left;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    max-width: 15%;
  }
</style>
