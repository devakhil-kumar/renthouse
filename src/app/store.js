import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import forgotPasswordReducer from '../features/otpSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    forgotPassword: forgotPasswordReducer,
  },
});

export default store;
