import axios from 'axios';

const http = axios.create({
  baseURL:"https://medical-scheduling-application.herokuapp.com/"
});

export default {

  login(user) {
    return http.post('/login', user)
  },

  register(user) {
    return http.post('/register', user)
  }

}
