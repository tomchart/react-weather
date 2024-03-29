import axios from "axios";

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

function get(url) {
  return apiClient.get('/sanctum/csrf-cookie')
    .then(() => {
      return apiClient.get(url);
    })
};

function post(url, data) {
  return apiClient.get('/sanctum/csrf-cookie')
    .then(() => {
      return apiClient.post(url, data);
    })
};

export default {get, post};
