<template>
    <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="yellow accent-2" v-on="on">
              <v-icon left dark>
                payment
              </v-icon>
              Поддержать
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Выбрать способ оплаты</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-autocomplete
                      :items="['Сбербанк', 'QIWI', 'Яндекс.Деньги', 'VK Pay']"
                      label=""
                    ></v-autocomplete>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat v-on:click="dialog = false">Закрыть</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
</template>

<script>
export default {
  name: 'DonateForm',
  data: function(){
     return {
      dialog: false
     } 
  }
}
</script>
