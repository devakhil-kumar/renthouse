import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ScrollView, StatusBar } from 'react-native';

const ResetPasswordScreen = ({ email, otp }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleSubmit = () => {
    let isValid = true;
    setNewPasswordError('');
    setConfirmPasswordError('');

    if (!newPassword) {
      setNewPasswordError('Please enter a new password');
      isValid = false;
    }
    if (!confirmPassword) {
      setConfirmPasswordError('Please enter the password again');
      isValid = false;
    }
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }
    if (newPassword.length < 8) {
      setNewPasswordError('Password must be at least 8 characters long');
      isValid = false;
    }
    if (isValid) {
      // Here you would typically call an API to reset the password
      console.log('Password reset for:', email, 'with OTP:', otp);
      alert('Password reset successful!');
    }
  };

  return (<>
    <StatusBar backgroundColor="#4a90e2" barStyle="light-content" />
    <View style={styles.container}>
        <View style={styles.header}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>Enter your new password</Text>
      </View>
      <ScrollView
        //   contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
      <View style={styles.bottomcontainer}>
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="New Password"
        placeholderTextColor="#999" 
        secureTextEntry
      />
       {newPasswordError ? <Text style={styles.errorText}>{newPasswordError}</Text> : null}
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm New Password"
        placeholderTextColor="#999" 
        secureTextEntry
      />
       {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
   
   
  },
  header: {
    // marginBottom: 30,
    backgroundColor: '#4a90e2',
    height: 200,
    justifyContent: 'flex-end',
    // alignItems: 'center',
    padding: 20,
  },
  bottomcontainer:{
    padding:20,
    // backgroundColor: '#FFFFFF',
     },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
    // textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#FFFFFF',
    // textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 6,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default ResetPasswordScreen;