<template>
  <b-card
      :border-variant="getBorderVariant()"
      :header="'Responsible: ' + taskInfo.user.username"
      align="center"
      class="task-card">
    <b-card-text>{{taskInfo.description}}</b-card-text>

    <div  style="display: flex; justify-content: center">
      <b-button @click="openDialog" size="sm" variant="info" class="m-md-2">
        Overview
      </b-button>
      <b-dropdown id="dropdown-1" size="sm" text="Update Status" class="m-md-2" variant="info">
        <b-dropdown-item @click="selectStatus('active')">Active</b-dropdown-item>
        <b-dropdown-item @click="selectStatus('working')">Working</b-dropdown-item>
        <b-dropdown-item @click="selectStatus('done')">Done</b-dropdown-item>
      </b-dropdown>
    </div>

    <b-modal hide-header-close :id="'task-card-' + taskInfo.id" centered title="Task Overview">
      <TaskOverview @taskUpdated="$emit('taskUpdated')" :task="taskInfo"/>
    </b-modal>
  </b-card>
</template>

<script>
import TaskOverview from "./TaskOverview";
import axios from "axios";
export default {
  name: 'TaskCard',
  components: {TaskOverview},
  props: {
    taskInfo: Object,
  },

  methods: {
    getBorderVariant() {
      switch (this.taskInfo.status) {
        case 'active':
          return 'dark'
        case 'working':
          return 'info'
        case 'done':
          return 'success'
      }
    },

    openDialog() {
      this.$bvModal.show('task-card-'+this.taskInfo.id)
    },

    async selectStatus(status) {
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      }

      try {
        await axios.put(`${this.$apiUrl}/task/${this.taskInfo.id}`, {status: status}, config)
        this.$emit("taskUpdated")
      } catch (e) {
        alert('Error updating task')
      }
    }
  }
}
</script>

<style scoped>
.task-card {
  margin: 8px;
}
</style>