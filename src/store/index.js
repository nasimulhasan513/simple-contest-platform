import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase/app";
import "firebase/firestore";
import router from '@/router'
import {
  db
} from "@/firebase";
import "firebase/auth";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    error: "",
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    role: null,
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_ERROR(state, payload) {
      state.error = payload;
    },
    SET_BAR_IMAGE(state, payload) {
      state.barImage = payload
    },
    SET_DRAWER(state, payload) {
      state.drawer = payload
    },
  },
  actions: {
    userRegistration({
      commit
    }, payload) {
      let user;
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((res) => {
          user = res.user;
          user.updateProfile({
            displayName: payload.name,
          });
        })
        .then(() => {
          const authUser = firebase.auth().currentUser;
          commit("SET_USER", authUser);

          db.collection("user")
            .doc(authUser.uid)
            .set({
              name: payload.name,
              email: authUser.email,
              score: 0,
              role: "student",
              solved: [],
              unsolved: [],
            })
        }).then(() => {
          router.push('/')
        })
        .catch((error) => {
          commit("SET_ERROR", error);
        });
    },
    userLogin({
      commit
    }, payload) {
      commit("SET_ERROR", "");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          let user = firebase.auth().currentUser;
          commit("SET_USER", user);
        }).then(() => {
          router.push('/')
        })

        .catch((err) => {
          commit("SET_ERROR", err);
        });
    },
    async loginWithGoogle({
      commit
    }) {
      commit("SET_ERROR", "");
      await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((res) => {
          const authUser = res.user;
          commit("SET_USER", authUser);
          const usersRef = db.collection("user").doc(authUser.uid);
          usersRef
            .get()
            .then((docSnapshot) => {
              if (!docSnapshot.exists) {
                usersRef.set({
                  name: authUser.displayName,
                  email: authUser.email,
                  score: 0,
                  role: "student",
                  solved: [],
                  unsolved: [],
                });
              }
            }).then(() => {
              router.push('/')
            })
        })
        .catch((error) => {
          commit("SET_ERROR", error);
        });
    },
    logOut() {
      firebase.auth().signOut();
    },
    

  },
  getters: {
    loginstatus(state) {
      return state.user !== null && state.user !== undefined;
    },
    getUser(state) {
      return state.user;
    },
  },
  modules: {},
});