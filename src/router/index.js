import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Register from '../views/Register.vue'
import store from '../store/index'
import Calendar from '../components/Calendar.vue'
import AppointmentForm from '../components/AppointmentForm.vue'
import Patient from '../views/Patient.vue'
import DoctorAccount from '../components/DoctorAccount'
import UpdateDoctorForm from '../components/UpdateDoctorForm'
import RegisterDoctorForm from '../components/RegisterDoctorForm'
import ReviewView from '../views/ReviewView'
import CreateReview from "@/components/CreateReview.vue";
import UpdateAppointmentForm from "@/components/UpdateAppointmentForm.vue";


Vue.use(Router)

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/patientInfo",
      name: "patientInfo",
      component: Patient,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/doctorInfo",
      name: "doctorInfo",
      component: RegisterDoctorForm,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/calendar",
      name: "calendar",
      component: Calendar,
      meta: {
        requiresAuth: true
      }
    },
     {
      path: "/doctors/:id",
      name: "doctor",
      component: AppointmentForm,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/appointments/:id",
      name: "updateAppointment",
      component: UpdateAppointmentForm,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/reviews",
      name: "reviews",
      component: ReviewView,
      meta: {
        requiresAuth: false,
        reload: true
      }
    },
      {
      path: "/doctorAccount",
      name: "doctorAccount",
      component: DoctorAccount,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/updateDoctor/:id",
      name: "UpdateDoctorForm",
      component: UpdateDoctorForm,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/reviews/createReview",
      name: "createReview",
      component: CreateReview,
      meta: {
        requiresAuth: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === '') {
    next("/login");
  } else {
    // Else let them go to their next destination
    next();
  }
});

export default router;
