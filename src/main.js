import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from './firebase'
import VueFirestore from 'vue-firestore'
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.config.productionTip = false
Vue.use(VueFirestore, {
  key: 'id',
  enumerable: true
})
Vue.use(VueQuillEditor, /* { default global options } */ )
Vue.component('GeneralHeader',require("./components/GeneralHeader").default)
let app;

firebase.auth().onAuthStateChanged(user => {
  store.commit('SET_USER', user)
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});