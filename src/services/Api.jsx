import axios from "axios";

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

function get(url) {
  apiClient.get('/sanctum/csrf-cookie')
  return apiClient.get(url);
};

function post(url, data) {
  apiClient.get('/sanctum/csrf-cookie')
    return apiClient.post(url, data)
};

export default {get, post};
