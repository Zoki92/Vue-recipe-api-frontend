<template>
  <div>
    <b-card
      v-for="recipe in allRecipes"
      :key="recipe.id"
      no-body
      class="overflow-hidden card-item"
      style="max-width: 540px;"
    >
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img :src="recipe.image" class="rounded-0 image-link"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body :title="recipe.title">
            <b-card-text>{{ recipe.description}}</b-card-text>
            <b-card-text>{{ recipe.price }}</b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Recipes",
  data: function() {
    return {
      title: "",
      src: ""
    };
  },

  methods: {
    ...mapActions(["fetchRecipes"])
  },
  computed: mapGetters(["allRecipes"]),
  created() {
    this.fetchRecipes();
  }
};
</script>

<style scoped>
.image-link {
  height: 300px;
}
</style>
