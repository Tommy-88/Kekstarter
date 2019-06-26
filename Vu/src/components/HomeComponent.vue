<template>
    <main>
      <div class="about">
        <h2>{{this.$store.getters.token}}</h2>
        <FeesViewForm></FeesViewForm>
      </div>
    </main>
</template>

<script>
import FeesViewForm from "./FeesViewForm";
export default {
  name: 'HomeComponent',
  components: {FeesViewForm}
}
</script>

<style scoped>

</style>
