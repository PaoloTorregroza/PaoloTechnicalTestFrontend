<template>
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
          placeholder="History description"
          required
      ></b-form-input>
    </b-form-group>

    <div style="display: flex; margin-top: 17px;">
      <b-button @click="$bvModal.hide('new-history')">Cancel</b-button>
      <b-button style="margin-left: 8px" type="submit" variant="primary">Submit</b-button>
    </div>
  </b-form>
</template>

<script>
export default {
  name: "NewHistory",

  data() {
    return {
      form: {
        description: ''
      }
    }
  },

  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.$bvModal.hide('new-history')
      this.$emit('newHistory', this.form.description)
    }
  }
}
</script>

<style scoped>

</style>