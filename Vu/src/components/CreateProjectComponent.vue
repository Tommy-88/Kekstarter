<template>
  <main>
    <v-form class="createPage" ref="form" v-model="valid" lazy-validation>
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
            :rules="amountRules"
            type="number"
            label="Необходимая сумма"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-select
            v-model="currentTopic"
            :rules="topicRules"
            return-object="true"
            :items="topics"
            label="Тема"
            required
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
            @click="createNewProject()" dark
                 :disabled="!valid"
          >Открыть сбор</v-btn>
        </v-flex>
    </v-form>
  </main>
</template>

<script>
export default {
  name: 'CreateProjectComponent',
  data: () => ({
    valid: false,
    title: '',
    titleRules: [
      v => !!v || 'Это поле обязательно',
      v => v.length > 4 || 'Название должно быть длиннее 4 символов',
      v => v.length < 100 || 'Название должно быть короче 100 символов'
    ],
    targetAmount: Number,
    amountRules: [
      v => v > 0 || 'Это поле обязательно'
    ],
    telNumber: '',
    telNumRules: [
      v => !!v || 'Это поле обязательно',
      // eslint-disable-next-line no-mixed-operators
      v => v.length < 20 && !isNaN(+v) || 'Некорректный номер'
    ],
    topics: [{id: 1, text: 'Science'}, {id: 2, text: 'IT'}, {id: 3, text: 'Entertainment'}, {id: 9, text: 'Other'}],
    currentTopic: {id: 0, text: ""},
    topicRules: [
      v => !(v.text === "") || 'Это поле обязательно'
    ],
    descr: ''
  }),
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
      return this.valid
    },
    createNewProject: function () {
      if (!this.$refs.form.validate()) return
      var newProject = {
        title: this.title,
        tel: this.telNumber,
        createDate: Date.now(),
        currentAmount: 0,
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
