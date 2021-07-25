import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

api.interceptors.request.use(function(request) {
    let token = localStorage.getItem('@application_token');

    request.headers['token'] = token;

    return request;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(function(response) {
    return response;
}, function(error) {
    console.error(error);
    if(error.response.status === 400 || error.response.status === 401 || error.response.status === 500) {
        throw error.response.data.error;
    }
});

export default api;