
<template>
  <v-footer
    dark
    height="auto"
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="teal">
        <strong class="subheading">Свяжитесь с нами в социальных сетях!</strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-3"
          dark
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-actions class="grey darken-3 justify-center">
        &copy;2019 -<strong>KekStarter</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>
<script src="https://kit.fontawesome.com/99731cd8e6.js"></script>
<script>

  export default {
    data: () => ({
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-instagram'
      ]
    })
  }
</script>
<style scoped>
.subheading{
}
.teal{
    height: auto;
}
</style>