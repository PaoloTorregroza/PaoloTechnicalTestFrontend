<template>
<div>
  <b-card style="cursor: pointer;" @click="$emit('historySelected', history.id);">
      <b-card-text>{{history.description}}</b-card-text>
      <b-button
          @click="showTaskDialog"
          v-if="selected"
          variant="info"
          size="sm"
          style="width: 100%"
      >
        Add task
      </b-button>
  </b-card>

  <b-modal hide-footer hide-header-close :id="'create-task-'+history.id" centered title="Register a new company.">
    <b-form @submit="onSubmit">
      <b-form-group
          id="input-group-1"
          label="Description:"
          label-for="input-1"
      >
        <b-form-input
            id="input-1"
            v-model="form.description"
            type="text"
            placeholder="Task description"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="User:" label-for="input-2">
        <b-form-select
            id="input-2"
            v-model="form.user"
            :options="users.map(el => `${el.username} id:${el.id}`)"
            required
        ></b-form-select>
      </b-form-group>


      <div style="display: flex; margin-top: 17px;">
        <b-button @click="$bvModal.hide('create-task-'+history.id)">Cancel</b-button>
        <b-button
            style="margin-left: 8px"
            type="submit"
            variant="primary"
        >
          Submit
        </b-button>
      </div>
    </b-form>
  </b-modal>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "HistoryCard",
  props: {
    history: Object,
    selected: Boolean,
    users: Array
  },

  data() {
    return {
      form: {
        description: '',
        user: undefined
      }
    }
  },

  methods: {
    async addTask() {
      const userId = this.form.user.match('\\id:[0-9]+').pop()
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      }

      const body = {
        description: this.form.description,
        user: {id: userId.replace('id:', '')},
        history: {id: this.history.id}
      }

      try {
        await axios.post(`${this.$apiUrl}/task`, body, config)
        this.$emit('taskCreated')
      } catch (e) {
        alert('Error creating task')
      }
    },

    showTaskDialog() {
      this.$bvModal.show('create-task-'+this.history.id)
    },

    onSubmit(event) {
      event.preventDefault()
      this.$bvModal.hide('create-task-'+this.history.id)
      this.addTask()
    }
  }
}
</script>

<style scoped>

</style>