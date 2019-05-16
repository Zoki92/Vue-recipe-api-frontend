import axios from "axios";

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
    async fetchRecipes({ commit }, token) {
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
    async fetchRecipe({ commit, state }, id) {
      const response = await axios.get(
        `http://localhost:8000/api/recipy/recipes/${id}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${state.token}`
          }
        }
      );
      commit("setRecipe", response.data);
    },
    async createRecipe({ commit, state }, form) {
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
            Authorization: `Token ${state.token}`
          }
        }
      );
      commit("addRecipe", response.data);
    },
    async addImage({ commit, state }, { formData, id }) {
      const response = await axios.post(
        `http://localhost:8000/api/recipy/recipes/${id}/upload-image/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${state.token}`
          }
        }
      );
      commit("uploadImage", response.data);
    },
    async deleteImage({ commit, state }, id) {
      await axios.delete(
        `http://localhost:8000/api/recipy/recipes/${id}/`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${state.token}`
          }
        }
      );
      commit("removeImage", id);
    },
    async updateRecipe({ commit, state }, { form, id }) {
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
            Authorization: `Token ${state.token}`
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
