<template>
  <main>
    <v-form class="createPage" ref="form" v-model="valid" lazy-validation>
        <v-flex xs6>
          <h2>{{headText}}</h2>
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
          >{{buttonText}}</v-btn>
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
    topics: [{id: 1, text: 'Наука'}, {id: 2, text: 'IT'}, {id: 3, text: 'Развлечения'}, {id: 4, text: 'Другое'}],
    currentTopic: {id: 0, text: ""},
    topicRules: [
      v => !(v.text === "") || 'Это поле обязательно'
    ],
    descr: '',
    buttonText: 'Открыть сбор',
    headText: 'Открытие нового сбора',
    justTopics: ['Наука', 'IT', 'Развлечения', 'Другое'],
    id: Boolean,
    isActive: Boolean
  }),
  methods: {
    createNewProject: function () {
      if (!this.$refs.form.validate()) return
      var newProject = {
        name: this.title,
        telNumber: this.telNumber,
        currentAmount: 0,
        targetAmount: this.targetAmount,
        topic: this.currentTopic.id,
        description: this.descr,
        isActive: this.isActive,
        id: this.id,
        id_user: localStorage.getItem('user-id').toString(),
        token: localStorage.getItem('user-token')
      }
      if (this.$route.name === 'create') {
        this.$store.dispatch('addProj', newProject)
      }
      else {
        this.$store.dispatch('updateProject', newProject)
      }
      this.$router.push({name: 'allFees', params: {userid: this.$route.params.userid}})
      document.location.reload()
    }
  },
  mounted() {
    if (this.$route.name === 'edit') {
      this.buttonText = 'Сохранить изменения'
      this.headText = 'Изменение информации о сборе'
      const item = this.$store.getters.projectById(this.$route.params.id)
      this.title = item.name
      this.telNumber = item.telNumber
      this.targetAmount = item.targetAmount
      this.currentTopic = this.topics[item.topic - 1]
      this.descr = item.description
      this.isActive = item.isActive
      this.id = item.id
    }
  }
}
</script>

<style scoped>
  .createPage {
    margin: 20px;
  }
</style>
