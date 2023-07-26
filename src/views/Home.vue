<template>
  <v-container>
    <navbar />
    <v-layout>
      <admin-view v-if="getRoleAdmin" />
      <patient-list v-else-if="getRoleDoctor" />
      <doctor-list v-else />
    </v-layout>
  </v-container>
</template>

<script>
import DoctorList from "../components/DoctorList.vue";
import PatientList from "../components/PatientList.vue";
import AdminView from "../components/AdminView.vue";
import Navbar from "../components/Navbar.vue";
import PatientService from "@/services/PatientService";
import DoctorService from "@/services/DoctorService";
import AppointmentService from "@/services/AppointmentService";
export default {
  name: "home",
  components: {
    DoctorList,
    PatientList,
    AdminView,
    Navbar,
  },
  watch: {
    getPatientId: {
      handler: "isPatient",
      immediate: true,
    },
    getDoctorId: {
      handler: "isDoctor",
      immediate: true,
    },
  },
  methods: {
    isPatient() {
      if (this.$store.state.user.authorities[0].name === "ROLE_USER") {
        PatientService.getPatientByUserId(this.$store.state.user.id).then(
          (response) => {
            this.$store.commit("SET_PATIENT", response.data);
          }
        );
        this.setPatientAppointments();
        // PatientService.getCurrentPatientId(this.$store.state.user.id).then(
        //     // eslint-disable-next-line no-unused-vars
        //     (response) => {
        //         this.$store.commit("SET_PATIENT_ID", this.response));
        //     }
        // );
        // console.log(this.$store.state.patientId + " it worked!");
      }
    },
    async setPatientAppointments() {
      AppointmentService.getAppointmentByPatientId(this.$store.state.patientId).then(
        (response) => {
          this.$store.commit("SET_CURRENT_APPOINTMENTS", response.data);
        }
      );
    },
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
    // console.log(this.$store.state.user.authorities[0].name);
    if (this.$store.state.user.authorities[0].name === "ROLE_USER") {
      const currentPatientId = await PatientService.getCurrentPatientId(
        this.$store.state.user.id
      );
      this.$store.commit("SET_PATIENT_ID", parseInt(currentPatientId));
      // console.log(
      //   this.$store.state.patientId,
      //   " CHECKING PATIENT ID IN THE STORE"
      // );
    }
    if (this.$store.state.user.authorities[0].name === "ROLE_DOCTOR") {
      const currentDoctorId = await DoctorService.getCurrentDoctorId(
        this.$store.state.user.id
      );
      this.$store.commit("SET_DOCTOR_ID", parseInt(currentDoctorId));
      // console.log(
      //   this.$store.state.doctorId,
      //   " CHECKING DOCTOR ID IN THE STORE"
      // );
      // const currentAppointments = await AppointmentService.getAppointmentByDoctorId(this.$store.state.doctorId);
      // console.log(currentAppointments);
    }
  },
};
</script>
