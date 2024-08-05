import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LoaderModal from '../../components/common/LoaderModel';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, loadInitialState } from '../../features/authSlice';
import * as Yup from 'yup';
import NetInfo from "@react-native-community/netinfo";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [loaderStatus, setLoaderStatus] = useState(null);
  const [loaderMessage, setLoaderMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isConnected, setIsConnected] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  useEffect(() => {
    loadSavedCredentials();

      // Subscribe to network state updates
      const unsubscribe = NetInfo.addEventListener(state => {
        setIsConnected(state.isConnected);
      });
  
      // Unsubscribe when the component unmounts
      return () => unsubscribe();
    }, []);
  

  useEffect(() => {
    if (loading) {
      setLoaderStatus('loading');
      setLoaderMessage('Please wait...\nYou will be directed to the homepage soon.');
    } else if (error) {
      setLoaderStatus('failure');
      setLoaderMessage(error);
      setTimeout(() => {
        setLoaderStatus(null);
        setLoaderMessage('');
      }, 2000);
    } else {
      setLoaderStatus(null);
      setLoaderMessage('');
    }
  }, [loading, error]);

  const loadSavedCredentials = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem('savedEmail');
      const savedPassword = await AsyncStorage.getItem('savedPassword');
      if (savedEmail && savedPassword) {
        setEmail(savedEmail);
        setPassword(savedPassword);
        setRememberPassword(true);
      }
    } catch (error) {
      console.error('Error loading saved credentials:', error);
    }
  };

  const saveCredentials = async () => {
    try {
      await AsyncStorage.setItem('savedEmail', email);
      await AsyncStorage.setItem('savedPassword', password);
    } catch (error) {
      console.error('Error saving credentials:', error);
    }
  };

  const clearCredentials = async () => {
    try {
      await AsyncStorage.removeItem('savedEmail');
      await AsyncStorage.removeItem('savedPassword');
    } catch (error) {
      console.error('Error clearing credentials:', error);
    }
  };

  const handleSignIn = async () => {
    if (!isConnected) {
      Alert.alert(
        "No Internet Connection",
        "Please connect to the internet and try again.",
        [{ text: "OK" }]
      );
      return;
    }
    try {
      await LoginSchema.validate({ email, password }, { abortEarly: false });
      if (rememberPassword) {
        saveCredentials();
      } else {
        clearCredentials();
      }
      dispatch(loginUser({ email, password }));
    } catch (validationError) {
      const newErrors = {};
      validationError.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    setErrors(prevErrors => ({ ...prevErrors, [field]: '' }));
  };

  const handleForgotPassword = () => {
    navigation.navigate('emailscreen');
  };

  const handleRegister = () => {
    navigation.navigate('Signup');
  };

  return (
    <>
      <StatusBar backgroundColor="#4a90e2" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          {!isConnected && (
            <View style={styles.noInternetBanner}>
              <Text style={styles.noInternetText}>No internet connection</Text>
            </View>
          )}
          <View style={styles.header}>
            <Text style={styles.headerText}>Login</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Icon name="mail-outline" size={24} color="#999" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Enter Email Address"
                value={email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                placeholderTextColor="#999" 
                autoCapitalize="none"
              />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={24} color="#999" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Enter Password"
                value={password}
                onChangeText={(value) => handleInputChange('password', value)}
                placeholderTextColor="#999" 
                secureTextEntry
              />
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <View style={styles.rememberContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setRememberPassword(!rememberPassword)}
              >
                {rememberPassword && <Icon name="checkmark" size={18} color="#4a90e2" />}
              </TouchableOpacity>
              <Text style={styles.rememberText}>Remember </Text>
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.registerLink}>Register Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      {loaderStatus && (
        <LoaderModal status={loaderStatus} message={loaderMessage} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#4a90e2',
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginTop: 5,
  },
  noInternetBanner: {
    backgroundColor: '#cc0401',
    padding: 10,
    alignItems: 'center',
  },
  noInternetText: {
    color: 'white',
    fontWeight: 'bold',
  },
  
  
  content: {
    flex: 1,
    // backgroundColor: 'white',
    // justifyContent: 'space-evenly',
    // padding: 20,
  },
  header: {
    marginBottom: 30,
    backgroundColor: '#4a90e2',
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Arial', // Use a font family that you prefer
  },
  subHeaderText: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginTop: 5,
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 16,
    color:"black"
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#4a90e2',
    borderRadius: 3,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  forgotText: {
    fontSize: 14,
    color: '#4a90e2',
  },
  signInButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  signInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    fontSize: 14,
    color: '#333',
  },
  registerLink: {
    fontSize: 14,
    color: '#4a90e2',
    fontWeight: 'bold',
  },
});

export default LoginScreen;