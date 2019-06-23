<template>
    <v-container>
      <v-layout align-center justify-center column >
        <v-flex title align-self-start>
            <v-layout column>
              <v-flex>
                Название
              </v-flex>
              <v-flex>
                <v-chip color="blue-grey lighten-4" small class="pl-auto">
                  <v-avatar class="teal">
                    <img src="https://randomuser.me/api/portraits/men/35.jpg">
                  </v-avatar>
                  {{ $route.params.userid }}
                </v-chip>
              </v-flex>
              
            </v-layout>
        </v-flex>

      </v-layout>
      <v-layout align-center>
        <v-flex grow pa-1>
        <v-progress-linear color="green lighten-2" v-model="valueDeterminate" class="mr-2"></v-progress-linear>

        </v-flex >
        <v-flex shrink pa-1> 40/100</v-flex>
      </v-layout>

      <v-layout>
        <v-card>
          <v-card-text>
            <p class="text-lg-left">
              Описание проекта. Описание проекта. Описание проекта. Описание проекта. Описание проекта. Описание проекта. Описание проекта. Описание проекта. Описание проекта. Описание проекта. Описание проекта. Описание проекта. Описание проекта. Описание проекта. Описание проекта. Описание проекта. Описание проекта. Описание проекта.         
          </p>
          </v-card-text>
        </v-card>
        
      </v-layout>

      <v-layout row justify-center>
        <DonateForm></DonateForm>
      </v-layout>
      
    </v-container>
</template>

<script>
import DonateForm from './DonateForm.vue'

export default {
  name: 'ItemComponent',
  data () {
    return {
      item: JSON,
      valueDeterminate: 40
    }
  },
  components:{
    DonateForm
  },
  computed: {
    progressRate: function () {
      return this.collected / this.needed * 100
    }
  },
  methods: {
    addOne: function () {
      this.collected++
      this.$refs.unique.updateProgress(this.collected / this.needed * 100)
    },
    clearAll: function () {
      this.$router.push({name: 'fee'})
    }
  }
}
</script>

<style scoped>
  .list-item {
    padding: 0;
    display: flex;
    width: 100%;
    position: relative;
  }
  div .collected{
    margin: auto 0;
    margin-left: auto;
    margin-right: 10px;
    display: inline-block;
    max-width: 19%;
    float: right;
  }
  div .msg{
    padding: 0;
    font-size: 20px;
    margin: auto 10px;
    float: left;
    display: inline-block;
    max-width: 60%;
    color: darkcyan;
  }
  #delete{
    margin: auto 0;
    vertical-align: center;
    background-image: url("../assets/images/delete.png");
    float: left;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    max-width: 15%;
  }
</style>
