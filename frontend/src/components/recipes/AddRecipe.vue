<template>
  <div style="margin-top: 20px">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="Title:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.title"
          type="text"
          required
          placeholder="Enter Title"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Description:" label-for="textarea">
        <b-form-textarea
          id="textarea"
          v-model="form.description"
          placeholder="Enter description..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group id="input-group-3" label="Time Minutes:" label-for="input-3">
        <b-form-input id="input-3" v-model="form.time_minutes" required placeholder="Enter Time"></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="Price:" label-for="input-4">
        <b-form-input id="input-4" v-model="form.price" required placeholder="Enter Price"></b-form-input>
      </b-form-group>

      <b-form-group
        v-if="allIngredients"
        id="input-group-5"
        label="Your Ingredients:"
        label-for="input-5"
      >
        <b-form-select
          id="input-5"
          v-model="form.selected"
          :options="options"
          multiple
          :select-size="4"
        ></b-form-select>
      </b-form-group>
      <b-form-group v-if="allTags" id="input-group-6" label="Your Tags:" label-for="input-6">
        <b-form-select
          id="input-6"
          v-model="form.checked"
          :options="tags"
          multiple
          :select-size="4"
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        title: "",
        description: "",
        time_minutes: null,
        price: null,
        link: "",
        selected: [],
        image: "",
        checked: []
      },
      show: true
    };
  },
  methods: {
    ...mapActions(["fetchIngredients", "fetchTags"]),
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.title = "";
      this.form.description = "";
      this.form.time_minutes = null;
      this.form.price = null;
      this.form.link = "";
      this.form.selected = [];
      this.form.tags = [];

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  },
  computed: {
    ...mapGetters(["allIngredients", "allTags"]),
    options: function() {
      return this.allIngredients.map(elem => ({
        value: elem.id,
        text: elem.name
      }));
    },
    tags: function() {
      return this.allTags.map(elem => ({
        value: elem.id,
        text: elem.name
      }));
    }
  },

  created() {
    this.fetchIngredients();
    this.fetchTags();
  }
};
</script>