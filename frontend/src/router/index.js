import Vue from "vue";
import Router from "vue-router";
import RecipeDetail from "@/components/recipes/RecipeDetail";
import RecipeList from "@/components/recipes/RecipeList";
import AddRecipe from "@/components/recipes/AddRecipe";
import UpdateRecipeForm from "@/components/recipes/UpdateRecipeForm";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/recipe/add",
      name: "AddRecipe",
      component: AddRecipe
    },
    {
      path: "/recipe/:id",
      name: "RecipeDet",
      component: RecipeDetail
    },
    {
      path: "/recipe/:id/update",
      name: "UpdateRecipe",
      component: UpdateRecipeForm
    },
    {
      path: "/",
      name: "Home",
      component: RecipeList
    }
  ]
});
