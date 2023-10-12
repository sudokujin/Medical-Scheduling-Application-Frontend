<template>
    <v-dialog v-model="modal" max-width="500">
      <v-card>
        <v-card-title>
          Patient Details
        </v-card-title>
        <v-card-text>
          <!-- Display patient details here -->
          <div>Patient Name: {{ patientDetails.name }}</div>
          <!-- Add more patient details as needed -->
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="closeModal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: {
      modal: Boolean,
      patientDetails: Object,
    },
    methods: {
      closeModal() {
        this.$emit('close-modal');
      },
    },
  };
  </script>
  