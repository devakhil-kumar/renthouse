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
    console.log(userData)
    return axiosInstance.patch(`${API_ROUTES.UPDATE}/${ID}`, userData);
  };
  export const getUserDetail = (ID) => {
    // console.log(userData)
    return axiosInstance.patch(`${API_ROUTES.UPDATE}/${ID}`);
  };
  export const getOTP = (email) => {
    console.log(API_ROUTES.GETOTP)
    return axiosInstance.post(API_ROUTES.GETOTP,{ email});
  };

// Add more API functions as needed for authentication
// Property APIs
export const addPropertyAPI = (propertyData) => {
  return axiosInstance.post(API_ROUTES.ADD_PROPERTY, propertyData);
};

export const updatePropertyAPI = (propertyData, propertyId) => {
  console.log(`${API_ROUTES.UPDATE_PROPERTY}/${propertyId}`)
  return axiosInstance.put(`${API_ROUTES.UPDATE_PROPERTY}/${propertyId}`, propertyData);
};

export const deletePropertyAPI = (propertyId) => {
  return axiosInstance.delete(`${API_ROUTES.DELETE_PROPERTY}/${propertyId}`);
};

export const getPropertiesAPI = (agentId) => {
  // console.log(`${API_ROUTES.GET_PROPERTIES}/${agentId}`)
  return axiosInstance.get(`${API_ROUTES.GET_PROPERTIES}/${agentId}`);
};

export const searchPropertiesAPI = (queryParams) => {
  // Construct query string from queryParams object
  
  const queryString = new URLSearchParams(queryParams).toString();
  console.log(`${API_ROUTES.SEARCH_PROPERTIES}?${queryString}`)
  return axiosInstance.get(`${API_ROUTES.SEARCH_PROPERTIES}?${queryString}`);
};