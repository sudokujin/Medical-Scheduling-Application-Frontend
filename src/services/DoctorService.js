import axios from 'axios';
/* eslint-disable */
var userId = 5;
const http = axios.create({
    baseURL: "https://medical-scheduler-spring-boot.herokuapp.com/"
});

export default {
    getAllDoctors() {
        return http.get('/doctors');
    },

    get(id) {
        return http.get(`/doctors/${id}`);
    },

    createDoctor(doctor) {
        return http.post('/doctors', doctor);
    },
    
    updateDoctor(id, doctor) {
        return http.put(`/doctors/${id}`, doctor);
    },

    deleteDoctor(id) {
        return http.delete(`/doctors/${id}`);
    },
    async getMaxId() {
        let config = {
            headers: {
                'Accept': 'application/json'
            }
        }
        const response = await http.get('/doctors/maxId', config)
        this.response = JSON.parse(response.data.userId);
        console.log(this.response);
        return this.response;
    },
    async getCurrentDoctorId(userId) {
        let config = {
            headers: {
                'Accept' : 'application/json'
            }
        }
        const response = await http.get(`/doctors/getDoctorId/${userId}`, config);
        let doctorId = JSON.parse(response.data.doctorId);
        console.log(doctorId);
        return doctorId;
    },
    getDoctorByUserId(id) {
        
    }
}