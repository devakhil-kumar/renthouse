import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
    addFavoritePropertyService,
    getFavoritePropertiesService,
    deleteFavoritePropertyService,
    getFavoritePropertiesIdService
} from '../api/service';

// Async thunk for fetching recent searches
export const fetchFavoriteProperty = createAsyncThunk(
  'favoriteProperty/fetchFavoriteProperties',
  async (userId, thunkAPI) => {
   
    try {
     
      const response = await getFavoritePropertiesService(userId);
      // console.log(response,"ggg")
      return response;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const fetchFavoritePropertyID = createAsyncThunk(
  'favoritePropertyID/fetchFavoritePropertiesID',
  async (userId, thunkAPI) => {
   
    try {
     
      const response = await getFavoritePropertiesIdService(userId);
      // console.log(response,"ggg")
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
      console.log(response,"add")
      return response;
    } catch (error) {
        console.log(error)
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
// Async thunk for deleting a favorite property
export const deleteFavoriteProperty = createAsyncThunk(
  'favoriteProperty/deleteFavoriteProperty',
  async ({ userId, propertyId }, thunkAPI) => {
    try {
      const response = await deleteFavoritePropertyService(userId, propertyId );
      console.log(response,"delete");
      return response;
    } catch (error) {
      console.log(error,"j");
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);


const favoritePropertySlice = createSlice({
  name: 'favoriteProperty',
  initialState: {
   favoriteProperties: [],
   favPropertiesID: [],
   message:null,
    loading: false,
    error: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
  },
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
      .addCase(fetchFavoritePropertyID.pending, state => {
        state.loading = true;
        // state.favPropertiesID = [];
      })
      .addCase(fetchFavoritePropertyID.fulfilled, (state, action) => {
        state.loading = false;
        state.favPropertiesID = action.payload;
      })
      .addCase(fetchFavoritePropertyID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // state.favPropertiesID = [];
      })
      .addCase(addFavoriteProperty.pending, state => {
        state.loading = true;
      })
      .addCase(addFavoriteProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Property added to collection";
        // state.viewedProperties.push(action.payload);
        state.favPropertiesID.push({ propertyId: action.meta.arg.propertyId });
      })
      .addCase(addFavoriteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteFavoriteProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message=null
      })
      .addCase(deleteFavoriteProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.message=action.payload
        state.favPropertiesID = state.favPropertiesID.filter(
          (property) => property.propertyId !== action.meta.arg.propertyId
        );
        state.favoriteProperties = state.favoriteProperties.filter(
          (property) => property.property.id !== action.meta.arg.propertyId
        );
      })
      .addCase(deleteFavoriteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearMessage } = favoritePropertySlice.actions;
export default favoritePropertySlice.reducer;
