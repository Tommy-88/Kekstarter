<template>
  <main>
    <form v-on:submit="addNew">
      <button id="add">Добавить</button>
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
    } else {
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

  form {
    width: 100%;
    border-bottom: solid darkcyan 2px;
    display: flex;
    margin: 10px 0;
  }
  #add {
    background-color: rgb(187, 199, 199);
    margin-top:0.6%;
    margin-left: 0.5%;
    margin-right: 2%;
    height: 30px;
    width: 8%;
    min-width:80px;
    border-radius:10%;
    max-width: 14%;
    cursor: pointer;
    border:0.5px solid gray;
    border-bottom: 2px solid gray;
    border-top:1px solid gray;
  }
  #add.hover{
    background-color: aquamarine;
  }
  input {
    height: auto;
    margin: 10px;
  }

</style>
