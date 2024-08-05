// slices/otpSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOTPService } from '../api/service';

export const sendOTP = createAsyncThunk('otp/sendOTP', async (email, { rejectWithValue }) => {
  console.log(email )
  try {
    const data = await getOTPService(email);
    console.log(email, data )
    return { email,data }; // Assuming the OTP data is in the response
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 403) {
        return rejectWithValue('Email not found. Please try with valid email.');
      } else if (status === 409) {
        return rejectWithValue('This email is already in use.');
      } else if (status === 501) {
        return rejectWithValue('This feature is not implemented.');
      } else {
        return rejectWithValue('An error occurred while sending OTP.');
      }
    } else {
      return rejectWithValue('Network error or server is unreachable.');
    }
  }
});

const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    loading: false,
    success: false,
    error: null,
    email: null,
    otp: null,
    id:null
  },
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.email = null;
      state.otp = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.email = action.payload.email;
        state.otp = action.payload.data.otp;
        state.id=action.payload.data.id;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = otpSlice.actions;
export default otpSlice.reducer;
