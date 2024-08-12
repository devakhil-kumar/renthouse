import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getFeaturedPropertiesService } from '../api/service';

// Async thunk for fetching recent searches
export const fetchFeaturedProperties = createAsyncThunk(
  'featuredProperties/fetchFeaturedProperties',
  async ( thunkAPI) => {
    try {
      const response = await getFeaturedPropertiesService();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



const featuredPropertiesSlice = createSlice({
  name: 'featuredProperties',
  initialState: {
  featuredProperties: [],
   loading:false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeaturedProperties.fulfilled, (state, action) => {
        state.loading= false;
        state.featuredProperties = action.payload;
      })
      .addCase(fetchFeaturedProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(addFeaturedProperty.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(addFeaturedProperty.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.featuredProperties.push(action.payload);
      // })
      // .addCase(addFeaturedProperty.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // });
  },
});

export default featuredPropertiesSlice.reducer;
