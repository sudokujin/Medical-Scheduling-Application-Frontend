<template>
  <v-container fill-height fluid>
    <v-row justify="center">
      <v-col class="mx-16 px-16">
        <h1 class="mb-6">What's up, doc?</h1>
        <v-divider class="mb-16"> </v-divider>
        <div class="display-1 ma-2 mt-16">Patients</div>
        <v-card>
        <v-data-table
          :items="this.$store.state.patients"
          :headers="headers"
          hide-default-footer
        >
        </v-data-table>
        </v-card>
        <v-btn class="mt-3" @click="goToUpdateForm()"> Change Appointment </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import patientService from "../services/PatientService.js";

export default {
  name: "patient-list",
  computed: {
    headers() {
      return [
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "Email Address", value: "emailAddress" },
        { text: "City", value: "city" },
        { text: "State", value: "states" },
      ];
    },
  },
  watch: {
    getDoctorId: "getPatients", // Watch for changes in getDoctorId and call getPatients
  },
  methods: {
    getPatients() {
      let doctorId = this.$store.getters.getDoctorId;
      patientService.getPatientByBookedAppointment(doctorId).then((response) => {
        this.$store.commit("SET_PATIENTS", response.data);
      });
    },
    goToUpdateForm() {
      this.item = "";
      this.$router.push({ name: "updateDoctorAppointments" });
    }
  },
  data() {
    return {
      patients: [],
    };
  },
  created() {
    this.getPatients();
  },
};
</script>
