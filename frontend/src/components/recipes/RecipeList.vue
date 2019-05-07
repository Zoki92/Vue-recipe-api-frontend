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
          <b-card-img :src="recipe.image || 'null'" class="rounded-0 image-link"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body>
            <b-card-text>
              <router-link
                class="link-recipe"
                v-if="recipe.id"
                :to="{ name: 'RecipeDet', params: { id: recipe.id}}"
              >{{ recipe.title }}</router-link>
            </b-card-text>
            <b-card-text class="item-recipe">{{ recipe.description}}</b-card-text>
            <b-card-text class="recipe-price">{{ recipe.price }}$</b-card-text>
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

.link-recipe {
  text-decoration: none;
  color: rgb(12, 204, 44);
}

.item-recipe {
  color: rgb(8, 7, 7);
}
.recipe-price {
  color: rgb(14, 235, 187);
}
</style>
