import axios from "axios";
import store from "../index";
const tagsModule = {
  state: {
    tags: []
  },

  getters: {
    allTags: state => state.tags
  },

  actions: {
    async fetchTags({ commit }) {
      let token = store.state.auth.token;
      const response = await axios.get(
        "http://localhost:8000/api/recipy/tags/",
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${token}`
          }
        }
      );
      commit("setTags", response.data);
    },
    async createTag({ commit }, name) {
      let token = store.state.auth.token;
      var data = {
        name: name
      };
      const response = await axios.post(
        "http://localhost:8000/api/recipy/tags/",
        data,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${token}`
          }
        }
      );
      commit("addTag", response.data);
    },
    async removeTag({ commit }, id) {
      let token = store.state.auth.token;
      await axios.delete(`http://localhost:8000/api/recipy/tags/${id}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${token}`
        }
      });
      commit("deleteTag", id);
    }
  },

  mutations: {
    setTags: (state, tags) => (state.tags = tags),
    addTag: (state, tag) => state.tags.unshift(tag),
    deleteTag: (state, id) =>
      (state.tags = state.tags.filter(tag => tag.id !== id))
  }
};

export default tagsModule;
