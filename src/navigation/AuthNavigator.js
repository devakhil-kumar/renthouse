// AuthNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login/LoginScreen';
import SignUpScreen from '../screens/signup/SignUpScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import GenerScreen from '../screens/GenerScreen';
// import MainNavigator from './MainNavigator';
// import DrawerNavigator from '../components/navigation/DrawerNavigator';
// import SearchScreen from '../screens/search/SearchScreen';
import EmailScreen from '../screens/login/EmailScreen';
import OTPScreen from '../screens/otp/OTPScreen';
import ResetPasswordScreen from '../screens/login/ResetPasswordScreen';


const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Signup" component={SignUpScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="RoleSelection" component={GenerScreen} options={{ headerShown: false }} />
      <Stack.Screen name="emailscreen" component={EmailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="otpscreen" component={OTPScreen} options={{ headerShown: false }} />
      <Stack.Screen name="resetpassword" component={ResetPasswordScreen} options={{ headerShown: false }}/>

      
    </Stack.Navigator>
  );
};

export default AuthNavigator;
