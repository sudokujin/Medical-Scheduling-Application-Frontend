<template>
  <v-container fill-height fluid>
    <h1 class="mb-6">Admin View</h1>
    <v-row justify="center">
      <v-col class="mx-16 px-16">
        <v-divider> </v-divider>
        <div class="display-1 ma-4 d-flex justify-center">Doctors</div>

        <v-card>
          <v-data-table
            :items="this.$store.state.doctors"
            :headers="headers"
            hide-default-footer
            v-model="doctorObj"
            item-key="id"
          >
            <template v-slot:[`item.action`]="{ item }">
              <v-icon @click="getDocById(item.doctorId)"
                >mdi-pencil-circle-outline</v-icon
              >
              <v-icon @click="removeDoctor(item.doctorId)"
                >mdi-trash-can-outline</v-icon
              >
            </template>
          </v-data-table>
        </v-card>
        <v-btn class="mt-3" @click="getItem()"> Add Doctor </v-btn>
      </v-col>
    </v-row>
    <div class="display-1 ma-4 d-flex justify-center">Patients</div>
    <v-card>
      <v-data-table
          :items="this.$store.state.patients"
          :headers="patientHeaders"
          hide-default-footer
          v-model="patientObj"
          item-key="id"
      >
        <template v-slot:[`item.action`]="{ item }">
          <v-icon @click="getPatientById(item.patientId)"
          >mdi-pencil-circle-outline</v-icon
          >
          <v-icon @click="removePatient(item.patientId)"
          >mdi-trash-can-outline</v-icon
          >
          </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import doctorService from "../services/DoctorService.js";
import patientService from "../services/PatientService";

export default {
  name: "doctor-list",
  computed: {
    headers() {
      return [
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "Specialty", value: "specialty" },
        { text: "Suite", value: "suiteNumber" },
        { text: "Cost Per Hour", value: "costPerHour" },
        { text: "Phone Extension", value: "phoneNumber" },
        { text: "", value: "action" },
      ];
    },
    patientHeaders() {
      return [
        {text: "First Name", value: "firstName"},
        {text: "Last Name", value: "lastName"},
        {text: "Address", value: "address"},
        {text: "City", value: "city"},
        {text: "State", value: "states"},
        {text: "Zipcode", value: "zipcode"},
        {text: "Phone Number", value: "patientNumber"},
        {text: "Birthdate", value: "birthdate"},
        {text: "", value: "action"}
      ]
    }
  },
  methods: {
    updateDoctor() {
      this.$router.push("/updateDoctor");
    },
    getDoctors() {
      doctorService.getAllDoctors().then((response) => {
        this.$store.commit("SET_DOCTORS", response.data);
      });
    },
    getItem() {
      this.item = "";
      this.$router.push({ name: "doctorAccount" });
    },
    removeDoctor(id) {
      doctorService.deleteDoctor(id).then((response) => {
        if (response.status === 200) {
          this.getDoctors();
        }
      });
    },
    getDocById(id) {
      doctorService.get(id).then((response) => {
        this.$store.commit("SET_DOCTORTOUPDATE", response.data);
        this.$router.push(`/updateDoctor/${id}`);
      });
    },
    getPatients() {
      patientService.getAllPatients().then((response) => {
        this.$store.commit("SET_PATIENTS", response.data);
      });
    },
    getPatientById(id) {
      patientService.getPatientById(id).then((response) => {
        this.$store.commit("SET_PATIENTTOUPDATE", response.data);
        this.$router.push(`/updatePatient/${id}`);
      });
    },
    updatePatient() {
      this.$router.push("/updatePatient");
    },
    removePatient(id) {
      patientService.deletePatient(id).then((response) => {
        if (response.status === 200) {
          this.getPatients();
        }
      });
    }
  },
  data() {
    return {
      doctors: [],
      item: "hello",
      patients: []
    };
  },
  created() {
    this.getDoctors();
    this.getPatients();
  },
};
</script>
<style scoped></style>