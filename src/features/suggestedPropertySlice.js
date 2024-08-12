import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getSuggestedPropertiesService } from '../api/service';

// Async thunk for fetching recent searches
export const fetchSuggestedProperties = createAsyncThunk(
  'suggestedProperties/fetchSuggestedProperties',
  async ( thunkAPI) => {
    try {
      const response = await getSuggestedPropertiesService();
      // console.log(response)
      return response;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



const suggestedPropertiesSlice = createSlice({
  name: 'suggestedProperties',
  initialState: {
  suggestedProperties: [],
   loading:false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestedProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSuggestedProperties.fulfilled, (state, action) => {
        state.loading= false;
        state.suggestedProperties = action.payload;
      })
      .addCase(fetchSuggestedProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(addSuggestedProperty.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(addSuggestedProperty.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.suggestedProperties.push(action.payload);
      // })
      // .addCase(addSuggestedProperty.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // });
  },
});

export default suggestedPropertiesSlice.reducer;
