<template>
<div>
  <b-form @submit="onSubmit">
    <b-form-group
        id="input-group-1"
        label="Name:"
        label-for="input-1"
    >
      <b-form-input
          id="input-1"
          v-model="form.name"
          type="text"
          placeholder="Name"
          required
      ></b-form-input>
    </b-form-group>

    <div style="display: flex; margin-top: 17px;">
      <b-button @click="$bvModal.hide('new-project')">Cancel</b-button>
      <b-button style="margin-left: 8px" type="submit" variant="primary">Submit</b-button>
    </div>
  </b-form>
</div>
</template>

<script>
export default {
  name: 'NewProjectDialog',

  data() {
    return {
      form: {
        name: ""
      }
    }
  },

  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.$bvModal.hide('new-project')
      this.$emit('createNewProject', this.form.name)
    }
  }
}
</script>

<style scoped>

</style>