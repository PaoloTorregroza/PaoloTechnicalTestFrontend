<template>
  <div style="width: 100%; display: flex; flex-direction: column; justify-content: center">
    <h3 style="text-align: center; margin-top: 30vh">Select a project.</h3>
    <div class="projects-container">
      <router-link
          v-for="project in projects"
          :key="project.id"
          :to="'/dashboard/'+project.id"
          style="text-decoration: none; color: black"
      >
        <b-card

            style="width: 10rem; min-height: 140px; margin: 12px"
            class="mb-2 project-card-container"
        >
          <div class="project-card">
            <div class="project-icon" :style="iconStyle()">
              {{ project.name[0] }}
            </div>
            <b-card-text style="text-align: center; margin-top: 8px">
              {{ project.name }}
            </b-card-text>
          </div>
        </b-card>
      </router-link>

      <b-card class="mb-2 centered-card-button project-card-container">
        <b-button v-b-modal.new-project variant="outline-info" style="width: 6.6rem; height: 6.6rem">
          <b-icon icon="plus" aria-hidden="true"></b-icon>
        </b-button>

        <b-modal hide-footer hide-header-close id="new-project" centered title="Create a new project">
          <NewProjectDialog @createNewProject="createNewProject"/>
        </b-modal>
      </b-card>
    </div>

    <div class="logout">
      <b-icon-door-open @click="logout" style="width: 30px; height: 30px; cursor: pointer" variant="danger"></b-icon-door-open>
      Logout
    </div>
  </div>
</template>

<script>
import NewProjectDialog from "../components/NewProjectDialog";
import axios from "axios";
export default {
  name: 'SelectProject',
  components: {NewProjectDialog},
  data() {
    return {
      projects: [
      ],

      iconStyle: () => {
        return {backgroundColor: this.getRandomColor()}
      }
    }
  },

  async created() {
    await this.loadProjects()
  },

  methods: {
    getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },

    async loadProjects() {
      const id = this.$route.params.companyId
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      }

      try {
        const response = await axios.get(`${this.$apiUrl}/project/company/${id}`, config)
        this.projects = response.data.data
      } catch (e) {
        alert('Error getting projects')
      }
    },

    async createNewProject(name) {
      const id = this.$route.params.companyId
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      }

      try {
        await axios.post(`${this.$apiUrl}/project`, {company: {id: id}, name: name}, config)
        await this.loadProjects()
      } catch (e) {
        alert('Error creating project')
      }
    },

    logout() {
      localStorage.removeItem('token');
      this.$store.commit("logout");
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.projects-container {
  display: flex;
  align-items: start;
  justify-content: center;

  width: 100%;
  height: 100vh;
}

.project-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.project-card-container:hover {
  box-shadow: 0 8px 8px -4px lightblue;
}

.project-icon {
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-radius: 5px;
  border: 1px solid black;
  font-weight: bold;
  font-size: 1.5rem;
  color: white;
}

.centered-card-button {
  width: 10rem;
  min-height: 140px;
  margin: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logout {
  position: fixed;
  bottom: 30px;
  right: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>