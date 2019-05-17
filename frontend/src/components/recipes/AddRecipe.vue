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
        <b-form-select id="input-5" v-model="form.selected" :options="options" multiple></b-form-select>
      </b-form-group>
      <!-- Modal for ingredients -->
      <div>
        <b-button
          variant="light"
          @click="$bvModal.show('modal-scoped')"
          style="margin-bottom: 10px; color: #1ca078f8"
        >
          <font-awesome-icon icon="plus" style="color:#1ca078f8"/>
          {{" "}}Add ingredient to the list
        </b-button>
        <b-modal id="modal-scoped" title="Ingredients Input">
          <!-- Form for ingredients -->
          <template slot="default" slot-scope="{ok}">
            <b-form @submit="onSubmitIng" v-if="show">
              <b-form-group
                id="input-group-ingredients-1"
                label="Name"
                label-for="input-ingredients-1"
                description="Please enter the name of the ingredient"
              >
                <b-form-input
                  id="input-ingredients-1"
                  v-model="form_ingredients.name"
                  type="text"
                  required
                  placeholder="Enter name"
                ></b-form-input>
              </b-form-group>
              <b-button
                size="sm"
                type="submit"
                variant="success"
                style="margin-top: 10px; margin-bottom: 10px"
                @click="ok()"
              >Submit</b-button>
            </b-form>
          </template>
          <!-- End form for ingredients  -->
          <!-- footer for modal -->
          <template slot="modal-footer" slot-scope="{ cancel}">
            <b-button size="sm" variant="danger" @click="cancel()">Cancel</b-button>
          </template>
          <!-- end footer modal -->
        </b-modal>
      </div>
      <!-- End Modal for Ingredients -->
      <b-form-group v-if="allTags" id="input-group-6" label="Your Tags:" label-for="input-6">
        <b-form-select id="input-6" v-model="form.tags" :options="tags" multiple></b-form-select>
      </b-form-group>
      <!-- Modal for Tags -->
      <div>
        <b-button
          variant="light"
          @click="$bvModal.show('modal-scoped1')"
          style="margin-bottom: 10px; color: #1ca078f8"
        >
          <font-awesome-icon icon="plus" style="color:#1ca078f8"/>
          {{" "}}Add tags to the list
        </b-button>
        <b-modal id="modal-scoped1" title="Tags Input">
          <!-- Form for Tags -->
          <template slot="default" slot-scope="{ok}">
            <b-form @submit="onSubmitTag" v-if="show">
              <b-form-group
                id="input-group-tags-1"
                label="Name"
                label-for="input-tags-1"
                description="Please enter the name of the tag"
              >
                <b-form-input
                  id="input-tags-1"
                  v-model="form_tags.name"
                  type="text"
                  required
                  placeholder="Enter tag name"
                ></b-form-input>
              </b-form-group>
              <b-button
                size="sm"
                type="submit"
                variant="success"
                style="margin-top: 10px; margin-bottom: 10px"
                @click="ok()"
              >Submit</b-button>
            </b-form>
          </template>
          <!-- End form for Tags  -->
          <!-- footer for modal -->
          <template slot="modal-footer" slot-scope="{ ok, cancel}">
            <b-button size="sm" variant="danger" @click="cancel()">Cancel</b-button>
          </template>
          <!-- end footer modal -->
        </b-modal>
      </div>
      <!-- End Modal for Tags -->

      <b-button type="submit" variant="primary" style="margin-right:5px">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
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
        tags: []
      },
      show: true,
      form_ingredients: {
        name: ""
      },
      form_tags: {
        name: ""
      }
    };
  },
  methods: {
    ...mapActions([
      "fetchIngredients",
      "fetchTags",
      "createIngredient",
      "createTag",
      "createRecipe"
    ]),
    onSubmit(evt) {
      evt.preventDefault();
      this.createRecipe(this.form);
      setTimeout(() => this.$router.push("/"), 500);
    },
    onSubmitIng(evt) {
      evt.preventDefault();
      this.createIngredient(this.form_ingredients.name);
    },
    onSubmitTag(evt) {
      evt.preventDefault();
      this.createTag(this.form_tags.name);
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

<style scoped>
.form {
  color: #1ca078f8;
}
</style>
