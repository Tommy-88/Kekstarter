<template>
  <main>
    <v-form class="list" ref="listForm">
      <v-list two-line>
        <template v-for="proj in projects">
          <v-divider></v-divider>
          <v-list-tile :key="proj.title" @click="">
            <v-toolbar flat color="white">
              <v-list-tile-content>
                <v-list-tile-title>{{proj.title}}</v-list-tile-title>
                <v-list-tile-sub-title>Автор: {{proj.author}}</v-list-tile-sub-title>
                <v-list-tile-sub-title>Тема: {{proj.topicId}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-btn>
                Поддержать
              </v-btn>
            </v-toolbar>
          </v-list-tile>
          <v-divider></v-divider>
        </template>
      </v-list>
    </v-form>
  </main>
</template>

<script>
  export default {
    name: "FeesViewForm",
    //components: {FeeListView},
    data() {
      return {
        projects: []
      }
    },
    methods: {},
    mounted() {
      this.projects = JSON.parse(localStorage.getItem('projects')).sort((a, b) => b.createDate - a.createDate)
    }
  }
</script>

<style scoped>
  .list {
    margin: 20px;
  }
</style>
