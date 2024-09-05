import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import forgotPasswordReducer from '../features/otpSlice';
import propertyReducer from '../features/propertySlice';
import searchPropertyReducer from '../features/searchPropertySlice';
import suggestedPropertyReducer from '../features/suggestedPropertySlice';
import featuredPropertyReducer from '../features/featuredPropertySlice';
import recentSearchesReducer from '../features/recentSearchesSlice';
import viewedPropertyReducer from '../features/viewedPropertySlice';
import favoritePropertyReducer from '../features/favoritePropertySlice';
import notificationReducer from '../features/notificationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    forgotPassword: forgotPasswordReducer,
    properties: propertyReducer, 
    searchProperties: searchPropertyReducer,
    suggestedProperties:suggestedPropertyReducer,
    featuredProperties:featuredPropertyReducer,
    recentSearches:recentSearchesReducer,
    viewedProperties:viewedPropertyReducer,
    favoriteProperties:favoritePropertyReducer,
    notifications:notificationReducer 
  },
});

export default store;
