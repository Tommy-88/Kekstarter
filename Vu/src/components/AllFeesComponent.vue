<template>
  <main>
    <form v-on:submit="addNew">
      <button id="add"></button>
      <input v-model="message" placeholder="message">
      <input v-model="needed" type="number" placeholder="How much to collect?">
    </form>
    <v-list>
      <v-subheader>Мои сборы</v-subheader>
      <template v-for="item in items">
        <v-divider></v-divider>
        <v-list-tile v-on:click="toFee(item)">
          <v-list-tile-content>
            <v-list-tile-title v-html="item.message"></v-list-tile-title>
            <v-list-tile-sub-title v-html="item.author"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </main>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      items: [],
      user: String,
      id: Number
    }
  },
  methods: {
    addNew: function () {
      this.items.push({
        message: this.message,
        collected: 0,
        needed: this.needed,
        author: this.user,
        id: ++this.id
      })
      const parsed = JSON.stringify(this.items)
      localStorage.setItem('items', parsed)
      this.message = ''
      this.needed = ''
    },
    toFee: function (item) {
      this.$router.push({name: 'fee', params: {userid: item.author, id: item.id}})
    }
  },
  mounted () {
    if (localStorage.getItem('items')) {
      this.items = JSON.parse(localStorage.getItem('items'))
      this.id = this.items.length
    }
    else {
      this.id = 0
    }
    this.user = JSON.parse(localStorage.getItem('loggedUser')).userid
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h2 {
    width: 70%;
    color: darkcyan;
  }
  ul {
    list-style-type: none;
  }
  li {
    width: 70%;
    padding: 0 10px;
    border: solid blue 3px;
    border-radius: 20px;
    margin: 10px 10px;
    margin-left: -30px;
  }
  form {
    width: 100%;
    border-bottom: solid darkcyan 2px;
    display: flex;
    margin: 10px 0;
  }
  #add {
    background-image: url("../assets/images/add.png");
    margin-left: 25px;
    margin-right: 20px;
    margin-bottom: 10px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    max-width: 15%;
    cursor: pointer;
  }
  input {
    height: auto;
    margin: 10px;
  }

</style>
