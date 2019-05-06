import axios from "axios";

const state = {
  recipes: []
};

const getters = {
  allRecipes: state => state.recipes
};

const actions = {
  async fetchRecipes({ commit }) {
    const response = await axios.get(
      "http://localhost:8000/api/recipy/recipes/",
      {
        headers: {
          "content-type": "application/json",
          Authorization: "Token a54d663c9fb1794cc055eb16e55744e48e4bb256"
        }
      }
    );

    commit("setRecipes", response.data);
  }
};

const mutations = {
  setRecipes: (state, recipes) => (state.recipes = recipes)
};

export default {
  state,
  getters,
  actions,
  mutations
};
