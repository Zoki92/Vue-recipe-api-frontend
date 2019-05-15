import axios from "axios";

const authModule = {
  state: {
    authUser: {},
    isAuthenticated: false,
    token: localStorage.getItem("token") || null
  },
  getters: {
    getUser: state => state.authUser
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
      console.log(data);
      const response = await axios.post(
        "http://localhost:8000/api/user/token/",
        data
      );
      commit("setToken", response.data);
    },
    async getAuthUser({ commit, state }) {
      const response = await axios.get("http://localhost:8000/api/user/me/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${state.token}`
        }
      });
      commit("setAuthUser", response.data);
    }
  },

  mutations: {
    setToken: (state, token) => {
      localStorage.setItem("token", token.token);
      state.token = token.token;
    },
    setAuthUser: (state, user) => {
      state.authUser = user;
      state.isAuthenticated = true;
    },
    removeToken(state) {
      localStorage.removeItem("token");
      state.token = null;
    }
  }
};
export default authModule;
