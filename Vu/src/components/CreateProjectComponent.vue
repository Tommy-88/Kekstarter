<template>
  <main>
    <form class="createPage">
        <v-flex xs6>
          <h2>Открытие нового сбора</h2>
          <v-text-field
            v-model="title"
            :rules="titleRules"
            label="Название"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            v-model="targetAmount"
            type="number"
            label="Необходимая сумма"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-select
            v-model="currentTopic"
            :items="topics"
            label="Тема"
            return-object="true"
          ></v-select>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            v-model="telNumber"
            :rules="telNumRules"
            label="Телефонный номер"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-textarea
            v-model="descr"
            label="Подробное описание"
            >
          </v-textarea>
        </v-flex>
        <v-flex xs6>
          <v-btn color="blue"
            v-on:click="createNewProject()" dark
          >Открыть сбор</v-btn>
        </v-flex>
    </form>
  </main>
</template>

<script>
export default {
  name: 'CreateProjectComponent',
  data: () => ({
    title: '',
    titleRules: [
      v => !!v || 'Title is required',
      v => v.length < 100 || 'Title should be shorter than 100 symbols'
    ],
    targetAmount: Number,
    telNumber: '',
    telNumRules: [
      v => !!v || 'Number is required',
      // eslint-disable-next-line no-mixed-operators
      v => v.length < 20 && !isNaN(+v) || 'Number must be valid'
    ],
    topics: [{id: 1, text: 'Science'}, {id: 2, text: 'IT'}, {id: 3, text: 'Entertainment'}, {id: 9, text: 'Other'}],
    currentTopic: {id: Number, text: String},
    descr: ''
  }),
  methods: {
    validate: function () {
      // for example
      return this.title.length > 4 && this.title.length < 100
    },
    createNewProject: function () {
      if (!this.validate()) return
      var newProject = {
        title: this.title,
        tel: this.telNumber,
        amount: this.targetAmount,
        topicId: this.currentTopic.id,
        description: this.descr,
        author: JSON.parse(localStorage.getItem('loggedUser')).userid,
        id: localStorage.getItem('currentId') ? localStorage.getItem('currentId') : 1
      }
      localStorage.setItem('currentId', newProject.id + 1)
      let projectList = []
      if (!localStorage.getItem('projects')) {
        projectList = []
      }
      else {
        projectList = JSON.parse(localStorage.getItem('projects'))
      }
      projectList.push(newProject)
      localStorage.setItem('projects', JSON.stringify(projectList))
      this.$router.push({name: 'allFees', params: {userid: this.$route.params.userid}})
    }
  }
}
</script>

<style scoped>
  .createPage {
    margin: 20px;
  }
</style>
