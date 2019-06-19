<template>
  <div class="list-item">
    <button id="delete" v-on:click="clearAll"></button>
    <div class="msg">
      <p> {{ this.message }}</p>
      </div>
    <div class="collected"  v-on:click="addOne">{{this.collected}} / {{this.needed}}</div>
    <circle-progress :fill="{color: '#008B8B'}" :progress="progressRate"
                     :size="100" :start-angle="-Math.PI/2" :show-percent="false" ref="unique">
    </circle-progress>
  </div>
</template>

<script>
export default {
  name: 'ItemComponent',
  props: {
    message: String,
    collected: Number,
    needed: Number,
    feeID: Number
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
