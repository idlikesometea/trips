import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000/api/p/',
});

const authedApi = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        authorization: localStorage.getItem('authToken')
    }
});

export {
    api,
    authedApi
};