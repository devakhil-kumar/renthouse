// src/utils/loadInitialState.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadInitialState = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    const userRole = await AsyncStorage.getItem('userRole');

    return {
      isLoggedIn: !!token,
      user: user ? JSON.parse(user) : null,
      userRole: userRole ? JSON.parse(userRole) : null,
      loading: false,
      error: null,
    };
  } catch (error) {
    console.error('Failed to load auth state from AsyncStorage:', error);
    return {
      isLoggedIn: false,
      user: null,
      userRole: null,
      loading: false,
      error: null,
    };
  }
};
