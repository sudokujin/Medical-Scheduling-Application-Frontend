/* eslint-disable */
<template>
  <v-container fill-height fluid>
    <navbar />
    <v-col justify="center" fill-height class="d-flex justify-center">
      <div id="newReviewForm" class="text-center">
        <v-card>
          <v-form
            class="px-6 pb-5 pt-6"
            ref="newReviewForm"
            id="newReviewForm"
            v-model="valid"
            @submit.prevent="createReview"
          >
            <v-img
              class="mx-auto"
              src="../assets/caduceus-transparent-background-8.png"
              max-width="50px"
              max-height="100px"
            >
            </v-img>
            <h1>Please Enter Review Information</h1>
            <v-select
              :items="this.$store.state.doctors"
              v-model="doctorObj"
              item-text="firstName"
              item-value="id"
              return-object
              dense
              outlined
              hide-details
              class="ma-2 pb-6"
              label="doctors"
              @change="chosenDoctor"
            ></v-select>
              <v-text-field
                  v-model="newReview.reviewTitle"
                  :rules="nameRules"
                  :counter="50"
                  label="Name for review"
                  prepend-inner-icon="mdi-rename"
                  required
              ></v-text-field>

              <v-rating
                  v-model.number="newReview.reviewRating"
                  bg-color="orange-lighten-1"
                  color="yellow"
              ></v-rating>

            <v-text-field
              v-model="newReview.reviewBody"
              :counter="100"
              label="Description"
              required
            >
            </v-text-field>

            <v-btn type="submit" :disabled="!valid">Create Review</v-btn>
            <v-btn @click="clearInput"> Clear Fields </v-btn>
          </v-form>
        </v-card>
      </div>
    </v-col>
  </v-container>
</template>

<script>
import reviewService from "@/services/ReviewService";
import Navbar from "../components/Navbar.vue";

export default {
  name: "newReviewForm",
  components: {
    Navbar,
  },
  data: () => ({
      doctorName: "",
      doctorId: null,
      patientName: "",
      patientId: null,
      newReview: {
          patientId: "",
          doctorId: "",
          reviewRating: "",
          reviewTitle: "",
          reviewBody: "",
          reviewDate: "",
      },
    timeslots: [],
    valid: false,
    selected: null,
      doctors: [],
      doctorObj: {},
  }),
  methods: {
    clearInput() {
      this.$refs.reviewForm.reset();
    },
    createReview() {
      this.newReview.patientId = this.$store.state.patientId;
      // console.log(this.newReview.patientId + " checking review patient Id");
        let date = new Date();
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, "0");
        let day = String(date.getDate()).padStart(2, "0");
        this.newReview.reviewDate = `${year}-${month}-${day}`;
      reviewService.createReview(this.newReview).then(
        (response) => {
          if (response.status === 201) {
              this.$router.push({ name: "reviews" });
          }
        }
      );
      this.$router.push("/");
    },
      // service call here to pull data from doctor based on id this.selected and date selected this.dateSelected
      // will i need to add a list of dates as well as a dropdown menu?
    chosenDoctor() {
      this.newReview.doctorId = this.doctorObj.doctorId;
        this.newReview.patientId = this.$store.state.patientId;
        // console.log("id", this.doctorObj.doctorId);
    },
  },
  created() {
    this.newReview.patientId = this.$store.state.patientId;
  },
};
</script>
