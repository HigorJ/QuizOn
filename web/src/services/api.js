import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

api.interceptors.response.use(function(response) {
    return response;
}, function(error) {
    if(error.response.status === 400) {
        return error.response.data.error;
    }
});

export default api;