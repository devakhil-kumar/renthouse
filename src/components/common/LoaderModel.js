import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const LoaderModal = ({ status, message }) => {
  const getIcon = () => {
    switch (status) {
      case 'success':
        return <Icon name="checkmark-circle" size={60} color="#4a90e2" />;
      case 'failure':
        return <Icon name="close-circle" size={60} color="#e24a4a" />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {status === 'loading' ? (
          <View style={styles.iconContainer}>
            <Icon name="person" size={30} color="#fff" />
          </View>
        ) : (
          getIcon()
        )}
        <Text style={styles.title}>
          {status === 'success' ? 'Sign In Successful' : 
           status === 'failure' ? 'Sign In Failed' : 'Sign In'}
        </Text>
        <Text style={styles.message}>{message}</Text>
        {status === 'loading' && (
          <ActivityIndicator size="large" color="#4a90e2" style={styles.loader} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
 
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
});

export default LoaderModal;