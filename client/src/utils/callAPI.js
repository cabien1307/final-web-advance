import axios from "axios";

const callAPI = axios.create({
    baseURL: 'http://localhost:3000/',
});

callAPI.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default callAPI;