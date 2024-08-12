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
import { createStackNavigator } from '@react-navigation/stack';

const  AppNavigator = () => {
  const dispatch = useDispatch();
  const RootStack = createStackNavigator();
  useEffect(() => {
    dispatch(loadInitialState());
  }, [dispatch]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userRole = useSelector((state) => state.auth.userRole);
  console.log({isLoggedIn ,userRole},"ttttttttt")

  return (
    <NavigationContainer>
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          {userRole !== "null" && userRole !== null && userRole !== undefined ? (
            userRole === 'user' ? (
              <RootStack.Screen name="UserTab" component={UserTabNavigator} />
            ) : (
              <RootStack.Screen name="AdminTab" component={TabNavigator} />
            )
          ) : (
            <RootStack.Screen name="GenerScreen" component={GenerScreen} />
          )}
        </>
      ) : (
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  </NavigationContainer>
  );
};

export default AppNavigator;
