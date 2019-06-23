<template>
  <main>
    <form class="createPage">
      <div class="container">
        <div class="row justify-content-center">
        <div class="col-md-8 col-sm-9 col-lg-7">
          <h2>Открытие нового сбора</h2>
        </div>
        <div class="col-md-8 col-sm-9 col-lg-7">
          <v-text-field
            v-model="title"
            :rules="titleRules"
            label="Название"
            required
          ></v-text-field>
        </div>
        <div class="col-md-8 col-sm-9 col-lg-7">
          <v-text-field
            v-model="targetAmount"
            type="number"
            label="Необходимая сумма"
            required
          ></v-text-field>
        </div>
        <div class="col-md-8 col-sm-9 col-lg-7">
          <v-select
            v-model="currentTopic"
            :items="topics"
            label="Тема"
          ></v-select>
        </div>
        <div class="col-md-8 col-sm-9 col-lg-7">
          <v-text-field
            v-model="telNumber"
            :rules="telNumRules"
            label="Телефонный номер"
            required
          ></v-text-field>
        </div>
        <div class="col-md-8 col-sm-9 col-lg-7">
          <v-textarea
            v-model="descr"
            label="Подробное описание"
            >
          </v-textarea>
        </div>
        <div class="col-md-8 col-sm-9 col-lg-7">
          <v-btn color="blue"
            v-on:click="createNewProject()" dark
          >Открыть сбор</v-btn>
        </div>
        </div>
      </div>
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
    topics: ['Science', 'IT', 'Entertainment', 'Other'],
    currentTopic: '',
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
        topic: this.currentTopic,
        description: this.descr,
        author: JSON.parse(localStorage.getItem('loggedUser')).userid,
        id: localStorage.getItem('currentId') ? localStorage.getItem('currentId') : 1
      }
      localStorage.setItem('currentId', newProject.id + 1)
      let projectList = []
      if (!localStorage.getItem('projects')) {
        projectList = []
      } else {
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
