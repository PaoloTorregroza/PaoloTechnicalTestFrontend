<template>
  <div class="dashboard-container">
    <HistoriesPanel
        @historySelected="historySelected"
        @taskCreated="loadAll"
        @newProperty="loadHistories"
        :projectId="$route.params.projectId"
        :histories="histories"
        :currentSelectedId="currentHistoryId"
        :users="users"
    />
    <TasksPanel @taskUpdated="loadAll" :tasks="tasks"/>
  </div>
</template>

<script>
import TasksPanel from '../components/Dashboard/TasksPanel'
import HistoriesPanel from '../components/Dashboard/HistoriesPanel'
import axios from "axios";

export default {
  name: 'ProjectDashboard',
  components: {HistoriesPanel, TasksPanel},

  data() {
    return {
      histories: [],
      tasks: [],
      users: [],
      currentHistoryId: null
    }
  },

  async created() {
    await this.loadAll()
    this.historySelected(this.histories[0].id)
  },

  methods: {

    async loadAll() {
      console.log('loading')
      // this.tasks = []
      await this.loadUsers()
      await this.loadHistories()
      if (this.currentHistoryId)
        this.historySelected(this.currentHistoryId)
    },

    async loadHistories() {
      const id = this.$route.params.projectId
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      }

      try {
        const response = await axios.get(`${this.$apiUrl}/history/project/${id}`, config)
        this.histories = response.data.data
      } catch (e) {
        alert('Error loading histories and tasks')
      }
    },

    async loadUsers() {
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      }

      try {
        const response = await axios.get(`${this.$apiUrl}/project/${this.$route.params.projectId}`, config)
        const companyId = response.data.company.id
        const usersResponse = await axios.get(`${this.$apiUrl}/user/company/${companyId}`, config)
        this.users = usersResponse.data
      } catch (e) {
        alert('Error loading company users')
      }
    },

    historySelected(id) {
      const currentHistory = this.histories.find(el => el.id === id)
      this.currentHistoryId = currentHistory.id
      this.tasks = currentHistory.tasks
    }
  }
}
</script>

<style>
.dashboard-container {
  display: grid;
  grid-template-columns: 25vw 75vw;
}

.dashboard-item {
  width: 100%;
  height: 100%;
}
</style>