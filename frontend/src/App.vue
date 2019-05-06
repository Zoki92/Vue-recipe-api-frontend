<template>
  <div class="container">
    <NavBar></NavBar>
    <RecipeList></RecipeList>
  </div>
</template>

<script>
import NavBar from "./components/navigation/NavBar.vue";
import RecipeList from "./components/recipes/RecipeList.vue";
export default {
  components: {
    NavBar,
    RecipeList
  }
};
</script>

<style>
.card-item {
  margin-top: 10px;
}
</style>
