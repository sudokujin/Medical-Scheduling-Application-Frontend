<template>
  <v-dialog v-model="isModalOpen" max-width="500">
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
    modal: Boolean, // Rename the prop to 'modal'
    patientDetails: Object,
  },
  data() {
    return {
      isModalOpen: this.modal, // Create a local data property to control the modal
    };
  },
  methods: {
    closeModal() {
      this.isModalOpen = false; // Update the local data property
      this.$emit('close-modal');
    },
  },
  watch: {
    modal(newVal) {
      this.isModalOpen = newVal; // Update the local data property when the prop changes
    },
  },
};
</script>
