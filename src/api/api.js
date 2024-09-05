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
    console.log(`${API_ROUTES.USERDETAIL}/${ID}`)
    return axiosInstance.get(`${API_ROUTES.USERDETAIL}/${ID}`);
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




export const addRecentSearchAPI = (searchData) => {
  return axiosInstance.post(API_ROUTES.ADD_RECENT_SEARCH, searchData);
};

// Get Recent Searches
export const getRecentSearchesAPI = (userId) => {
  console.log(`${API_ROUTES.GET_RECENT_SEARCHES}?userId=${userId}`)
  return axiosInstance.get(`${API_ROUTES.GET_RECENT_SEARCHES}?userId=${userId}`);
};

// Add Viewed Property
export const addViewedPropertyAPI = (viewedPropertyData) => {
  return axiosInstance.post(API_ROUTES.ADD_RECENT_VIEWED_PROPERTY, viewedPropertyData);
};

// Get Viewed Properties
export const getViewedPropertiesAPI = (userId) => {
  return axiosInstance.get(`${API_ROUTES.GET_RECENT_VIEWED_PROPERTIES}?userId=${userId}`);
};

// Get suggested Properties
export const getSuggestedPropertiesAPI = () => {
  return axiosInstance.get(API_ROUTES.GET_SUGGESTED_PROPERTIES);
};

// Get featured Properties
export const getFeaturedPropertiesAPI = () => {
  return axiosInstance.get(API_ROUTES.GET_FEATURED_PROPERTIES);
};




export const addFavoritePropertyAPI = (viewedPropertyData) => {
  return axiosInstance.post(API_ROUTES.ADD_FAVORITE_PROPERTY, viewedPropertyData);
};

// Getfav Properties
export const getFavoritePropertiesAPI = (userId) => {
  return axiosInstance.get(`${API_ROUTES.GET_FAVORITE_PROPERTIES}?userId=${userId}`);
};

export const deleteFavoritePropertyAPI = (userId, propertyId) => {
  return axiosInstance.delete(`${API_ROUTES.DELETE_FAVORITE_PROPERTIES}/${propertyId}`, {
    data: { userId }
  });
};


export const getFavoritePropertiesIDAPI = (userId) => {
  return axiosInstance.get(`${API_ROUTES.GET_FAVORITE_PROPERTIES_Id}?userId=${userId}`);
};


export const createNotificationAPI = (notificationData) => {
  return axiosInstance.post(API_ROUTES.CREATE_NOTIFICATION, notificationData);
};

export const getAgentNotificationsAPI = (agentId, status) => {
  return axiosInstance.get(`${API_ROUTES.GET_AGENT_NOTIFICATIONS}/${agentId}${status ? `?status=${status}` : ''}`);
};

export const markNotificationAsReadAPI = (notificationId) => {
  return axiosInstance.patch(`${API_ROUTES.MARK_NOTIFICATION_READ}/${notificationId}/read`);
};

export const getUnreadNotificationCountAPI = (agentId) => {
  
  return axiosInstance.get(`${API_ROUTES.GET_UNREAD_NOTIFICATION_COUNT}/${agentId}/unread-count`);
};


export const getAgentPropertiesCountAPI = (agentId) => {
  console.log(`${API_ROUTES.GET_AGENT_PROPERTIES_COUNT}/${agentId}`)
  return axiosInstance.get(`${API_ROUTES.GET_AGENT_PROPERTIES_COUNT}/${agentId}`);
};