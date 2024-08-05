import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  addPropertyService, 
  updatePropertyService, 
  deletePropertyService, 
  getPropertiesService 
} from '../api/service';

// Thunks for async actions
export const addProperty = createAsyncThunk(
  'properties/addProperty',
  async (propertyData, { rejectWithValue }) => {
    console.log("api me jaa rha h data",propertyData)
    try {
      const response = await addPropertyService(propertyData);
      console.log(response,"hhhjhjhj")
      return response;
    } catch (error) {
      console.log(error.message)
      return rejectWithValue(error.message);
    }
  }
);

export const updateProperty = createAsyncThunk(
  'properties/updateProperty',
  async ({ propertyData, propertyId }, { rejectWithValue }) => {
    console.log(propertyId,"iddididi")
    try {
      const response = await updatePropertyService(propertyData, propertyId);
      console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProperty = createAsyncThunk(
  'properties/deleteProperty',
  async (propertyId, { rejectWithValue }) => {
    try {
    
      const response = await deletePropertyService(propertyId);
      console.log(response,"delete kr diya ")
      return propertyId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getProperties = createAsyncThunk(
  'properties/getProperties',
  async (agentId, { rejectWithValue }) => {
    console.log("agent",agentId)
    try {
      const response = await getPropertiesService(agentId);
     
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const propertySlice = createSlice({
  name: 'properties',
  initialState: {
    properties: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Property
      .addCase(addProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.loading = false;
        const newProperty = action.payload.property; // Assuming the payload has a 'property' field
        state.properties.unshift(newProperty); 
        state.error = null;
        // state.properties.push(action.payload);
      })
      .addCase(addProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Property
      .addCase(updateProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProperty = action.payload.property;
        state.properties = state.properties.map(property =>
          property._id === updatedProperty._id ? updatedProperty : property
        );
        state.error = null;
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Property
      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = state.properties.filter(prop => prop._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Properties
      .addCase(getProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
        state.error = null;
      })
      .addCase(getProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default propertySlice.reducer;
