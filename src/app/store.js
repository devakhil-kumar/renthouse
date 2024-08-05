import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import forgotPasswordReducer from '../features/otpSlice';
import propertyReducer from '../features/propertySlice';
import searchPropertyReducer from '../features/searchPropertySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    forgotPassword: forgotPasswordReducer,
    properties: propertyReducer,
    searchProperties: searchPropertyReducer,
  },
});

export default store;
