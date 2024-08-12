import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
    addFavoritePropertyService,
    getFavoritePropertiesService,
} from '../api/service';

// Async thunk for fetching recent searches
export const fetchFavoriteProperty = createAsyncThunk(
  'favoriteProperty/fetchFavoriteProperties',
  async (userId, thunkAPI) => {
   
    try {
     
      const response = await getFavoritePropertiesService(userId);
      console.log(response,"ggg")
      return response;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Async thunk for adding a recent search
export const addFavoriteProperty= createAsyncThunk(
  'favoriteProperty/addFavoriteProperties',
  async (viewedPropertyData, thunkAPI) => {
    try {
      const response = await addFavoritePropertyService(viewedPropertyData);
      console.log(response)
      return response;
    } catch (error) {
        console.log(error)
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const favoritePropertySlice = createSlice({
  name: 'favoriteProperty',
  initialState: {
   favoriteProperties: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFavoriteProperty.pending, state => {
        state.loading = true;
        state.favoriteProperties = [];
      })
      .addCase(fetchFavoriteProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.favoriteProperties = action.payload;
      })
      .addCase(fetchFavoriteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.favoriteProperties = [];
      })
      .addCase(addFavoriteProperty.pending, state => {
        state.loading = true;
      })
      .addCase(addFavoriteProperty.fulfilled, (state, action) => {
        state.loading = false;
        // state.viewedProperties.push(action.payload);
      })
      .addCase(addFavoriteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default favoritePropertySlice.reducer;
