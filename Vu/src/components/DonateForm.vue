<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="yellow accent-2" v-on="on">
        <v-icon left dark>payment</v-icon>Поддержать
      </v-btn>
    </template>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card>
        <v-card-title>
          <span class="headline">Выберите способ оплаты:</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-select
                  v-model="select"
                  :items="['Сбербанк', 'QIWI', 'Яндекс.Деньги', 'VK Pay']"
                  :rules="[v => !!v || 'Необходимо выбрать способ оплаты']"
                  label="Способ оплаты"
                  required
                ></v-select>
              </v-flex>
            </v-layout>

            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="amount"
                  :rules="[v => !!v || 'Необходиммо ввести сумму']"
                  label="Сумма"
                  required
                  type="number"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="validateAndPay">Перейти на страницу оплаты</v-btn>
          <v-btn color="blue darken-1" flat v-on:click="dialog = false">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  name: "DonateForm",
  data: function() {
    return {
      dialog: false,
      valid: true,
      amount: "",
      select: ""
    };
  },
  methods: {
    validateAndPay() {
      if (!this.$refs.form.validate()) {
        this.snackbar = true;
        return;
      }
      let id_user = this.$route.params.userid;
      let id_project = this.$route.params.id;
      let payment = this.amount;
      let selectedPayment = this.select;
      let expirationTime = "2018-04-15T14:30:00+03:00";

      let postObject = {
        id_user,
        id_project,
        payment,
        expirationTime
      };

      alert("Чекай консоль");
      console.log(postObject);
    }
  }
};
</script>
