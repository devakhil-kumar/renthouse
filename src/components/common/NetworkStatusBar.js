// NetworkStatusBar.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNetworkStatus } from './path/to/NetworkManager';

const NetworkStatusBar = ({ isConnected }) => {
//   const isConnected = useNetworkStatus();

  if (isConnected) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Internet Connection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NetworkStatusBar;