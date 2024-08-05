import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import MainNavigator from './MainNavigator';
import GenerScreen from '../screens/GenerScreen';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from '../components/navigation/DrawerNavigator';
import { loadInitialState } from '../features/authSlice';
import TabNavigator from '../components/navigation/TabNavigator';
import UserTabNavigator from '../components/navigation/UserTabNavigator';


const  AppNavigator = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadInitialState());
  }, [dispatch]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userRole = useSelector((state) => state.auth.userRole);
  console.log({isLoggedIn ,userRole},"ttttttttt")

  return (
    <NavigationContainer>
    {isLoggedIn 
      ? (userRole !== "null" && userRole !== null && userRole !== undefined)
        ? userRole === 'user'
          ? <UserTabNavigator /> // Route to UserTabNavigator
          : <TabNavigator /> // Default to TabNavigator if userRole doesn't match
        : <GenerScreen />
      : <AuthNavigator />
    }
  </NavigationContainer>
  );
};

export default AppNavigator;
