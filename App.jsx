import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BootSplash from "react-native-bootsplash";
import { useSelector, useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import store from './src/app/store';
import AppNavigator from './src/navigation/AppNavigator';
import { loadInitialState } from './src/features/authSlice';

const AppWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      try {
        await dispatch(loadInitialState());
      } catch (error) {
        console.error('Failed to load initial state:', error);
      }
    };


    
    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });
  }, [dispatch]);

  return <AppNavigator />;
};

const App = () => {
  return (
    <Provider store={store}>

        <AppWrapper />
      
    </Provider>
  );
};

export default App;