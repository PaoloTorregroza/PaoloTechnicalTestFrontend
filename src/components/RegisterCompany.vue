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

      <b-form-group
          id="input-group-2"
          label="Nit:"
          label-for="input-2"
      >
        <b-form-input
            id="input-2"
            v-model="form.id"
            type="text"
            placeholder="Company unique identifier"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-3"
          label="phone:"
          label-for="input-3"
      >
        <b-form-input
            id="input-3"
            v-model="form.phone"
            type="text"
            placeholder="Company phone"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-4"
          label="Mail:"
          label-for="input-4"
      >
        <b-form-input
            id="input-4"
            v-model="form.mail"
            type="text"
            placeholder="Company email"
            required
        ></b-form-input>
      </b-form-group>

      <div style="display: flex; margin-top: 17px;">
        <b-button @click="$bvModal.hide('modal-center')">Cancel</b-button>
        <b-button style="margin-left: 8px" type="submit" variant="primary">Submit</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'RegisterCompany',

  data() {
    return {
      form: {
        id: '',
        name: '',
        mail: '',
        phone: ''
      }
    }
  },

  methods: {
    async onSubmit(event) {
      event.preventDefault()
      const queryData = this.form
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      }

      try {
        await axios.post(`${this.$apiUrl}/company`, queryData, config)
        this.$emit('companyRegistered')
      } catch (e) {
        alert('Error creating company')
      }
      this.$bvModal.hide('modal-center')
    }
  }
}
</script>

<style scoped>

</style>