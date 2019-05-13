<template>
  <div>
    <!-- Modal for ingredients -->
    <div>
      <b-button
        variant="light"
        @click="$bvModal.show('modal-scoped')"
        style="margin-bottom: 10px; color: #1ca078f8;margin-top:10px;"
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
    <b-list-group>
      <b-list-group-item button v-for="ing in allIngredients" :key="ing.id">
        {{ ing.name }}
        <font-awesome-icon
          style="color:red;cursor:pointer;float:right;"
          icon="trash-alt"
          @click="deleteIng(ing.id)"
        />
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ListIngredients",
  data() {
    return {
      form_ingredients: {
        name: ""
      },
      show: true
    };
  },
  methods: {
    ...mapActions(["fetchIngredients", "removeIngredient", "createIngredient"]),
    deleteIng(id) {
      this.removeIngredient(id);
    },
    onSubmitIng(evt) {
      evt.preventDefault();
      this.createIngredient(this.form_ingredients.name);
    }
  },
  computed: mapGetters(["allIngredients"]),
  created() {
    this.fetchIngredients();
  }
};
</script>

<style>
</style>
