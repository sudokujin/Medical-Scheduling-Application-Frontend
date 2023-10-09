<template>
  <v-container>
    <navbar />
    <v-layout>
      <doctor-list v-if="getRoleDoctor" />
      <patient-list v-else-if="getRolePatient" />
      <admin-view v-else />
    </v-layout>
    <v-layout v-if="getRoleDoctor">
      <current-appointments />
    </v-layout>
  </v-container>
</template>

<script>
import DoctorList from "../components/DoctorList.vue";
import PatientList from "../components/PatientList.vue";
import AdminView from "../components/AdminView.vue";
import Navbar from "../components/Navbar.vue";
import CurrentAppointments from "../components/CurrentAppointments.vue"; // Import the new component

export default {
  name: "home",
  components: {
    DoctorList,
    PatientList,
    AdminView,
    Navbar,
    CurrentAppointments, // Add the new component to the components object
  },
  watch: {
    getDoctorId: {
      handler: "isDoctor",
      immediate: true,
    },
  },
  methods: {
    isDoctor() {
      if (this.$store.state.user.authorities[0].name === "ROLE_DOCTOR") {
        // DoctorService.getDoctorByUserId(this.$store.state.user.id).then(
        //     (response) => {
        //         this.$store.commit("SET_DOCTOR", response.data);
        //     }
        // );
        DoctorService.getCurrentDoctorId(this.$store.state.user.id).then(
          // eslint-disable-next-line no-unused-vars
          (response) => {
            this.$store.commit("SET_DOCTOR_ID", parseInt(this.response));
          }
        );
      }
    },
  },
  computed: {
    getRoleAdmin() {
      return this.$store.state.user.authorities[0].name === "ROLE_ADMIN";
    },
    getRolePatient() {
      return this.$store.state.user.authorities[0].name === "ROLE_USER";
    },
    getRoleDoctor() {
      return this.$store.state.user.authorities[0].name === "ROLE_DOCTOR";
    },
  },
  async created() {
    if (this.$store.state.user.authorities[0].name === "ROLE_USER") {
      const currentPatientId = await PatientService.getCurrentPatientId(
        this.$store.state.user.id
      );
      this.$store.commit("SET_PATIENT_ID", parseInt(currentPatientId));
    }
    if (this.$store.state.user.authorities[0].name === "ROLE_DOCTOR") {
      const currentDoctorId = await DoctorService.getCurrentDoctorId(
        this.$store.state.user.id
      );
      this.$store.commit("SET_DOCTOR_ID", parseInt(currentDoctorId));
    }
  },
};
</script>
