import axios from "axios";

const authModule = {
  state: {
    authUser: {},
    isAuthenticated: false,
    created: {},
    token: localStorage.getItem("token"),
    endpoints: {
      obtainToken: "http://localhost:8000/api/user/token/",
      createUserAcc: "http://localhost:8000/api/user/create/"
    }
  },
  getters: {
    createdUser: state => state.created
  },

  actions: {
    async createUser({ commit }, user) {
      const { name, email, password } = user;
      const data = {
        name: name,
        email: email,
        password: password
      };
      const response = await axios.post(
        "http://localhost:8000/api/user/create/",
        data
      );
      commit("createUserAccount", response.data);
    }
  },

  mutations: {
    createUserAccount: (state, user) => (state.created = user),
    setAuthUser: (state, { authUser, isAuthenticated }) => {
      state.authUser = authUser;
      state.isAuthenticated = isAuthenticated;
    },
    removeToken(state) {
      localStorage.removeItem("token");
      state.token = null;
    }
  }
};
export default authModule;
