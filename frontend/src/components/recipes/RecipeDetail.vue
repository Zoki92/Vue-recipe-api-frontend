<template>
  <div>
    <router-link :to="{ name: 'Home'}">
      <b-button variant="danger" style="margin-top: 5px">Go back</b-button>
    </router-link>
    <b-card class="detail-body">
      <b-media no-body>
        <b-media-aside vertical-align="top">
          <b-img
            v-if="recipeDetail.image"
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
      <router-link
        v-if="recipeDetail.id"
        :to="{ name: 'UpdateRecipe', params: { id: recipeDetail.id}}"
      >
        <p class="update-recipe">
          <font-awesome-icon icon="pen"/>
          {{" "}}Update Recipe
        </p>
      </router-link>
    </b-card>

    <b-form-file
      style="margin-top:10px;"
      v-model="file"
      @change="handleFileUpload"
      placeholder="Change Recipe Image..."
      drop-placeholder="Drop file here..."
    ></b-form-file>
    <button class="btn btn-danger mt-2" @click="submitFile">Submit</button>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "RecipeDetail",
  data() {
    return {
      file: "",
      id: this.$route.params.id
    };
  },
  methods: {
    ...mapActions(["fetchRecipe", "addImage"]),
    submitFile() {
      const fd = new FormData();
      fd.append("image", this.file, this.file.name);
      this.addImage({
        formData: fd,
        id: this.id
      });
      this.file = "";
    },
    handleFileUpload(evt) {
      this.file = evt.target.files[0];
    }
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
.update-recipe {
  margin-top: 10px;
}
</style>
