import axios from "axios";
import store from "../index";

const recipesModule = {
  state: {
    recipes: []
  },

  getters: {
    allRecipes: state => {
      return state.recipes;
    },
    recipeDetail: state => {
      return state.recipes;
    },
    ingredientsInDetail: state => {
      if (state.recipes.ingredients) {
        return state.recipes.ingredients.map(ing => ing.id);
      }
    },
    tagsInDetail: state => {
      if (state.recipes.tags) {
        return state.recipes.tags.map(ing => ing.id);
      }
    }
  },

  actions: {
    async fetchRecipes({ commit }) {
      let token = store.state.auth.token;
      if (token) {
        const response = await axios.get(
          "http://localhost:8000/api/recipy/recipes/",
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Token ${token}`
            }
          }
        );

        commit("setRecipes", response.data);
      } else {
        commit("setRecipes");
      }
    },
    async fetchRecipe({ commit }, id) {
      let token = store.state.auth.token;
      const response = await axios.get(
        `http://localhost:8000/api/recipy/recipes/${id}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${token}`
          }
        }
      );
      commit("setRecipe", response.data);
    },
    async createRecipe({ commit }, form) {
      let token = store.state.auth.token;
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

      const response = await axios.post(
        "http://localhost:8000/api/recipy/recipes/",
        data,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${token}`
          }
        }
      );
      commit("addRecipe", response.data);
    },
    async addImage({ commit }, { formData, id }) {
      let token = store.state.auth.token;
      const response = await axios.post(
        `http://localhost:8000/api/recipy/recipes/${id}/upload-image/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`
          }
        }
      );
      commit("uploadImage", response.data);
    },
    async deleteImage({ commit }, id) {
      let token = store.state.auth.token;
      await axios.delete(
        `http://localhost:8000/api/recipy/recipes/${id}/`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          }
        }
      );
      commit("removeImage", id);
    },
    async updateRecipe({ commit }, { form, id }) {
      let token = store.state.auth.token;
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

      const response = await axios.put(
        `http://localhost:8000/api/recipy/recipes/${id}/`,
        data,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${token}`
          }
        }
      );
      commit("updRecipe", response.data);
    }
  },

  mutations: {
    setRecipes: (state, recipes) => {
      if (recipes) {
        state.recipes = recipes;
      } else {
        state.recipes = [];
      }
    },
    setRecipe: (state, recipe) => (state.recipes = recipe),
    addRecipe: (state, recipe) => state.recipes.unshift(recipe),
    uploadImage: (state, image) => {
      state.recipes.image = image.image;
    },
    removeImage: (state, id) => {
      state.recipes = state.recipes.filter(recipe => recipe.id !== id);
    },
    updRecipe: (state, recipe) => (state.recipes = recipe)
  }
};

export default recipesModule;
