<template>
  <div class="dashboard-item histories-container">
    <h3>User Histories</h3>
    <HistoryCard
        @historySelected="historySelected"
        @taskCreated="$emit('taskCreated')"
        v-for="history in histories"
        :key="history.id"
        :history="history"
        :selected="currentSelectedId === history.id"
        :users="users"
    />
    <b-card>
      <b-button v-b-modal.new-history variant="outline-info" style="width: 100%">
        <b-icon icon="plus" aria-hidden="true"></b-icon>
      </b-button>
    </b-card>

    <b-modal hide-footer hide-header-close id="new-history" centered title="Register a new history.">
      <NewHistory @newHistory="createNewHistory" />
    </b-modal>
  </div>
</template>

<script>
import HistoryCard from "./DashboardItems/HistoryCard";
import NewHistory from "./DashboardItems/NewHistory";
import axios from "axios";
export default {
  name: 'HistoriesPanel',
  components: {NewHistory, HistoryCard},

  props: {
    histories: Array,
    projectId: String,
    currentSelectedId: Number,
    users: Array
  },

  methods: {
    historySelected(id) {
      this.$emit('historySelected', id)
    },

    async createNewHistory(description) {
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      }

      try {
        await axios.post(
            `${this.$apiUrl}/history`,
            {description: description, project: {id: parseInt(this.projectId)}},
            config
        )
        this.$emit('newProperty')
      } catch (e) {
        alert('Error creating a new history')
      }
    }
  }
}
</script>

<style scoped>
.histories-container {
  background-color: lightgray;
  padding: 12px;
}
</style>