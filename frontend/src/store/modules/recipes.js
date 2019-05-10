import axios from "axios";

const recipesModule = {
  state: {
    recipes: []
  },

  getters: {
    allRecipes: state => state.recipes,
    recipeDetail: state => state.recipes
  },

  actions: {
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
    },
    async fetchRecipe({ commit }, id) {
      const response = await axios.get(
        `http://localhost:8000/api/recipy/recipes/${id}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: "Token a54d663c9fb1794cc055eb16e55744e48e4bb256"
          }
        }
      );
      commit("setRecipe", response.data);
    },
    async createRecipe({ commit }, form) {
      const {
        title,
        description,
        selected,
        tags,
        time_minutes,
        price,
        file
      } = form;
      var data = {
        title: title,
        description: description,
        ingredients: selected,
        tags: tags,
        time_minutes: time_minutes,
        price: price,
        image: file
      };
      console.log(data);
      const response = await axios.post(
        "http://localhost:8000/api/recipy/recipes/",
        data,
        {
          headers: {
            "content-type": "application/json",
            Authorization: "Token a54d663c9fb1794cc055eb16e55744e48e4bb256"
          }
        }
      );
      commit("addRecipe", response.data);
    }
  },

  mutations: {
    setRecipes: (state, recipes) => (state.recipes = recipes),
    setRecipe: (state, recipe) => (state.recipes = recipe),
    addRecipe: (state, recipe) => state.recipes.unshift(recipe)
  }
};

export default recipesModule;
