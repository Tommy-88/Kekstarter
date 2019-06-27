<template>
    <main>
      <div class="about">
        <h2 id="first">Недавно созданные проекты</h2>
        <FeesViewForm></FeesViewForm>
      </div>
    </main>
</template>

<script>
import FeesViewForm from './FeesViewForm'
export default {
  name: 'HomeComponent',
  components: {FeesViewForm}
}
</script>

<style scoped>

#first{
margin-top:1%;
}
</style>
