<template>
  <b-container>
    <NavBar></NavBar>
    <router-view/>
  </b-container>
</template>

<script>
import NavBar from "./components/navigation/NavBar.vue";
import RecipeList from "./components/recipes/RecipeList.vue";

export default {
  components: {
    NavBar
  },
  data() {
    return {
      id: 0
    };
  }
};
</script>

<style>
.card-item {
  margin-top: 10px;
}
</style>
