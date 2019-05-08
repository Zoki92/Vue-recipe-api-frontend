import axios from "axios";

const ingredientsModule = {
  state: {
    ingredients: []
  },

  getters: {
    allIngredients: state => state.ingredients
  },

  actions: {
    async fetchIngredients({ commit }) {
      const response = await axios.get(
        "http://localhost:8000/api/recipy/ingredients/",
        {
          headers: {
            "content-type": "application/json",
            Authorization: "Token a54d663c9fb1794cc055eb16e55744e48e4bb256"
          }
        }
      );
      commit("setIngredients", response.data);
    }
  },

  mutations: {
    setIngredients: (state, ingredients) => (state.ingredients = ingredients)
  }
};

export default ingredientsModule;
