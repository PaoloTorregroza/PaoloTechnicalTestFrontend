<template>
  <div class="selector-card">
    <b-card
        style="width: 80vw"
        body-class="text-center"
        title="Which company do you work for? "
        sub-title="Select one company or register a new one"
    >
      <div class="selector-container">
        <CompanySelector style="margin: 34px 0px; width: 100%" />

        <b-card-text>You can only select one company.</b-card-text>
      </div>
    </b-card>
  </div>
</template>

<script>
import CompanySelector from "../components/CompanySelector";
export default {
  name: 'SelectCompany',
  components: {CompanySelector}
}
</script>

<style scoped>
.selector-card {
  /*width: 80vw;*/
  margin-top: 10vh;
  height: auto;
  /*min-width: 500px;*/
}

.selector-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>