import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import MainNavigator from './MainNavigator';
import GenerScreen from '../screens/GenerScreen';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from '../components/navigation/DrawerNavigator';
import { loadInitialState } from '../features/authSlice';


const  AppNavigator = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadInitialState());
  }, [dispatch]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userRole = useSelector((state) => state.auth.userRole);
  console.log({isLoggedIn ,userRole})

  return (
    <NavigationContainer>
      {isLoggedIn 
        ? (userRole != "null"||null && userRole !== undefined)
          ? <DrawerNavigator />
          : <GenerScreen />
        : <AuthNavigator />
      }
    </NavigationContainer>
  );
};

export default AppNavigator;
