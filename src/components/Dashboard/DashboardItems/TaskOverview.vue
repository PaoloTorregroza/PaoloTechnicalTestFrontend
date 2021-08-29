<template>
  <div>
    <p>Responsible: {{task.user.name}}</p>
    <p>{{task.description}}</p>

    <div style="display: flex; align-items: center;">
      <p style="margin-bottom: 0">Status: {{task.status}}</p>

      <b-dropdown id="dropdown-1" size="sm" text="Update Status" class="m-md-2" variant="info">
        <b-dropdown-item @click="selectStatus('active')">Active</b-dropdown-item>
        <b-dropdown-item @click="selectStatus('working')">Working</b-dropdown-item>
        <b-dropdown-item @click="selectStatus('done')">Done</b-dropdown-item>
      </b-dropdown>
    </div>

    <div style="margin-bottom: 20px">
      <b-button
        style="margin-right: 8px"
        variant="info"
        size="sm"
        @click="openDialog"
      >
        Edit
      </b-button>
      <b-button
          @click="deleteTask"
          v-if="task.status === 'active'"
          size="sm"
          variant="danger"
      >
        Cancel Task
      </b-button>
    </div>

    <div class="task-comments-container">
      <h4>Comments:</h4>
      <div class="comment-container" v-for="comment in task.comments" :key="comment.id">
        <h6>{{comment.user.username}}</h6>
        <p>{{comment.content}}</p>
      </div>

      <div style="display: flex; align-items: center; margin-top: 17px">
        <b-form-input size="sm" v-model="comment" placeholder="Comment."></b-form-input>
        <b-icon-plus-square-fill @click="onComment" style="margin-left: 8px; cursor: pointer" variant="info"></b-icon-plus-square-fill>
      </div>
    </div>

    <b-modal hide-header-close hide-footer :id="'task-edit-' + task.id" centered title="Task Edit">
      <b-form-input
          id="input-1"
          v-model="newDescription"
          type="text"
          placeholder="Description"
          required
      ></b-form-input>
      <b-button @click="editComment" style="margin-top: 8px; width: 100%" variant="info" size="sm">Save</b-button>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'TaskOverview',

  props: {
    task: Object
  },

  data() {
    return {
      comment: '',
      newDescription: ''
    }
  },

  methods: {
    openDialog() {
      this.$bvModal.show('task-edit-'+this.task.id)
    },

    async selectStatus(status) {
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      }

      try {
        await axios.put(`${this.$apiUrl}/task/${this.task.id}`, {status: status}, config)
        this.$emit("taskUpdated")
        this.$bvModal.hide('task-card-'+this.task.id)
      } catch (e) {
        alert('Error updating task')
      }
    },

    async onComment() {
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      }

      const userId = this.$store.state.userData.id
      const taskId = this.task.id

      try {
        await axios.post(`${this.$apiUrl}/comment`, {user: {id: userId}, task: {id: taskId}, content: this.comment}, config)
        this.$emit('taskUpdated')
      } catch (e) {
        alert('Error commenting task')
      }
      this.comment = ''
    },

    async deleteTask() {
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      }

      try {
        await axios.delete(`${this.$apiUrl}/task/${this.task.id}`, config)
        this.$bvModal.hide('task-card-'+this.task.id)
        this.$emit('taskUpdated')
      } catch (e) {
        alert('Error deleting task')
      }
    },
    
    async editComment() {
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      }

      this.$bvModal.hide('task-edit-'+this.task.id)

      try {
        await axios.put(`${this.$apiUrl}/task/${this.task.id}`, {description: this.newDescription}, config)
        this.$emit('taskUpdated')
      } catch (e) {
        alert('Error updating task')
      }
      this.newDescription = ''
    }
  }
}
</script>

<style scoped>
.comment-container {
  border-bottom: 1px solid gray;
  margin-top: 12px;
}
</style>