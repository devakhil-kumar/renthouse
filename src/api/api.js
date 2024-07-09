import axios from 'axios';
import { API_ROUTES } from './constant';

const BASE_URL = 'http://95.216.209.46:5500/api/'; // Replace with your actual API base URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginAPI = (userData) => {
  return axiosInstance.post(API_ROUTES.LOGIN, userData);
};

export const registerAPI = (userData) => {
  return axiosInstance.post(API_ROUTES.REGISTER, userData);
};
export const updateAPI = (userData,ID) => {
    console.log(`${API_ROUTES.UPDATE}/${ID}`)
    return axiosInstance.patch(`${API_ROUTES.UPDATE}/${ID}`, userData);
  };
  export const getOTP = (email) => {
    console.log(API_ROUTES.GETOTP)
    return axiosInstance.post(API_ROUTES.GETOTP,{ email});
  };

// Add more API functions as needed for authentication
