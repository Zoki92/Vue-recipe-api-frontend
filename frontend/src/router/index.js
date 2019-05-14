import Vue from "vue";
import Router from "vue-router";
import RecipeDetail from "@/components/recipes/RecipeDetail";
import RecipeList from "@/components/recipes/RecipeList";
import AddRecipe from "@/components/recipes/AddRecipe";
import UpdateRecipeForm from "@/components/recipes/UpdateRecipeForm";
import ListIngredients from "@/components/ingredients/ListIngredients";
import ListTags from "@/components/tags/ListTags";
import CreateUser from "@/components/auth/CreateUser";
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
      path: "/ingredients",
      name: "IngredientsList",
      component: ListIngredients
    },
    {
      path: "/tags",
      name: "TagsList",
      component: ListTags
    },
    {
      path: "/create-user",
      name: "CreateUser",
      component: CreateUser
    },
    {
      path: "/",
      name: "Home",
      component: RecipeList
    }
  ]
});
