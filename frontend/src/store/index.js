import Vuex from "vuex";
import Vue from "vue";
import recipesModule from "./modules/recipes";
import ingredientsModule from "./modules/ingredients";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    recipes: recipesModule,
    ingredients: ingredientsModule
  }
});
