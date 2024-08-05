import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { sendOTP, reset } from '../../features/otpSlice';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
});

const EmailScreen = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading, error: apiError, success, email: otpEmail, otp ,id } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    if (success) {
      navigation.navigate('otpscreen', { email: otpEmail, otp,id });
    }
  }, [success, otpEmail, otp, navigation]);

  const handleSendOTP = async () => {
    try {
      await validationSchema.validate({ email });
      setError('');
      dispatch(sendOTP(email));
    } catch (validationError) {
      setError(validationError.message);
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#4a90e2" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>Enter your registered email to receive a verification code</Text>
        </View>
        <View style={styles.bottomcontainer}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email address"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity 
            style={[styles.button, loading && styles.disabledButton]} 
            onPress={handleSendOTP} 
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Sending...' : 'Send Verification Code'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#4a90e2',
    height: 200,
    justifyContent: 'flex-end',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
  bottomcontainer: {
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
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

export default EmailScreen;
