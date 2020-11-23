import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "./firebase";
import VueFirestore from "vue-firestore";
import VueQuillEditor from "vue-quill-editor";
import Vuesax from 'vuesax'
import axios from "axios";
import VueCodemirror from 'vue-codemirror'

import 'codemirror/lib/codemirror.css'
import VueMoment from "vue-moment";
Vue.use(VueCodemirror)
Vue.use(VueMoment);
Vue.prototype.$http = axios;
import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax, {
  // options here
})
import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VueSweetalert2);
import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import "quill/dist/quill.bubble.css"; // for bubble theme
import './registerServiceWorker'

Vue.config.productionTip = false;
Vue.use(VueFirestore, {
  key: "id",
  enumerable: true,
});
Vue.use(VueQuillEditor /* { default global options } */ );
Vue.component("GeneralHeader", require("./components/GeneralHeader").default);
let app;

firebase.auth().onAuthStateChanged((user) => {
  store.commit("SET_USER", user);
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }
});