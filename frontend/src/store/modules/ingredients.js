import axios from "axios";
import store from "../index";
const ingredientsModule = {
  state: {
    ingredients: []
  },

  getters: {
    allIngredients: state => state.ingredients
  },

  actions: {
    async fetchIngredients({ commit }) {
      let token = store.state.auth.token;
      const response = await axios.get(
        "http://localhost:8000/api/recipy/ingredients/",
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${token}`
          }
        }
      );
      commit("setIngredients", response.data);
    },
    async createIngredient({ commit }, name) {
      let token = store.state.auth.token;
      var data = {
        name: name
      };
      const response = await axios.post(
        "http://localhost:8000/api/recipy/ingredients/",
        data,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${token}`
          }
        }
      );
      commit("addIngredient", response.data);
    },
    async removeIngredient({ commit }, id) {
      let token = store.state.auth.token;
      await axios.delete(
        `http://localhost:8000/api/recipy/ingredients/${id}/`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${token}`
          }
        }
      );
      commit("deleteIngredient", id);
    }
  },

  mutations: {
    setIngredients: (state, ingredients) => (state.ingredients = ingredients),
    addIngredient: (state, ingredient) => state.ingredients.unshift(ingredient),
    deleteIngredient: (state, id) =>
      (state.ingredients = state.ingredients.filter(ing => ing.id !== id))
  }
};

export default ingredientsModule;
