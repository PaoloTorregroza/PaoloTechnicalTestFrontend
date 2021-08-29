<template>
  <div>
    <div class="home-view">
      <h1>Fusepong Paolo's test</h1>
      <b-card body-class="text-center" header-tag="nav">
        <template #header>
          <b-nav card-header tabs>
            <b-nav-item
                :active="tab === 'login'"
                v-on:click="tab = 'login'">
              Login
            </b-nav-item>
            <b-nav-item
                :active="tab === 'register'"
                v-on:click="tab = 'register'">
              Register
            </b-nav-item>
          </b-nav>
        </template>

        <div v-if="tab === 'login'" class="home-card-container">
          <Login v-on:loginUser="onLogin" />
        </div>
        <div v-else-if="tab === 'register'" class="home-card-container">
          <Register v-on:registerUser="onRegister" />
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import Login from "../components/Login";
import Register from "../components/Register";
import axios from "axios";

export default {
  name: 'Home',
  data() {
    return {
      tab: 'login'
    }
  },
  components: {
    Register,
    Login
  },

  methods: {
    async onRegister(form) {
      const queryData = {
        ...form
      }

      try {
        await axios.post(`${this.$apiUrl}/auth/register`, queryData)
        this.tab = "login"
      } catch (e) {
        alert("Error: user already exists")
      }
    },

    async onLogin(form) {
      const queryData = {
        ...form
      }

      try {
        const response = await axios.post(`${this.$apiUrl}/auth/login`, queryData);
        localStorage.setItem('token', response.data.token)
        this.$store.commit('login', response.data.data)

        const user = response.data.data
        if (user.company) {
          await this.$router.push('/projects/'+user.company.id)
        } else {
          await this.$router.push('/companySelect')
        }
      } catch (e) {
        alert('Wrong email or password')
      }
    }
  }
}
</script>

<style scoped>
.home-view {
  width: 80vw;
  margin: 10vh 20vw;
  min-width: 500px;
}

.home-card-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>