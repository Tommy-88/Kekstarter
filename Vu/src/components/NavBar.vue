<template>
    <v-navigation-drawer
      v-model="drawer"
      app
      width=170px
      dark
      permanent
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Навигация</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click="moveTo(item)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Header',
  props: {
  },
  data () {
    return {
      drawer: true,
      items: [
        { title: 'Главная', icon: 'home', name: 'home' },
        { title: 'Мои сборы', icon: 'dashboard', name: 'allFees'}
      ],
      right: null
    }
  },
  methods: {
    moveTo: function (item) {
      this.$router.push({name: item.name, params: {userid: JSON.parse(localStorage.getItem('loggedUser')).userid }})
    }
  }
}
</script>

<style scoped>

</style>
