<template>
    <v-container fill-height fluid>
      <v-col
        align="center"
        justify="center"
        fill-height
        class="d-flex justify-center"
      >
        <v-card>
          <div id="updatePatient" class="text-center">
            <v-form
              class="px-6 pb-5 pt-6"
              ref="updatePatientForm"
              id="userId"
              v-model="valid"
              @submit.prevent="updatePatient()"
            >
              <v-img
                class="mx-auto"
                src="../assets/caduceus-transparent-background-8.png"
                max-width="50px"
                max-height="100px"
              >
              </v-img>
              <h1>Enter Updated Information</h1>
              <v-text-field
                v-model="patient.firstName"
                :rules="nameRules"
                :counter="50"
                label="First name"
                prepend-inner-icon="mdi-rename"
                required
              ></v-text-field>
              <v-text-field
                v-model="patient.lastName"
                :rules="nameRules"
                :counter="50"
                label="Last name"
                prepend-inner-icon="mdi-rename"
                required
              ></v-text-field>
              <v-text-field
                  v-model="patient.emailAddress"
                  :rules="emailRules"
                  :counter="50"
                  label="E-mail"
                  prepend-inner-icon="mdi-email"
                  required
              ></v-text-field>
  
              <v-text-field
                  v-model="patient.address"
                  :rules="nameRules"
                  :counter="100"
                  label="Address"
                  prepend-inner-icon="mdi-map-marker"
                  required
              ></v-text-field>
  
              <v-text-field
                  v-model="patient.city"
                  :rules="nameRules"
                  :counter="50"
                  label="City"
                  prepend-inner-icon="mdi-city"
                  required
              ></v-text-field>
  
              <v-text-field
                  v-model="patient.states"
                  :rules="nameRules"
                  :counter="50"
                  label="State"
                  prepend-inner-icon="mdi-map-marker"
                  required
              ></v-text-field>
  
              <v-text-field
                  v-model="patient.zipcode"
                  :rules="zipcodeRules"
                  :counter="50"
                  label="Zipcode"
                  prepend-inner-icon="mdi-map-marker"
                  required
              ></v-text-field>
  
              <v-text-field
                  v-model="patient.patientNumber"
                  :rules="phoneNumberRules"
                  :counter="50"
                  label="Phone Number"
                  prepend-inner-icon="mdi-phone"
                  required
              ></v-text-field>
  
              <v-text-field
                  v-model="patient.birthdate"
                  :rules="dateRules"
                  :counter="100"
                  label="Birth date"
                  prepend-inner-icon="mdi-cake"
                  required
              ></v-text-field>
  
              <v-btn type="submit" :disabled="!valid"
                >Submit Updated Information</v-btn
              >
  
              <v-btn @click="clearInput"> Clear Fields </v-btn>
            </v-form>
          </div>
        </v-card>
      </v-col>
    </v-container>
  </template>
  
  <script>
  
  import PatientService from "../services/PatientService";
  
  export default {
    name: "UpdatePatientForm",
    data: () => ({
      patient: {
        //user.id = thisUserIdNumber
        patientId: 0,
        userId: 0,
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        states: "",
        zipcode: "",
        emailAddress: "",
        patientNumber: "",
        birthdate: "",
      },
      registrationErrors: false,
      registrationErrorMsg: "There were problems registering this user.",
      valid: false,
      nameRules: [
        (value) => {
          if (value) return true;
  
          return "Name is required.";
        },
        (value) => {
          if (value?.length <= 50) return true;
  
          return "Name must be less than or equal to 50 characters.";
        },
      ],
      emailRules: [
        (value) => {
          if (value) return true;
  
          return "E-mail is required.";
        },
        (value) => {
          if (/.+@.+\..+/.test(value) && value?.length <= 50) return true;
  
          return "E-mail must be valid and less than 50 characters.";
        },
      ],
      zipcodeRules: [
        (value) => {
          if (value) return true;
  
          return "Zipcode is required.";
        },
        (value) => {
          if (/^\d{5}$|^\d{5}-\d{4}$/.test(value)) return true;
  
          return "Zipcode must be at least 5 numbers.";
        },
      ],
      phoneNumberRules: [
        (value) => {
          if (value) return true;
  
          return "Phone number is required.";
        },
        (value) => {
          if (/^[2-9]\d{2}-\d{3}-\d{4}$/.test(value)) return true;
  
          return "Phone number must be in the format 333-444-5555.";
        },
      ],
      dateRules: [
        (value) => {
          if (value) return true;
  
          return "Date is required.";
        },
        // eslint-disable-next-line
        /* eslint-disable */
        (value) => {
          if (
              /^\d{4}[\-\/\s]?((((0[13578])|(1[02]))[\-\/\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\-\/\s]?(([0-2][0-9])|(30)))|(02[\-\/\s]?[0-2][0-9]))$/.test(
                  value
              )
          )
            return true;
  
          return "Date must be in format YYYY-MM-DD.";
        },
      ],
    }),
    methods: {
      clearErrors() {
        this.registrationErrors = false;
        this.registrationErrorMsg = "There were problems registering this user.";
      },
      clearInput() {
        this.$refs.updatePatientForm.reset();
      },
      updatePatient() {
        PatientService.updatePatient(this.patient.patientId, this.patient).then(
          (response) => {
            if (response.status === 200) {
              this.$router.push("/");
            }
          }
        );
      },
    },
    created() {
      this.patient.userId = this.$store.state.patientToUpdate.userId;
      this.patient.patientId = this.$store.state.patientToUpdate.patientId;
      this.patient = this.$store.state.patientToUpdate;
      // console.log("start");
      // console.log(this.$store.state.doctorToUpdate);
      // console.log("end");
    },
  };
  </script>