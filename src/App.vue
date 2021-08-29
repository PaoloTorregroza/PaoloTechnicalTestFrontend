<template>
  <div>
    <router-view class="main-view"></router-view>
  </div>
</template>

<script>
import {checkToken} from "./utils/CheckToken"

export default {
  name: 'App',
  async created() {
    const userData = await checkToken(this)

    if (this.$route.path === '/' && userData) {
      if (userData.data.company) {
        await this.$router.push('/projects/'+userData.data.company.id)
      } else {
        await this.$router.push('/companySelect')
      }
    }
  }
}
</script>

<style>
.main-view {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
}
</style>

/*
  Views

  - Home view where user can login/register
    - User can select a company if he does not have one
  - Property dashboard, you can select different projects
  - Project, you can see histories in a side panel and tasks on the other side.
  - Tickets history // Only if I have time at the end
*/