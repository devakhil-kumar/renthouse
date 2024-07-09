// slices/otpSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOTPService } from '../api/service';


export const sendOTP = createAsyncThunk('otp/sendOTP', async (email, { rejectWithValue }) => {
    console.log(email,"dataotp")
  try {
    const data = await getOTPService(email);
    console.log(data,"dataotp")
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = otpSlice.actions;
export default otpSlice.reducer;
