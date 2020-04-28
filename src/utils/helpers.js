import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'http://localhost:3000/api'

// Create an Axios instance with basic setting
const axiosInstance = axios.create({
  baseURL
})
// Modify request with custom headers
axiosInstance.interceptors.request.use(function (config) {
  const getToken = () => localStorage.getItem('token')
  config.headers['Authorization'] = `Bearer ${getToken()}`;
  return config;
}, function (error) {
  return Promise.reject(error);
})
// Allow use for connect to API
export const apiHelper = axiosInstance

// Sweetalert2 basic setting and allow use for alert
export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})