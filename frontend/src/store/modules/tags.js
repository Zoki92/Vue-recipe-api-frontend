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
    }
  },

  mutations: {
    setTags: (state, tags) => (state.tags = tags)
  }
};

export default tagsModule;
