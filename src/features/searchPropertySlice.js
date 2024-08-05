import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchPropertiesService } from '../api/service'; // Adjust path based on your project structure

// Define initial state
const initialState = {
  properties: [],
  loading:false,
  error: null,
};

// Create async thunk for search properties
export const searchProperties = createAsyncThunk(
  'properties/searchProperties',
  async (queryParams, { rejectWithValue }) => {
    // console.log({queryParams})
    try {
      const response = await searchPropertiesService(queryParams);
      // console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the slice
const searchPropertySlice = createSlice({
  name: 'searchProperties',
  initialState,
  reducers: {
    // Optionally add synchronous reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProperties.pending, (state) => {
        state.loading =true;
      })
      .addCase(searchProperties.fulfilled, (state, action) => {
        state.loading =false;
        state.properties = action.payload; // Assuming the response is an array of properties
      })
      .addCase(searchProperties.rejected, (state, action) => {
        state.loading =false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export default searchPropertySlice.reducer;
