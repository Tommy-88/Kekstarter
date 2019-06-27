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
                  :rules="[v => !!v || 'Необходимо выбрать способ оплаты']"
                  return-object="true"
                  :items="payments"
                  label="Способ оплаты"
                  required
                ></v-select>
              </v-flex>
            </v-layout>
            <v-layout wrap v-if="select.id === '2'">
              <v-flex xs12>
                <v-select
                  v-model="selectType"
                  :rules="[v => !!v || 'Необходимо выбрать способ оплаты']"
                  return-object="true"
                  :items="types"
                  label="Чем хотите оплатить?"
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
  import axios from 'axios'
export default {
  name: "DonateForm",
  props: {
    activeProjectId: Number
  },
  data: function() {
    return {
      dialog: false,
      valid: true,
      amount: "",
      select: {id: '0', text: ''},
      payments: [{id: '1', text: 'QIWI'}, {id: '2', text: 'ЯндексДеньги'}, {id: '3', text: 'RFI'}],
      types: [{id: 'PC', text: 'Яндекс.Кошелек'}, {id: 'AC', text: 'Банковская карта'}],
      selectType: {id: 'AC', text: 'Банковская карта'}
    };
  },
  methods: {
    validateAndPay() {
      if (!this.$refs.form.validate()) {
        this.snackbar = true;
        return;
      }
      let id_user = Number(localStorage.getItem('user-id'))
      let id = this.activeProjectId ? this.activeProjectId : this.$route.params.id;
      let payment = Number(this.amount);
      let selectedPayment = this.select.id;

      axios.post('http://95.179.136.92/api/v1/payment/create' , {
        id_user: id_user,
        id_project: id,
        payment: payment,
        payment_type: selectedPayment,
        yandex_payment_type: this.selectType.id
      }, {
        headers: {
          'Authorization' : localStorage.getItem('user-token').toString()
        }
      }).then(response => {
        const str = JSON.stringify(response.data)
        var substr = str.split('\'')
        alert(substr[3])
        window.open(substr[3])
      }).catch(e => {
        alert(e)
      })
    }
  }
}
</script>
