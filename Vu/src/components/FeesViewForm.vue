<template>
  <main>
    <v-form ref="listForm" class="my-5">
      <v-card flat class="feeCard" v-for="proj in projects" :key="proj.name">
        <v-form>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12 md6 v-on:click="toFee(proj)">
              <!--            <div class="left caption grey&#45;&#45;text">Название:</div>-->
              <div class="feeTitle">{{proj.name}}</div>
              <div class="feeTopic">
                <p class="caption grey--text">Тема:</p>
                <p class="caption black--text">{{proj.topic}}</p></div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Автор:</div>
              <div>{{proj.id_user.name}}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Дата создания:</div>
              <div>{{new Date(+proj.date).toLocaleString()}}</div>
              <div class="caption grey--text">{{formatDate(new Date(+proj.date))}}</div>
            </v-flex>
            <v-flex xs2 sm4 md2>
              <v-btn color="yellow accent-2" v-on="on">
                <v-icon left dark>payment</v-icon>
                Поддержать
              </v-btn>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
        </v-form>
      </v-card>
    </v-form>
  </main>
</template>

<script>

  export default {
    name: "FeesViewForm",
    data() {
      return {
        formatDate: function formatDate(date) {
          const diff = new Date() - date;
          if (diff < 1000)
            return 'только что';
          const sec = Math.floor(diff / 1000);
          if (sec < 60)
            return sec + ' сек. назад';
          const min = Math.floor(diff / 60000);
          if (min < 60)
            return min + ' мин. назад';
          let d = date;
          d = [
            '0' + d.getDate(),
            '0' + (d.getMonth() + 1),
            '' + d.getFullYear(),
            '0' + d.getHours(),
            '0' + d.getMinutes()
          ];
          for (let i = 0; i < d.length; i++)
            d[i] = d[i].slice(-2);
          return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
        }
      }
    },
    methods: {
      toFee: function (item) {
        this.$store.dispatch('getActiveProj', item)
        this.$router.push({name: 'fee', params: {userid: item.id_user.name, id: item.id}})
      }
    },
    computed: {
      projects() {
        return this.$store.getters.projects
      }
    }
  }
</script>

<style scoped>
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
