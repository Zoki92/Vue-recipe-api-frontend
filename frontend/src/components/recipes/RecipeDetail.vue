<template>
  <div v-if="recipeDetail">
    <router-link v-if="recipeDetail.id" :to="{ name: 'Home'}">
      <b-button variant="danger" style="margin-top: 5px">Go back</b-button>
    </router-link>
    <b-card class="detail-body">
      <b-media no-body>
        <b-media-aside vertical-align="top">
          <b-img
            :src="recipeDetail.image"
            blank-color="#ccc"
            width="300"
            height="300"
            alt="placeholder"
          ></b-img>
        </b-media-aside>

        <b-media-body class="ml-3">
          <h5 class="mt-0">{{ recipeDetail.title }}</h5>
          <p>{{ recipeDetail.description }}</p>
          <p class="mb-0">{{ recipeDetail.price }}</p>

          <b-media v-for="ingredient in recipeDetail.ingredients" :key="ingredient.id">
            <b-img
              style="margin: 5px"
              slot="aside"
              blank
              blank-color="#ccc"
              width="64"
              alt="placeholder"
            ></b-img>
            <h5 class="mt-0">{{ ingredient.name }}</h5>
          </b-media>
        </b-media-body>
      </b-media>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "RecipeDetail",

  methods: {
    ...mapActions(["fetchRecipe"])
  },
  computed: {
    ...mapGetters(["recipeDetail"])
  },
  created() {
    this.fetchRecipe(this.$route.params.id);
  }
};
</script>

<style scoped>
.detail-body {
  margin-top: 10px;
}
</style>
