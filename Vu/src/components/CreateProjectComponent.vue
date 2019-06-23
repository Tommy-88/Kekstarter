<template>
  <main>
    <form>
      <h2>Create a new project</h2>
    </form>
    <form class="createPage">
        <v-flex xs6>
          <v-text-field
            v-model="title"
            :rules="titleRules"
            label="Title"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            v-model="targetAmount"
            type="number"
            label="Amount"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-select
            v-model="currentTopic"
            :items="topics"
            label="Select topic"
          ></v-select>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            v-model="telNumber"
            :rules="telNumRules"
            label="Number"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-textarea>
            v-model="descr"
            label="Description"
            placeholder="Description"
          </v-textarea>
        </v-flex>
        <v-flex xs6>
          <v-btn color="blue"
            v-on:click="createNewProject()"
          >Create</v-btn>
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
    targetAmount: 100,
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
        userid: localStorage.getItem('loggedUser')
      }
      alert('Title:' + newProject.title) // shows that project has created
      localStorage.setItem('currentProject', newProject)
    }
  }
}
</script>

<style scoped>
  .createPage {
    margin: 20px;
  }
</style>
