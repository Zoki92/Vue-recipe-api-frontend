import Vuex from "vuex";
import Vue from "vue";
import recipesModule from "./modules/recipes";
import ingredientsModule from "./modules/ingredients";
import tagsModule from "./modules/tags";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    recipes: recipesModule,
    ingredients: ingredientsModule,
    tags: tagsModule
  }
});
