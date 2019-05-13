import axios from "axios";

const tagsModule = {
  state: {
    tags: []
  },

  getters: {
    allTags: state => state.tags
  },

  actions: {
    async fetchTags({ commit }) {
      const response = await axios.get(
        "http://localhost:8000/api/recipy/tags/",
        {
          headers: {
            "content-type": "application/json",
            Authorization: "Token a54d663c9fb1794cc055eb16e55744e48e4bb256"
          }
        }
      );
      commit("setTags", response.data);
    },
    async createTag({ commit }, name) {
      var data = {
        name: name
      };
      const response = await axios.post(
        "http://localhost:8000/api/recipy/tags/",
        data,
        {
          headers: {
            "content-type": "application/json",
            Authorization: "Token a54d663c9fb1794cc055eb16e55744e48e4bb256"
          }
        }
      );
      commit("addTag", response.data);
    },
    async removeTag({ commit }, id) {
      await axios.delete(`http://localhost:8000/api/recipy/tags/${id}`, {
        headers: {
          "content-type": "application/json",
          Authorization: "Token a54d663c9fb1794cc055eb16e55744e48e4bb256"
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
