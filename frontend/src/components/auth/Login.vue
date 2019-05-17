<template>
  <div>
    <b-form @submit="onSubmit" v-if="show" style="margin-bottom:20px;">
      <b-form-group id="input-group-1" label="Your Email:" label-for="input-1">
        <b-form-input
          type="text"
          id="input-1"
          v-model="form.email"
          required
          placeholder="Enter Email"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-2"
        label="Password:"
        label-for="input-2"
        description="We'll never share your password with anyone else."
      >
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="success" style="margin-right: 10px;">Log In</b-button>
    </b-form>
    <span>
      Don't have an account?
      <router-link :to="{name: 'CreateUser'}">Click here.</router-link>
    </span>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import router from "vue-router";
export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      show: true
    };
  },
  methods: {
    ...mapActions(["obtainToken"]),
    onSubmit(evt) {
      evt.preventDefault();
      this.obtainToken(this.form);
      setTimeout(() => this.$router.push("/"), 500);
    }
  }
};
</script>

<style>
</style>
