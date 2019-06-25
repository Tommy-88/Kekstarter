<template>
  <main>
    <form>
      <v-btn fab dark color="green" id="add" v-on:click="createNew">
        <v-icon dark class="material-icons">add</v-icon>
      </v-btn>
      <div><h2>Открыть новый сбор</h2></div>
    </form>
    <v-card dense flat class="feeCard" v-for="proj in items" :key="proj.title">
      <v-form>
        <v-layout row wrap v-on:click="toFee(proj)">
          <v-flex xs12 md6>
            <!--            <div class="left caption grey&#45;&#45;text">Название:</div>-->
            <div class="feeTitle">{{proj.title}}</div>
            <div class="feeTopic">
              <p class="caption grey--text">Тема:</p>
              <p class="caption black--text">{{proj.topicId}}</p></div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Прогресс: {{proj.currentAmount}}/{{proj.amount}}</div>
            <v-progress-linear
              :value="proj.currentAmount / proj.amount * 100"
            ></v-progress-linear>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Дата создания:</div>
            <div>{{new Date(+proj.createDate).toLocaleString()}}</div>
            <!--            <div class="caption grey&#45;&#45;text">{{formatDate(new Date(+proj.createDate))}}</div>-->
          </v-flex>
          <v-flex xs2 sm4 md2>
            <v-toolbar flat color="white">
              <v-toolbar-items>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon class="icons" v-on="on" v-on:click.stop="toEdit(proj)">edit</v-icon>
                  </template>
                  <span>Редактировать</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon class="icons" v-on="on" v-on:click.stop="toDelete(proj)">close</v-icon>
                  </template>
                  <span>Завершить</span>
                </v-tooltip>
              </v-toolbar-items>
            </v-toolbar>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card>
  </main>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        items: [],
        user: String,
        id: Number
      }
    },
    methods: {
      createNew: function () {
        this.$router.push('create')

      },
      toFee: function (item) {
        this.$router.push({name: 'fee', params: {userid: item.author, id: item.id}})
      },
      toEdit: function (item) {
        alert('You are going to edit ' + JSON.stringify(item))
      },
      toDelete: function (item) {
        alert('You are going to delete ' + JSON.stringify(item))
      }
    },
    mounted() {
      if (localStorage.getItem('projects')) {
        this.items = JSON.parse(localStorage.getItem('projects'))
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
    margin-left: 25px;
    margin-right: 20px;
    margin-bottom: 10px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    max-width: 15%;
    cursor: pointer;
  }
  .icons {
    margin: 10px;
  }

  input {
    height: auto;
    margin: 10px;
  }

  .feeTitle {
    font-size: x-large;
    padding-left: 20px;
    text-align: left;
  }

  .feeTopic {
    padding-left: 20px;
    text-align: left;
    display: flex;
  }

  .feeCard {
    margin-left: 20px;
    margin-right: 20px;
  }
</style>
