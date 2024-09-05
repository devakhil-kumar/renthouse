import 'react-native-gesture-handler';
import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BootSplash from "react-native-bootsplash";
import { useSelector, useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import store from './src/app/store';
import AppNavigator from './src/navigation/AppNavigator';
import { loadInitialState } from './src/features/authSlice';
import NetworkStatusBar from './src/components/common/NetworkStatusBar';
import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-toast-message'; // Import Toast
import { NotificationServices, requestUserPermission } from './src/utils/pushNotifications';

const AppWrapper = () => {
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(true);
  console.log(isConnected)
  useEffect(()=>{
requestUserPermission();
NotificationServices()
  },[])
  useEffect(() => {
    const init = async () => {
      try {
        await dispatch(loadInitialState());
      } catch (error) {
        console.error('Failed to load initial state:', error);
      }
    };

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    
    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return(
    <View style={styles.container}>
      <NetworkStatusBar isConnected={isConnected} />
      <AppNavigator />
      <Toast /> 
    </View>
  );
};

const App = () => {
  return (
    <Provider store={store}>

        <AppWrapper />
      
    </Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  networkStatusBar: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
  },
  networkStatusText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;