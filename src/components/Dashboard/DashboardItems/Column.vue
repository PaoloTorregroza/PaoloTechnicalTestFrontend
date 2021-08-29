<template>
  <div class="column-container">
    <p>{{ title }}</p>
    <div class="column-tasks-container">
      <TaskCard @taskUpdated="taskUpdated" v-for="task in tasks" :key="task.id" :taskInfo="task" />
    </div>
  </div>
</template>

<script>
import TaskCard from "./TaskCard";
export default {
  name: 'Column',
  components: {TaskCard},

  props: {
    title: String,
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
.column-container {
  margin: 12px;
}

.column-container p {
  background-color: #efefef;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 8px;
  min-width: 250px;
}

.column-tasks-container {
  width: 100%;
  min-height: 200px;
  background-color: #efefef;
  border-radius: 5px;
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>