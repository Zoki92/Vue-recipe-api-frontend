<template>
  <div>
    <b-alert v-model="created" dismissible variant="success" style="margin-top:20px;">
      <a href="#" class="alert-link">{{ newUser }}'s account has been created</a>
    </b-alert>
    <h1>Please Enter your details for new Account</h1>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-3" label="Your Name:" label-for="input-3">
        <b-form-input
          type="text"
          id="input-3"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
        <b-form-input
          type="password"
          id="input-2"
          v-model="form.password"
          required
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="success" style="margin-right: 10px;">Create</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      },
      show: true,
      created: false,
      newUser: ""
    };
  },
  methods: {
    ...mapActions(["createUser"]),
    onSubmit(evt) {
      evt.preventDefault();
      this.createUser(this.form);
      this.form.email = "";
      this.form.password = "";
      this.form.name = "";
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
      this.form.name = "";
    }
  },
  computed: {
    ...mapGetters(["createdUser"])
  },
  watch: {
    createdUser: function() {
      this.created = true;
      this.newUser = this.createdUser.name;
    }
  }
};
</script>

<style>
</style>
