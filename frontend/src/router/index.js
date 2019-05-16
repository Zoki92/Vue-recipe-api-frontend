import Vue from "vue";
import Router from "vue-router";
import RecipeDetail from "@/components/recipes/RecipeDetail";
import RecipeList from "@/components/recipes/RecipeList";
import AddRecipe from "@/components/recipes/AddRecipe";
import UpdateRecipeForm from "@/components/recipes/UpdateRecipeForm";
import ListIngredients from "@/components/ingredients/ListIngredients";
import ListTags from "@/components/tags/ListTags";
import CreateUser from "@/components/auth/CreateUser";
import Login from "@/components/auth/Login";
import store from "../store/index";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/recipe/add",
      name: "AddRecipe",
      component: AddRecipe,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/recipe/:id",
      name: "RecipeDet",
      component: RecipeDetail,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/recipe/:id/update",
      name: "UpdateRecipe",
      component: UpdateRecipeForm,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/ingredients",
      name: "IngredientsList",
      component: ListIngredients,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/tags",
      name: "TagsList",
      component: ListTags,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/create-user",
      name: "CreateUser",
      component: CreateUser
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/",
      name: "Home",
      component: RecipeList,
      meta: {
        requiresAuth: true
      }
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});
export default router;
