import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import store from "./store/index";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faTrashAlt, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Axios from "axios";

library.add(faPlus);
library.add(faTrashAlt);
library.add(faPen);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
