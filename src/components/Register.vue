<template>
  <div class="login-form">
    <b-form @submit="onSubmit">
      <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
      >
        <b-form-input
            id="input-1"
            v-model="form.mail"
            type="email"
            placeholder="Enter email"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-2"
          label="Your username:"
          label-for="input-2"
          description="Everyone will see this!"
      >
        <b-form-input
            id="input-2"
            v-model="form.username"
            type="text"
            placeholder="Enter your username"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-3"
          label="Password:"
          label-for="input-3"
      >
        <b-form-input
            id="input-3"
            v-model="form.password"
            type="password"
            placeholder="Enter password"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-4"
          label="Confirm password:"
          label-for="input-4"
          style="margin-top: 17px;"
      >
        <b-form-input
            id="input-4"
            v-model="form.confirmPassword"
            type="password"
            placeholder="Confirm password"
            required
        ></b-form-input>
      </b-form-group>

      <b-button style="margin-top: 17px" type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'Register',

  data() {
    return {
      form: {
        mail: '',
        password: '',
        confirmPassword: '',
        username: ''
      }
    }
  },

  methods: {
    onSubmit(event) {
      event.preventDefault()
      if (this.form.password === this.form.confirmPassword) {
        this.$emit('registerUser', this.form)
      }
      else {
        alert("Passwords do no match")
      }
    }
  }
}
</script>

<style scoped>
.login-form {
  max-width: 400px;
}
</style>