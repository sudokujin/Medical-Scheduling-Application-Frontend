import axios from 'axios';

const http = axios.create({
    baseURL: "https://medical-scheduler-spring-boot.herokuapp.com/"
});

export default {
    getTime(id) {
        return http.get(`/time/${id}`);
    },
    getAllTimeSlots() {
        return http.get(`/time`);
    },
    deleteStartTime(id) {
        return http.delete(`/time/delete/start/${id}`)
    },
    deleteEndTime(id) {
        return http.delete(`/time/delete/end/${id}`)
    },
    updateStartTime(id, doctorTime) {
        return http.update(`/time/update/start/${id}`, doctorTime)
    },
    updateEndTime(id, doctorTime) {
        return http.update(`/time/update/end/${id}`, doctorTime)
    },
    updateBothStartAndEndTime(id, doctorTime) {
        return http.update(`/time/update/startandend/${id}`, doctorTime)
    },
    createStartTime(doctorTime){
        return http.create(`/time/create/start`, doctorTime)
    },
    createEndTime(doctorTime){
        return http.create(`/time/create/end`, doctorTime)
    },
    getTimeArray(id, date) {
        return http.get(`/time/array/${id}/${date}`)
    }
}