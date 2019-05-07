import Vue from "vue";
import Router from "vue-router";
import RecipeDetail from "@/components/recipes/RecipeDetail";
import RecipeList from "@/components/recipes/RecipeList";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: RecipeList
    },
    {
      path: "/recipe/:id",
      name: "RecipeDet",
      component: RecipeDetail
    }
  ]
});
