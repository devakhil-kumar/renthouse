import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createNotificationService,
  getAgentNotificationsService,
  markNotificationAsReadService,
  getUnreadNotificationCountService
} from '../api/service';

export const createNotification = createAsyncThunk(
  'notifications/createNotification',
  async (notificationData, { rejectWithValue }) => {
    console.log(notificationData)
    try {
      // Return the full response from the service
      const response = await createNotificationService(notificationData);
      console.log(response)
      return response; 
    } catch (error) {
        console.log(error)
      return rejectWithValue(error.message);
    }
  }
);

export const getAgentNotifications = createAsyncThunk(
  'notifications/getAgentNotifications',
  async ({ agentId, status }, { rejectWithValue }) => {
    try {
      // Return the full response from the service
      const response = await getAgentNotificationsService(agentId, status);
     
      return response;
    } catch (error) {
    
      return rejectWithValue(error.message);
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  'notifications/markNotificationAsRead',
  async (notificationId, { rejectWithValue }) => {
    try {
      // Return the full response from the service
      const response = await markNotificationAsReadService(notificationId);
      
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUnreadNotificationCount = createAsyncThunk(
  'notifications/getUnreadNotificationCount',
  async (agentId, { rejectWithValue }) => {
    try {
      // Return the full response from the service
      const response = await getUnreadNotificationCountService(agentId);
    //   console.log(response,"responsenotification")
      return response;
    } catch (error) {
        // console.log(response,"responsenotification")
      return rejectWithValue(error.message);
    }
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.loading = false;
        // Use the response directly from the action.payload
        state.notifications.unshift(action.payload.data);
        state.unreadCount += 1;
      })
      .addCase(createNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAgentNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAgentNotifications.fulfilled, (state, action) => {
        state.loading = false;
        // Use the response directly from the action.payload
        state.notifications = action.payload.data;
      })
      .addCase(getAgentNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(n => n._id === action.payload.data._id);
        if (index !== -1) {
          // Use the response directly from the action.payload
        //   state.notifications[index] = action.payload.data;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      .addCase(getUnreadNotificationCount.fulfilled, (state, action) => {
        // Use the response directly from the action.payload
        state.unreadCount = action.payload.count;
      });
  },
});

export default notificationSlice.reducer;
