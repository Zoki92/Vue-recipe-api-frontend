import axios from "axios";
import store from "../index";
const authModule = {
  state: {
    authUser: {},
    isAuthenticated: false,
    token: localStorage.getItem("token") || null
  },
  getters: {
    isLoggedIn: state => !!state.token
  },

  actions: {
    async createUser({ commit }, user) {
      const { name, email, password } = user;
      const data = {
        name: name,
        email: email,
        password: password
      };

      await axios.post("http://localhost:8000/api/user/create/", data);
    },
    async obtainToken({ commit }, form) {
      const { email, password } = form;
      const data = {
        email,
        password
      };
      const response = await axios.post(
        "http://localhost:8000/api/user/token/",
        data
      );
      localStorage.setItem("token", response.data.token);
      commit("setToken", response.data);
    },
    async getAuthUser({ commit, state }) {
      if (state.token) {
        const response = await axios.get("http://localhost:8000/api/user/me/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${state.token}`
          }
        });
        commit("setAuthUser", response.data);
      } else {
        commit("setAuthUser");
      }
    },
    async logoutUser({ commit }) {
      commit("removeToken");
    }
  },

  mutations: {
    setToken: (state, data) => {
      state.token = data.token;
      state.isAuthenticated = true;
    },
    setAuthUser: (state, user = null) => {
      if (user) {
        state.authUser = user;
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    },
    removeToken(state) {
      state.authUser = {};
      state.token = null;
      localStorage.removeItem("token");
      store.state.recipes.recipes = [];
      store.state.ingredients.ingredients = [];
      store.state.tags.tags = [];
    }
  }
};
export default authModule;
