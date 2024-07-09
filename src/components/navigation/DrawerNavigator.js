import React from 'react';
import { StatusBar, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';

import ProfileScreen from '../../screens/profile/ProfileScreen';
import CustomDrawer from './CustomDrawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const logoutHandler = () => {
    dispatch(logout());
  };
  // const logoutHandler = async () => {
  //   try {
  //     // Remove user token and role from AsyncStorage
  //     await AsyncStorage.removeItem('userToken');
  //     await AsyncStorage.removeItem('userRole');
  //     // Navigate to AuthNavigator (or a login screen)
  //     navigation.navigate('Login');
  //   } catch (error) {
  //     console.error('Failed to logout:', error);
  //   }
  // };
  return (
<>
<StatusBar backgroundColor="#4a90e2" barStyle="light-content" />
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
    <Drawer.Screen
          name="Tabs"
          component={TabNavigator}
          options={{
            headerShown: false,
            headerTitle: 'Search Properties',
            headerStyle: { backgroundColor: '#4a90e2' },
            headerTintColor: 'white', // Set header icons and text color
            headerTitleStyle: { color: 'white' },
            headerRight: () => (
              <TouchableOpacity onPress={logoutHandler} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            ),
          }}
        />
      <Drawer.Screen name="profile" component={ProfileScreen} />
    </Drawer.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#4a90e2',
    fontWeight: 'bold',
  },
});

export default DrawerNavigator;