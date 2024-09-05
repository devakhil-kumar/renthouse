import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addRecentSearchService, getRecentSearchesService } from '../api/service';

// Async thunk for fetching recent searches
export const fetchRecentSearches = createAsyncThunk(
  'recentSearches/fetchRecentSearches',
  async (userId, thunkAPI) => {
    try {
      const response = await getRecentSearchesService(userId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for adding a recent search
export const addRecentSearch = createAsyncThunk(
  'recentSearches/addRecentSearch',
  async (searchData, thunkAPI) => {
    console.log(searchData)
    try {
      const response = await addRecentSearchService(searchData);
      console.log(response)
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const recentSearchesSlice = createSlice({
  name: 'recentSearches',
  initialState: {
    recentSearches: [],
   loading:false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentSearches.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecentSearches.fulfilled, (state, action) => {
        state.loading= false;
        state.recentSearches = action.payload;
      })
      .addCase(fetchRecentSearches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addRecentSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRecentSearch.fulfilled, (state, action) => {
        state.loading = false;
        // state.recentSearches.push(action.payload);
      })
      .addCase(addRecentSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default recentSearchesSlice.reducer;
