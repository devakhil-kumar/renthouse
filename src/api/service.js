import { getOTP, loginAPI, registerAPI ,updateAPI} from './api'; // Adjust path based on your project structure

export const loginService = async (userData) => {
  try {
    const response = await loginAPI(userData);
    return response.data; // Assuming your API returns user data upon successful login
  } catch (error) {
    console.log(error)
    throw new Error('Login failed. Please check your credentials.'); // Customize error handling as needed
  }
};

export const registerService = async (userData) => {
  try {
    const response = await registerAPI(userData);
    return response.data; // Assuming your API returns user data upon successful registration
  } catch (error) {
    throw new Error('Registration failed. Please try again later.'); // Customize error handling as needed
  }
};
export const updateService = async (userData,ID) => {
    console.log({userData,ID})
    try {
      const response = await updateAPI(userData,ID);
      return response.data; // Assuming your API returns user data upon successful registration
    } catch (error) {
      throw new Error('Update failed. Please try again later.'); // Customize error handling as needed
    }
  };

// Add more service functions as needed for authentication actions

export const getOTPService= async (email) => {
  console.log({email})
  try {
    const response = await getOTP(email);
    console.log({response})
    return response.data; // Assuming your API returns user data upon successful registration
  } catch (error) {
    throw new Error('getotp failed'); // Customize error handling as needed
  }
};