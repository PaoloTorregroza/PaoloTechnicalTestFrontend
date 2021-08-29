<template>
<div class="tasks-board dashboard-item">
  <Column @taskUpdated="taskUpdated" title="Active" :tasks="tasks.filter(el => el.status === 'active')"/>
  <Column @taskUpdated="taskUpdated" title="Working" :tasks="tasks.filter(el => el.status === 'working')"/>
  <Column @taskUpdated="taskUpdated" title="Done" :tasks="tasks.filter(el => el.status === 'done')"/>
</div>
</template>

<script>
import Column from "./DashboardItems/Column";
export default {
  name: 'Board',
  components: {Column},

  props: {
    tasks: Array
  },

  methods: {
    taskUpdated() {
      this.$emit('taskUpdated')
    }
  }
}
</script>

<style scoped>
.tasks-board {
  display: grid;
  grid-template-columns: auto auto auto;
}
</style>