// src/components/screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
// import SplashScreen from 'react-native-splash-screen';

const CustomSplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Hide the native splash screen after 2 seconds
    setTimeout(() => {
      // SplashScreen.hide();
      navigation.replace('Home'); // Navigate to Home screen or your main screen
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../../assets/images/splash.png')} // Your custom splash image
        style={styles.image}
      /> */}
      <Text style={styles.text}>Welcome to Real Estate App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Your splash background color
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default CustomSplashScreen;
