<template>
  <v-container>
    <nav-bar />
    <div class="main">
      <h2>Rating summary for all doctors</h2>
      <p class="description">{{ this.title }}</p>

      <div class="well-display">

        <div class="well">
          <span class="amount" v-on:click="filter = 1">{{
            numberOfOneStarReviews
          }}</span>
          <v-rating
            hover
            length="1"
            readonly
            size="15"
            color="yellow"
            value="1"
          ></v-rating>
        </div>

        <div class="well">
          <span class="amount" v-on:click="filter = 2">{{
            numberOfTwoStarReviews
          }}</span>
          <v-rating
            hover
            length="2"
            readonly
            size="15"
            color="yellow"
            value="2"
          ></v-rating>
        </div>

        <div class="well">
          <span class="amount" v-on:click="filter = 3">{{
            numberOfThreeStarReviews
          }}</span>
          <v-rating
            hover
            length="3"
            readonly
            size="15"
            color="yellow"
            value="3"
          ></v-rating>
        </div>

        <div class="well">
          <span class="amount" v-on:click="filter = 4">{{
            numberOfFourStarReviews
          }}</span>
          <v-rating
            hover
            length="4"
            readonly
            size="15"
            color="yellow"
            background-color="orange lighten-3"
            value="4"
          ></v-rating>
        </div>

        <div class="well">
          <span class="amount" v-on:click="filter = 5">{{
            numberOfFiveStarReviews
          }}</span>
          <v-rating
            length="5"
            readonly
            size="15"
            color="yellow"
            value="5"
          ></v-rating>
        </div>
      </div>

      <a id="show-form-button" href="#" v-on:click.prevent="getItem"
        >Create Review</a
      >
      <v-col fill-height class="d-flex justify-start">
        <v-card>
          <v-form
            class="px-6 pb-5 pt-6"
            v-on:submit.prevent="addNewReview"
            v-if="showForm === true"
          >
            <div class="form-element">
              <label for="reviewer">Name:</label>
              <input
                id="reviewer"
                type="text"
                v-model="newReview.patientName"
              />

              <v-select
                :items="this.$store.state.doctors"
                v-model.number="newReview.doctorId"
                item-text="firstName"
                item-value="id"
                return-object
                dense
                outlined
                hide-details
                class="ma-2 pb-6"
                label="Pick a doctor to review!"
                @change="chosenDoctor"
              ></v-select>
              <!-- patient name here based on patient id -->
            </div>
            <div class="form-element">
              <label for="title">Title:</label>
              <input id="title" type="text" v-model="newReview.reviewTitle" />
              <!-- review title here based on patient id/doc id/review id -->
            </div>
            <div class="form-element">
              <v-rating
                v-model.number="newReview.reviewRating"
                bg-color="orange-lighten-1"
                color="yellow"
              ></v-rating>
            </div>
            <div class="form-element">
              <label for="review">Review:</label>
              <textarea id="review" v-model="newReview.reviewBody"></textarea>
              <!-- review_body based on patient id/doc id/review id -->
            </div>

            <v-btn type="submit">Submit Review</v-btn>
            <!-- post to database review table on submit button being clicked -->
            <v-btn @click="resetForm">Clear Fields</v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-select
        :items="this.$store.state.doctors"
        v-model="doctorObj"
        item-text="firstName"
        item-value="doctorId"
        return-object
        dense
        outlined
        hide-details
        class="ma-2"
        label="Pick a Doctor to see their reviews!"
        @change="chosenDoctor"
      ></v-select>

      <div
        class="review"
        v-for="review in filteredReviews"
        v-bind:key="review.id"
      >
        <!-- loop over review objects based on a filtered review list of doctors by id , do not need favorited section line 77-->
        <h4>{{ review.patientName }}</h4>
        <!-- patient name here based on patient id -->
        <v-row>
          <div class="rating">
            <v-rating
              v-model="review.reviewRating"
              color="yellow"
              background-color="yellow lighten-3"
              readonly
            ></v-rating>
          </div>
          <h3>{{ review.reviewTitle }}</h3>
        </v-row>
        <p>{{ review.reviewBody }}</p>
      </div>
    </div>
  </v-container>
</template>
<script>
import reviewService from "../services/ReviewService.js";
import navBar from "./Navbar.vue";

export default {
  name: "reviews",
  components: {
    navBar,
  },
  data() {
    return {
      doctorName: "",
      doctorId: null,
      patientName: "",
      patientId: null,
      title:
        "Research our doctors so you can make the best choice for your needs!",
      newReview: {
        patientId: "",
        doctorId: "",
        reviewRating: "",
        reviewTitle: "",
        reviewBody: "",
        reviewDate: "",
      },
      createReview: false,
      filter: 0,
      reviews: [],
      selectedDoctorId: null,
      doctors: [],
      doctorObj: {},
      //currentDate:
    };
  },
    // watch: {
    //   refreshPage: {
    //       handler: "refreshComponent",
    //       immediate: true
    //   }
    // },
  methods: {
    getAllReviews() {
      reviewService.getAllReviews().then((response) => {
        // console.log(response.data);
        this.reviews = this.$store.state.reviews;
        this.$store.commit("SET_REVIEWS", response.data);
      });
    },
    chosenDoctor() {
      this.selectedDoctorId = this.doctorObj.doctorId;
    },
    addNewReview() {
      this.newReview.patientId = 1;
      // eslint-disable-next-line no-undef
      this.newReview.doctorId = this.selectedDoctorId;
      let date = new Date();
      let year = date.getFullYear();
      let month = String(date.getMonth() + 1).padStart(2, "0");
      let day = String(date.getDate()).padStart(2, "0");
      this.newReview.reviewDate = `${year}-${month}-${day}`;
      reviewService.createReview(this.newReview).then((response) => {
        if (response.status === 201) {
          // this.$router.push('/reviews');
          this.getAllReviews();
        }
      });
    },
    getReviewsByDoctor() {
      reviewService.getReviewsByDoctorId();
    },
    resetForm() {
      this.newReview = {};
      this.showForm = false;
    },
    numberOfReviews(numOfStars) {
      const reviewsWithNumStars = this.reviews.filter(
        (review) => review.reviewRating === numOfStars
      );
      return reviewsWithNumStars.length;
    },
    getReviewsByDoctorId(doctorId) {
      return this.reviews.filter((review) => review.doctorId === doctorId);
    },
    getItem() {
      this.item = "";
      this.$router.push({ name: "createReview" });
    },
  },
  computed: {
    averageRating() {
      let sum = this.reviews.reduce((currentSum, review) => {
        return currentSum + review.rating;
      }, 0);
      return (sum / this.reviews.length).toFixed(2);
    },
    numberOfOneStarReviews() {
      return this.numberOfReviews(1);
    },
    numberOfTwoStarReviews() {
      return this.numberOfReviews(2);
    },
    numberOfThreeStarReviews() {
      return this.numberOfReviews(3);
    },
    numberOfFourStarReviews() {
      return this.numberOfReviews(4);
    },
    numberOfFiveStarReviews() {
      return this.numberOfReviews(5);
    },
    filteredReviews() {
      // filtered reviews will grab review list, and filter through them based on the doctor id to display each doctors reviews
      // maybe I need a drop down menu like v-calendar to choose which doctor to see reviews for?? This way I can get the id and compare
      // to the review id
      return this.reviews.filter(
        (review) => review.doctorId === this.doctorObj.doctorId
      );
    },
  },
  created() {
    this.getAllReviews();
    this.doctors = this.$store.state.doctors;
  },
};
</script>

<style scoped>
div.main {
  margin: 1rem 0;
}

div.main div.well-display {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}

div.main div.well-display div.well {
  display: inline-block;
  width: 15%;
  border: 1px black solid;
  border-radius: 6px;
  text-align: center;
  margin: 0.25rem;
  padding: 0.25rem;
}

div.main div.well-display div.well span.amount {
  color: darkslategray;
  display: block;
  font-size: 2.5rem;
}

div.main div.review {
  border: 1px black solid;
  border-radius: 6px;
  padding: 1rem;
  margin: 10px;
}

div.main div.review.favorited {
  background-color: lightyellow;
}

div.main div.review div.rating {
  height: 2rem;
  display: inline-block;
  vertical-align: top;
  margin: 0 0.5rem;
}

div.main div.review div.rating img {
  height: 100%;
}

div.main div.review p {
  margin: 20px;
}

div.main div.review h3 {
  display: inline-block;
}

div.main div.review h4 {
  font-size: 1rem;
}

div.form-element {
  margin-top: 10px;
}
div.form-element > label {
  display: block;
}
div.form-element > input,
div.form-element > select {
  height: 30px;
  width: 300px;
}
div.form-element > textarea {
  height: 60px;
  width: 300px;
}
form > input[type="button"] {
  width: 100px;
}
form > input[type="submit"] {
  width: 100px;
  margin-right: 10px;
}
</style>
