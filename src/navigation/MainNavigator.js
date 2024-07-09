// MainNavigator.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import DrawerNavigator from '../components/navigation/DrawerNavigator';
import AuthNavigator from './AuthNavigator';
import GenerScreen from '../screens/GenerScreen';

const MainNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserToken = await AsyncStorage.getItem('userToken');
        const storedUserRole = await AsyncStorage.getItem('userRole');
        setUserToken(storedUserToken);
        setUserRole(storedUserRole);
        console.log({storedUserToken,storedUserRole})
      } catch (error) {
        console.error('Failed to fetch user data from AsyncStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  const handleRoleSet = (role) => {
    setUserRole(role);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken == null ? (
        <AuthNavigator />
      ) : userRole == null ? (
        <GenerScreen />
      ) : (
        <DrawerNavigator />
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;
