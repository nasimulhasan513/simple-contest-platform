import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import UserProfile from '../views/Userprofile.vue'
import * as firebase from "firebase/app";
import "firebase/auth";
import {
  db
} from '@/firebase'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/user',
    name: 'UserProfile',
    component: UserProfile,
  },
  {
    path: '/submissions',
    name: 'Submissions',
    component: () => import("../views/SubmissionPanel.vue")
  },



  {
    path: '/questions',
    component: () => import("../views/AllQuestions.vue")
  },
  {
    path: '/questions/:id',
    name: 'SingleQuestions',
    component: () => import( /* webpackChunkName: "questions" */ '../views/questions/SingleQuestion.vue')
  },
  {
    path: '/leaderboard',
    component: () => import("../views/Leaderboard.vue")
  },
  //from template
  {
    path: '/admin',
    component: () => import('@/views/dashboard/Index'),
    meta: {
      requiresadminAuth: true
    },
    children: [
      // Dashboard
      {
        name: 'Dashboard',
        path: '',
        component: () => import('@/views/admin/index'),
      },
      // Pages
      {
        name: 'User Profile',
        path: 'account',
        meta: {
          authrize: ['student']
        },
        component: () => import('@/views/dashboard/pages/UserProfile'),
      },
      {
        name: 'Notifications',
        path: 'components/notifications',
        component: () => import('@/views/dashboard/component/Notifications'),
      },
      {
        path: 'addquestion',
        name: 'AddQuestion',
        component: () => import( /* webpackChunkName: "admin" */ '../views/admin/questions/add.vue')
      },
      {
        path: 'questions',
        name: 'Question',
        component: () => import( /* webpackChunkName: "admin" */ '../views/admin/questions/index.vue')
      },
      {
        path: 'subjects',
        name: 'Subjects',
        component: () => import( /* webpackChunkName: "admin" */ '../views/admin/subjects/index.vue')
      },
      {
        name: 'Typography',
        path: 'components/typography',
        component: () => import('@/views/dashboard/component/Typography'),
      },
      // Users
      {
        name: 'Users',
        path: 'users',
        component: () => import('@/views/admin/users.vue'),
      },

    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresadminAuth = to.matched.some(record => record.meta.requiresadminAuth)
  const isAuthenticated = firebase.auth().currentUser;
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (requiresadminAuth) {
    if (isAuthenticated) {
      db.collection('user').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (doc.id == isAuthenticated.uid) {
              if (doc.data().role == 'admin') {
                next()
              } else {
                next('/')
              }
            }
          });
        })
    }
  } else {
    next()
  }
})
export default router