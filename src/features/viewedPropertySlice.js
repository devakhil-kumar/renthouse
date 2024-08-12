import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  addViewedPropertyService,
  getViewedPropertiesService,
} from '../api/service';

// Async thunk for fetching recent searches
export const fetchRecentViewed = createAsyncThunk(
  'viewedProperty/fetchViewedProperties',
  async (userId, thunkAPI) => {
   
    try {
     
      const response = await getViewedPropertiesService(userId);
      console.log(response,"ggg")
      return response;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Async thunk for adding a recent search
export const addRecentViewed = createAsyncThunk(
  'viewedProperty/addViewedProperties',
  async (viewedPropertyData, thunkAPI) => {
    try {
      const response = await addViewedPropertyService(viewedPropertyData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const viewedPropertySlice = createSlice({
  name: 'viewedProperty',
  initialState: {
    viewedProperties: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRecentViewed.pending, state => {
        state.loading = true;
      })
      .addCase(fetchRecentViewed.fulfilled, (state, action) => {
        state.loading = false;
        state.viewedProperties = action.payload;
      })
      .addCase(fetchRecentViewed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addRecentViewed.pending, state => {
        state.loading = true;
      })
      .addCase(addRecentViewed.fulfilled, (state, action) => {
        state.loading = false;
        // state.viewedProperties.push(action.payload);
      })
      .addCase(addRecentViewed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default viewedPropertySlice.reducer;
