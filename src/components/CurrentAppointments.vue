<template>
    <div>
      <h1 class="mb-4">Current Appointments</h1>
      <v-data-table
        :items="appointments"
        :headers="headers"
        hide-default-footer
      ></v-data-table>
    </div>
  </template>
  
  <script>
  import DoctorService from "../services/DoctorService.js";
  
  export default {
    name: "current-appointments",
    data() {
      return {
        appointments: [],
      };
    },
    computed: {
      getDoctorId() {
        return this.$store.getters.getDoctorId;
      },
    },
    watch: {
      getDoctorId: "fetchCurrentAppointments", // Watch for changes in getDoctorId and call fetchCurrentAppointments
    },
    methods: {
      fetchCurrentAppointments() {
        const doctorId = this.getDoctorId;
        // Replace this with a call to fetch the current appointments for the doctor
        DoctorService.getCurrentAppointments(doctorId).then((response) => {
          this.appointments = response.data; // Update the appointments data
        });
      },
    },
    created() {
      this.fetchCurrentAppointments(); // Initial data load
    },
    computed: {
      headers() {
        return [
          { text: "Patient Name", value: "patientName" },
          { text: "Date", value: "date" },
          { text: "Time", value: "time" },
          { text: "Description", value: "description" },
        ];
      },
    },
  };
  </script>
  