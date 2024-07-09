import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StatusBar, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../../screens/search/SearchScreen';
import CollectionScreen from '../../screens/collection/CollectionScreen';
import MyPropertyScreen from '../../screens/myProperty/MyPropertyScreen';
import NotificationScreen from '../../screens/notification/NotificationScreen';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import { useNavigation } from '@react-navigation/native';
import { useNavigationState } from '@react-navigation/native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice';
import RenterProfile from '../../screens/profile/RenterProfile';
import ApartmentScreen from '../../screens/myProperty/ApartmentScreen';
import AddPropertyStep1 from '../../screens/myProperty/AddPropertyStep1';
import AddPropertyStep2 from '../../screens/myProperty/AddPropertyStep2';

const Tab = createBottomTabNavigator();

const SearchStack = createStackNavigator();
const CollectionStack = createStackNavigator();
const MyPropertyStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const CustomHeader = ({ logoutHandler, title }) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerContent}>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity onPress={logoutHandler} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
    <Text style={styles.subHeaderText}>
      This is a ten word subheader text for demonstration purposes
    </Text>
  </View>
);

const SearchStackScreen = ({ logoutHandler }) => (
  <SearchStack.Navigator>
    <SearchStack.Screen 
      name="Searchstack" 
      component={SearchScreen} 
      options={{
        header: ({ navigation, route, options }) => (
          <CustomHeader logoutHandler={logoutHandler} title="Search" />
        ),
        headerStyle: { backgroundColor: '#4a90e2' },
        headerTintColor: 'white',
      }}
    />
  </SearchStack.Navigator>
);

const CollectionStackScreen = ({ logoutHandler }) => (
  <CollectionStack.Navigator>
    <CollectionStack.Screen 
      name="Collectionstack" 
      component={CollectionScreen} 
      options={{
        header: ({ navigation, route, options }) => (
          <CustomHeader logoutHandler={logoutHandler} title="Collection" />
        ),
        headerStyle: { backgroundColor: '#4a90e2' },
        headerTintColor: 'white',
      }}
    />
  </CollectionStack.Navigator>
);

const MyPropertyStackScreen = ({ logoutHandler }) => (
  <MyPropertyStack.Navigator>
    <MyPropertyStack.Screen 
      name="MyPropertystack" 
      component={MyPropertyScreen} 
      options={{
        header: ({ navigation, route, options }) => (
          <CustomHeader logoutHandler={logoutHandler} title="My Property" />
        ),
        headerStyle: { backgroundColor: '#4a90e2' },
        headerTintColor: 'white',
      }}
    />
    <MyPropertyStack.Screen 
      name="ApartmentScreen" 
      component={ApartmentScreen}  
      options={{
        headerTitle: "Description",
        headerStyle: { backgroundColor: '#4a90e2', height: 100 },
        headerTintColor: 'white',
      }} 
    />
    <MyPropertyStack.Screen 
      name="AddPropertyScreen" 
      component={AddPropertyStep1}  
      options={{
        headerTitle: "ADD PROPERTY",
        headerStyle: { backgroundColor: '#4a90e2', height: 100 },
        headerTintColor: 'white',
      }} 
    />
    <MyPropertyStack.Screen 
      name="AddPropertyScreen2" 
      component={AddPropertyStep2}  
      options={{
        headerTitle: "ADD PROPERTY",
        headerStyle: { backgroundColor: '#4a90e2', height: 100 },
        headerTintColor: 'white',
      }} 
    />
  </MyPropertyStack.Navigator>
);

const NotificationStackScreen = ({ logoutHandler }) => (
  <NotificationStack.Navigator>
    <NotificationStack.Screen 
      name="Notificationstack" 
      component={NotificationScreen}  
      options={{
        header: ({ navigation, route, options }) => (
          <CustomHeader logoutHandler={logoutHandler} title="Notification" />
        ),
        headerStyle: { backgroundColor: '#4a90e2' },
        headerTintColor: 'white',
      }}
    />
  </NotificationStack.Navigator>
);

const ProfileStackScreen = ({ logoutHandler }) => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen 
      name="Profilestack" 
      component={ProfileScreen}  
      options={{
        header: ({ navigation, route, options }) => (
          <CustomHeader logoutHandler={logoutHandler} title="Profile" />
        ),
        headerStyle: { backgroundColor: '#4a90e2' },
        headerTintColor: 'white',
      }}
    />
    <ProfileStack.Screen 
      name="RenterProfile" 
      component={RenterProfile} 
      options={{
        headerTitle: "Renter Profile",
        headerStyle: { backgroundColor: '#4a90e2', height: 100 },
        headerTintColor: 'white',
      }} 
    />
  </ProfileStack.Navigator>
);

const TabNavigator = () => {
  const dispatch = useDispatch();

  const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'MyPropertystack';
    if (routeName === 'ApartmentScreen') {
      return false;
    }
    return true;
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#4a90e2',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Search"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="search-outline" size={size} color={color} />
          )
        }}
      >
        {() => <SearchStackScreen logoutHandler={logoutHandler} />}
      </Tab.Screen>
      <Tab.Screen
        name="Collection"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="bookmark-outline" size={size} color={color} />
          )
        }}
      >
        {() => <CollectionStackScreen logoutHandler={logoutHandler} />}
      </Tab.Screen>
      <Tab.Screen
        name="MyProperty"
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "MyPropertystack";
            if (routeName === "ApartmentScreen" || routeName === "AddPropertyScreen" || routeName === "AddPropertyScreen2") {
              return { display: "none" };
            }
            return;
          })(route),
          tabBarVisible: getTabBarVisibility(route)
        })}
      >
        {() => <MyPropertyStackScreen logoutHandler={logoutHandler} />}
      </Tab.Screen>
      <Tab.Screen
        name="Notification"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="notifications-outline" size={size} color={color} />
          )
        }}
      >
        {() => <NotificationStackScreen logoutHandler={logoutHandler} />}
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" size={size} color={color} />
          )
        }}
      >
        {() => <ProfileStackScreen logoutHandler={logoutHandler} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#4a90e2',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subHeaderText: {
    color: 'white',
    fontSize: 13,
  },
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

export default TabNavigator;
