import {
  getOTP,
  loginAPI,
  registerAPI,
  updateAPI,
  addPropertyAPI,
  updatePropertyAPI,
  deletePropertyAPI,
  getPropertiesAPI,
  searchPropertiesAPI ,
  addRecentSearchAPI,
  getRecentSearchesAPI,
  addViewedPropertyAPI,
  getViewedPropertiesAPI,
  getSuggestedPropertiesAPI,
  getFeaturedPropertiesAPI,
  addFavoritePropertyAPI,
  getFavoritePropertiesAPI,
} from './api'; // Adjust path based on your project structure

export const loginService = async userData => {
  try {
    const response = await loginAPI(userData);
    return response.data; // Assuming your API returns user data upon successful login
  } catch (error) {
    console.log(error);
    throw new Error('Login failed. Please check your credentials.'); // Customize error handling as needed
  }
};

export const registerService = async userData => {
  try {
    const response = await registerAPI(userData);
    return response.data; // Assuming your API returns user data upon successful
  } catch (error) {
    throw new Error('Registration failed. Please try again later.'); // Customize error handling as needed
  }
};
export const updateService = async (userData, ID) => {
  // console.log({userData, ID});
  try {
    const response = await updateAPI(userData, ID);
    // console.log(response.data);
    return response.data; // Assuming your API returns user data upon successful
  } catch (error) {
    throw new Error('Update failed. Please try again later.',error); // Customize error handling as needed
  }
};

// Add more service functions as needed for authentication actions

export const getOTPService = async (email) => {
  console.log({ email });
  try {
    const response = await getOTP(email);
    return response.data; // Assuming your API returns user data upon successful request
  } catch (error) {
    if (error.response) {
      // Check if the error response exists and handle specific status codes
      const { status } = error.response;
      if (status === 403) {
        throw new Error('Email not found. Please enter a valid email.');
      } else if (status === 409) {
        throw new Error('Please enter a valid email');
      } else if (status === 501) {
        throw new Error('something went wrong');
      } else {
        // Handle other status codes or provide a generic error message
        throw new Error('An error occurred while sending OTP.');
      }
    } else {
      // Handle cases where the error does not have a response (network errors, etc.)
      throw new Error('Network error or server is unreachable.');
    }
  }
};


export const getUserDetailService = async (ID) => {
  try {
    const response = await addPropertyAPI(ID);
    return response.data; // Assuming your API returns the added property data
  } catch (error) {
    throw new Error(error);
  }
};


// Add Property Service
export const addPropertyService = async (propertyData) => {
  try {
    const response = await addPropertyAPI(propertyData);
    return response.data; // Assuming your API returns the added property data
  } catch (error) {
    throw new Error(error);
  }
};

// Update Property Service
export const updatePropertyService = async (propertyData, propertyId) => {
  try {
    const response = await updatePropertyAPI(propertyData, propertyId);
    return response.data; // Assuming your API returns the updated property data
  } catch (error) {
    throw new Error(error);
  }
};

// Delete Property Service
export const deletePropertyService = async (propertyId) => {
  try {
    const response = await deletePropertyAPI(propertyId);
    console.log(response.data.message)
    return response.data; // Assuming your API returns a success message
  } catch (error) {
    throw new Error('Deleting property failed. Please try again later.');
  }
};

// Get Properties Service
export const getPropertiesService = async (agentId) => {
  try {
    const response = await getPropertiesAPI(agentId);
    return response.data; // Assuming your API returns a list of properties
  } catch (error) {
    throw new Error('Fetching properties failed. Please try again later.',error);
  }
};


export const searchPropertiesService = async (queryParams) => {
  try {
    const response = await searchPropertiesAPI(queryParams);
    return response.data; // Assuming your API returns the properties data
  } catch (error) {
    console.error('Search failed:', error);
    throw new Error('Searching properties failed. Please try again later.'); // Customize error handling as needed
  }
};



export const addRecentSearchService = async (searchData) => {
  try {
    const response = await addRecentSearchAPI(searchData);
    return response.data; // Assuming your API returns the added search data
  } catch (error) {
    throw new Error('Adding recent search failed. Please try again later.');
  }
};

// Get Recent Searches Service
export const getRecentSearchesService = async (userId) => {
  try {
    const response = await getRecentSearchesAPI(userId);
    return response.data; // Assuming your API returns the list of recent searches
  } catch (error) {
    throw new Error('Fetching recent searches failed. Please try again later.');
  }
};

// Add Viewed Property Service
export const addViewedPropertyService = async (viewedPropertyData) => {
  try {
    const response = await addViewedPropertyAPI(viewedPropertyData);
    return response.data; // Assuming your API returns the added viewed property data
  } catch (error) {
    throw new Error('Adding viewed property failed. Please try again later.');
  }
};

// Get Viewed Properties Service
export const getViewedPropertiesService = async (userId) => {
  try {
    const response = await getViewedPropertiesAPI(userId);
    return response.data; // Assuming your API returns the list of viewed properties
  } catch (error) {
    throw new Error('Fetching viewed properties failed. Please try again later.');
  }
};

// Get Viewed Properties Service
export const getSuggestedPropertiesService = async () => {
  try {
    const response = await getSuggestedPropertiesAPI();
    return response.data; // Assuming your API returns the list of viewed properties
  } catch (error) {
    throw new Error('Fetching viewed properties failed. Please try again later.');
  }
};

// Get Viewed Properties Service
export const getFeaturedPropertiesService = async () => {
  try {
    const response = await getFeaturedPropertiesAPI();
    return response.data; // Assuming your API returns the list of viewed properties
  } catch (error) {
    throw new Error('Fetching viewed properties failed. Please try again later.');
  }
};


// Add favorite Properties Service

export const addFavoritePropertyService = async (viewedPropertyData) => {
  try {
    const response = await addFavoritePropertyAPI(viewedPropertyData);
    return response.data; // Assuming your API returns the added viewed property data
  } catch (error) {
    throw new Error('Adding favorite property failed. Please try again later.');
  }
};

// Get favorite Properties Service
export const getFavoritePropertiesService = async (userId) => {
  try {
    const response = await getFavoritePropertiesAPI(userId);
    return response.data; // Assuming your API returns the list of viewed properties
  } catch (error) {
    throw new Error('Fetching favorite properties failed. Please try again later.');
  }
};