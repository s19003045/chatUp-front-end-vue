import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'http://localhost:3000/api'

// Axios setting
const axiosInstance = axios.create({
  baseURL
})
axiosInstance.interceptors.request.use(function (config) {
  const getToken = () => localStorage.getItem('token')
  config.headers['Authorization'] = `Bearer ${getToken()}`;
  return config;
}, function (error) {
  return Promise.reject(error);
})
export const apiHelper = axiosInstance

// sweetalert2 setting
export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})