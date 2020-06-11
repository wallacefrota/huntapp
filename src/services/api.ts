import axios from 'axios';
// url base api
const api = axios.create({
    baseURL: 'http://rocketseat-node.herokuapp.com/api'
});

export default api;