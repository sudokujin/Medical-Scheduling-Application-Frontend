import axios from 'axios';

/* eslint-disable */
var userId = 5;

const http = axios.create({
    baseURL: "https://medical-scheduler-spring-boot.herokuapp.com/"
});

export default {
    getPatientList() {
        return http.get('/patients');
    },
    getPatientByUserId(id) {
        return http.get(`/patients/user/${id}`)
    },
    update(id, patient) {
        return http.put(`/patients/${id}`, patient);
    },

    delete(id) {
        return http.delete(`/patients/${id}`);
    },

    create(patient) {
        return http.post(`/patients`, patient);
    },
    async getMaxId() {
        let config = {
            headers: {
                'Accept': 'application/json'
            }
        }
        const response = await http.get('/patients/maxId', config)
        this.response = JSON.parse(response.data.userId);
       // console.log(this.response);
        return this.response
    },
    getUserName() {
        return http.get(`/patients/currentUserName`);
    },
     async getCurrentPatientId(userId) {
        let config = {
            headers: {
                'Accept' : 'application/json'
            }
        }
        const response = await http.get(`/patients/getPatientId/${userId}`, config);
        let patientId = JSON.parse(response.data.patientId);
        console.log(patientId);
        return patientId;
    }
}
