<template>
    <main>
      <div class="about">
        <h2>Недавно открыте сборы</h2>
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
