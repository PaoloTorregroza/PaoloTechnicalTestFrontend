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
        label="Password:"
        label-for="input-2"
    >
      <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          placeholder="Enter password"
          required
      ></b-form-input>
    </b-form-group>

    <b-button style="margin-top: 17px" type="submit" variant="primary">Submit</b-button>
  </b-form>
</div>
</template>

<script>
export default {
  name: 'Login',

  data() {
    return {
      form: {
        mail: '',
        password: ''
      }
    }
  },

  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.$emit('loginUser', this.form)
    }
  }
}
</script>

<style scoped>
.login-form {
  max-width: 400px;
}
</style>