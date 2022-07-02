import axios from "axios";

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

function get(url) {
  // .then and return promise with await
  return apiClient.get('/sanctum/csrf-cookie')
    .then((response) => {
      return apiClient.get(url);
    })
};

function post(url, data) {
  return apiClient.get('/sanctum/csrf-cookie')
    .then((response) => {
      return apiClient.post(url, data);
    })
};

export default {get, post};
