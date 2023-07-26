import axios from 'axios';
const http = axios.create({
    baseURL:"https://medical-scheduler-spring-boot.herokuapp.com/"
});

export default{
    getAppointments() {
        return http.get(`/appointments`);
    },
    getAppointmentById(id) {
        return http.get(`/appointments/${id}`);
    },
    getAppointmentByPatientId(id) {
        return http.get(`/appointments/patient/${id}`);
    },
    getAppointmentByDoctorId(id){
        return http.get(`/appointments/doctor/${id}`);
    },
    getAppointmentbyDate(appointmentDate) {
      return http.get(`/appointments/date/${appointmentDate}`);
    },
    createAppointment(appointment) {
        return http.post('/appointments', appointment);
    },
    updateAppointment(id, appointment) {
        return http.put(`/appointments/${id}`, appointment);
    },
    deleteAppointment(id) {
        return http.delete(`/appointments/${id}`)
    },

    getPatientAppointmentsByUserId(userId) {
        return http.get(`/appointments/patient/user/${userId}`)
    },

    getDoctorAppointmentsByUserId(userId) {
        return http.get(`/appointments/doctor/user/${userId}`)
    }
}