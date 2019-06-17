<template>
  <main>
    <header-component :isAuthorized="true"></header-component>
    <form v-on:submit="addNew">
      <button id="add"></button>
      <input v-model="message" placeholder="message">
      <input v-model="needed" placeholder="How much to collect?">
    </form>
    <ul id="example-1">
      <h2>Мои сборы</h2>
      <li v-for="item in items" :key="item.id">
        <item-component :message="item.message" :collected="item.collected" :needed="item.needed"></item-component></li>
    </ul>
  </main>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      items: [
        {message: 'That is a collection 1', collected: 80.2, needed: 100},
        {message: 'Bar', collected: 12492.21, needed: 50000},
        {message: 'That is a collection 3 That is a collection 3 That is a collection 3 That is a collection 3 That is a collection 3 That is a collection 3 That is a collection 3 That is a collection 3 That is a collection 3', collected: 87123.62, needed: 200000}
      ]
    }
  },
  methods: {
    addNew: function () {
      this.items.push({
        message: this.message,
        collected: 0,
        needed: this.needed
      })
      this.message = ''
      this.needed = ''
    }
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
