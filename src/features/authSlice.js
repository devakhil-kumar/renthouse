import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginService, registerService,updateService } from '../api/service'; // Adjust path based on your project structure

// Async thunk for logging in
export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    console.log(userData)
    try {
      const response = await loginService(userData);
      await AsyncStorage.setItem('token', response.token); // Store token in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(response.admin)); // Store user in AsyncStorage
      await AsyncStorage.setItem('userRole', JSON.stringify(response.admin?.role||null));
      console.log(response.admin?.role)
      console.log(response.admin)
      return response; // Return user data to update state
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for registering
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerService(userData);
      // Handle registration response if needed
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateUser = createAsyncThunk(
  'auth/update',
  async ({ userData,ID}, { rejectWithValue }) => {
    console.log({ userData,ID})
    try {
      const response = await updateService(userData,ID);
      await AsyncStorage.setItem('user', JSON.stringify(response.admin)); // Update user in AsyncStorage
      console.log(response,"updated")
      return response; // Return updated user data to update state
    } catch (error) {
      return rejectWithValue(error.message);
      console.log(error)
    }
  }
);
// export const loadInitialState = () => async (dispatch) => {
//   try {
//     const token = await AsyncStorage.getItem('token');
//     const userString = await AsyncStorage.getItem('user');
//     const userRoleString = await AsyncStorage.getItem('userRole');

//     const user = userString ? JSON.parse(userString) : null;
//     const userRole = userRoleString ? JSON.parse(userRoleString) : null;

//     dispatch(initializeState({
//       isLoggedIn: !!token,
//       user,
//       userRole,
//     }));
//   } catch (error) {
//     console.error('Failed to load initial state:', error);
//     dispatch(initializeState({
//       isLoggedIn: false,
//       user: null,
//       userRole: null,
//     }));
//   }
// };
export const loadInitialState = createAsyncThunk(
  'auth/loadInitialState',
  async () => {
    try {
      console.log("Starting to load initial state");
      const userRole = await AsyncStorage.getItem('userRole');
      const isLoggedInn = await AsyncStorage.getItem('token');
      console.log("UserRole:", userRole);
      console.log("isLoggedIn:", isLoggedInn);
      
      return {
        userRole: userRole ? userRole: null,
        isLoggedIn: isLoggedInn ? true : false,
      };
    } catch (error) {
      console.error("Error in loadInitialState:", error);
      throw error; // Re-throw the error to ensure it's caught by the rejection handler
    }
  }
);

const initialState = {
  isLoggedIn:  false, 
  user:  null,
  userRole: null,  // Add userRole to the state
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      AsyncStorage.removeItem('token'); // Clear token from AsyncStorage on logout
      AsyncStorage.removeItem('user'); // Clear user from AsyncStorage on logout
      AsyncStorage.removeItem('userRole');
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        userRole: null,
      };
    },
    // initializeState: (state, action) => {
    //   state.isLoggedIn = action.payload.isLoggedIn;
    //   state.user = action.payload.user;
    //   state.userRole = action.payload.userRole;
    //   state.loading = false;
    // },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadInitialState.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadInitialState.fulfilled, (state, action) => {
      state.userRole = action.payload.userRole;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.loading = false;
    });
    builder.addCase(loadInitialState.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to load initial state";
      console.error("loadInitialState rejected:", action.error);
     
    });
    
    // Reducer for login action
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.userRole=action.payload.admin?.role || null
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Login failed. Please try again.';
    });

    // Reducer for register action
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
     
      state.loading = false;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Registration failed. Please try again.';
    });
      // Reducer for update action
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload.admin;
      state.userRole=action.payload.admin?.role
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Update failed. Please try again.';
    });
  },
});

export const { logout,  initializeState,setUserRole} = authSlice.actions;

export default authSlice.reducer;
