-- /* eslint-disable */
<template>
  <v-container fill-height fluid>
    <navbar />
    <v-col
      align="center"
      justify="center"
      fill-height
      class="d-flex justify-center"
    >
      <div id="appointment" class="text-center">
        <v-card>
          <v-form
            class="px-6 pb-5 pt-6"
            ref="appointmentForm"
            id="appointmentForm"
            v-model="valid"
            @submit.prevent="changeAppointment"
          >
            <v-img
              class="mx-auto"
              src="../assets/caduceus-transparent-background-8.png"
              max-width="50px"
              max-height="100px"
            >
            </v-img>

            <v-select
                :items="['Update', 'Delete']"
                v-model="selected"
                item-text="selected"
                item-value="id"
                return-object
                dense
                outlined
                hide-details
                class="ma-2 pb-6"
                label="Choose: Update or Delete"
            ></v-select>

            <v-select
              :items="this.$store.state.currentAppointments"
              v-model="appointmentObj"
              item-text="appointmentDate"
              item-value="id"
              return-object
              dense
              outlined
              hide-details
              class="ma-2 pb-6"
              label="Your Appointments"
              @change="chosenAppointment"
            >
            </v-select>
<!--            <v-select-->
<!--              :items="this.$store.state.doctors"-->
<!--              v-model="doctorObj"-->
<!--              item-text="firstName"-->
<!--              item-value="id"-->
<!--              return-object-->
<!--              dense-->
<!--              outlined-->
<!--              hide-details-->
<!--              class="ma-2 pb-6"-->
<!--              label="doctors"-->
<!--              @change="chosenDoctor"-->
<!--            ></v-select>-->
<!--            <v-select-->
<!--              :items="timeslots"-->
<!--              v-model="appointment.appointmentTime"-->
<!--              item-text=""-->
<!--              item-value="id"-->
<!--              return-object-->
<!--              dense-->
<!--              outlined-->
<!--              hide-details-->
<!--              class="ma-2 pb-6"-->
<!--              label="timeslots"-->
<!--            ></v-select>-->
            <v-text-field
                v-show="selected === 'Update'"
                v-model="appointmentObj.appointmentDate"
                :counter="100"
                label="Appointment Date"
                prepend-inner-icon="mdi-cake"
                required
            ></v-text-field>

            <v-select
                v-show="selected === 'Update' && appointmentObj.appointmentDate !== ''"
                :items="timeslots"
                v-model="appointmentObj.appointmentTime" t
                dense
                outlined
                hide-details
                class="ma-2 pb-6"
                label="timeslots"
                @change="chosenTime"
            ></v-select>
            <v-text-field
                v-show="selected === 'Update'"
              v-model="appointmentObj.description"
              :counter="100"
              label="Description"
              required
            >
            </v-text-field>
            <v-btn type="submit" :disabled="!valid">Change Appointment</v-btn>
            <v-btn @click="clearInput"> Clear Fields </v-btn>
          </v-form>
        </v-card>
      </div>
    </v-col>
  </v-container>
</template>
<script>
import AppointmentService from "../services/AppointmentService";
import Navbar from "../components/Navbar.vue";
import DoctorTimeService from "../services/DoctorTimeService";
export default {
  name: "UpdateAppointmentForm",

  components: {
    Navbar,
  },
  data: () => ({
    appointment: {
      patientId: 0,
      doctorId: 0,
      appointmentId: 0,
      appointmentDuration: 30,
      description: "",
      appointmentDate: "",
      appointmentTime: "",
    },
    appointmentObj: {
      patientId: 0,
      doctorId: 0,
      appointmentId: 0,
      appointmentDuration: 30,
      description: "",
      appointmentDate: "",
      appointmentTime: "",
    },
    timeslots: [],
    valid: false,
    selected: null,
    dateSelected: null,
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
        return "Date must be in the format YYYY-MM-DD.";
      },
    ],
    timeRules: [
      (value) => {
        if (value) return true;
        return "Time is required.";
      },
      (value) => {
        if (/(([0-1][0-9])|([2][0-3])):([0-5][0-9]):([0-5][0-9])/.test(value))
          return true;
        return "Time must be in the format 00:00:00.";
      },
    ],
  }),
  methods: {
    clearInput() {
      this.$refs.appointmentForm.reset();
    },
    changeAppointment() {

      if(this.selected === 'Update') {
        this.updateAppointment();
      } else {
        this.deleteAppointment();
      }
    },
    updateAppointment() {
      this.appointment.patientId = this.$store.state.patientId;
      AppointmentService.updateAppointment(this.appointmentObj.appointmentId, this.appointmentObj).then(
        (response) => {
          if (response.status === 200) {
            //   this.getTimeslots();
            this.$router.push("/");
            this.$store.state.currentAppointments.commit(
                "updateAppointment",
                this.appointment.appointmentId
            );
          } else {
            console.log("error updating appointment");
          }
        }
      );
      //this.$router.push("/");
    },
    deleteAppointment() {
      this.appointment.patientId = this.$store.state.patientId;
      // appointmentObj = this.$store.state.currentAppointments.filter(currentAppointments => currentAppointments.appointmentDate === this.appointment.appointmentDate);
      this.appointment.appointmentId = this.appointmentObj.appointmentId;
      AppointmentService.deleteAppointment(this.appointment.appointmentId).then(
        (response) => {
          if (response.status === 200) {
            //   this.getTimeslots();
            this.$router.push("/");
            this.$store.state.currentAppointments.commit(
              "deleteAppointment",
              this.appointment.appointmentId
            );
          } else {
            console.log("error deleting appointment");
          }
        }
      );
    },
    getTimeSlotByIdAndDate(id, date) {
      AppointmentService.getTimeArray(id, date).then((response) => {
        this.timeSlots = response.data;
      });
      // service call here to pull data from doctor based on id this.selected and date selected this.dateSelected
      // will i need to add a list of dates as well as a dropdown menu?
    },
    chosenTime() {
      DoctorTimeService.getTimeArray(
          this.appointmentObj.doctorId,
          this.appointmentObj.appointmentDate
      ).then((response) => {
        this.timeslots = response.data;
      });
    },
    chosenDoctor() {
      this.appointment.doctorId = this.doctorObj.doctorId;
      console.log("id", this.doctorObj.doctorId);
      DoctorTimeService.getTimeArray(
        this.appointment.doctorId,
        this.appointment.appointmentDate
      ).then((response) => {
        this.timeslots = response.data;
      });
    },
    chosenAppointment() {
      console.log("id", this.appointment.appointmentId);
      this.appointment.appointmentId = this.appointmentObj.appointmentId;
      AppointmentService.getAppointmentById(
        this.appointment.appointmentId
      ).then((response) => {
        this.appointment = response.data;
      });
      this.chosenTime();
    },
  },
  created() {
    this.appointment.patientId = this.$store.state.currentPatient.patientId;
    AppointmentService.getTimeArray(
      this.appointment.doctorId,
      this.appointment.appointmentDate
    ).then((response) => {
      this.timeSlots = response.data;
    });
  },
};
</script>

<style scoped></style>
