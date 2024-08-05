import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../features/authSlice';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
  .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
  .required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format')
    .required('Email is required'),
    password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    setErrors({});
  }, [name, email, password, confirmPassword]);
  const formatName = (value) => {
    const trimmedValue = value.trim();
    return trimmedValue.charAt(0).toUpperCase() + trimmedValue.slice(1);
  };

  const handleInputChange = (field, value) => {
    switch (field) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
    }
    setErrors(prev => ({ ...prev, [field]: '' }));
  };
  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  const handleNameBlur = () => {
    setName(prevName => {
      let trimmedName = prevName.trim().replace(/\s+/g, ' '); // Trim leading, trailing, and multiple spaces
      return capitalizeWords(trimmedName);
    });
  };


  const handleSignUp = async () => {
    try {
      await validationSchema.validate({ name, email, password, confirmPassword }, { abortEarly: false });
      const resultAction = await dispatch(register({ name, email, password }));
      if (register.fulfilled.match(resultAction)) {
        Alert.alert(
          "Success",
          "Registration successful!",
          [{ text: "OK" }],
          { cancelable: false }
        );
        setTimeout(() => {
          navigation.navigate('Login');
        }, 3000);
      } else if (register.rejected.match(resultAction)) {
        setErrors({ form: resultAction.payload || 'Registration failed. Please try again.' });
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = {};
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        setErrors({ form: 'An error occurred. Please try again.' });
      }
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const getInputBorderColor = (field) => {
    if (errors[field]) return 'red';
    if (field === 'confirmPassword' && password === confirmPassword && password !== '') return 'green';
    return '#ddd';
  };

  return (
    <>
      <StatusBar backgroundColor="#4a90e2" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>Sign Up</Text>
          </View>

          <View style={styles.form}>
            <View style={[styles.inputContainer, { borderColor: getInputBorderColor('name') }]}>
              <Icon name="person-outline" size={24} color="#999" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Enter Name"
                onBlur={handleNameBlur}
                value={name}
                onChangeText={(value) => handleInputChange('name', value)}
                placeholderTextColor="#999" 
                autoCapitalize="words"
              />
            </View>
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <View style={[styles.inputContainer, { borderColor: getInputBorderColor('email') }]}>
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

            <View style={[styles.inputContainer, { borderColor: getInputBorderColor('password') }]}>
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

            <View style={[styles.inputContainer, { borderColor: getInputBorderColor('confirmPassword') }]}>
              <Icon name="lock-closed-outline" size={24} color="#999" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                placeholderTextColor="#999" 
                secureTextEntry
              />
            </View>
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

            {errors.form && <Text style={styles.errorText}>{errors.form}</Text>}

            <TouchableOpacity 
              style={[styles.signUpButton, loading && styles.disabledButton]} 
              onPress={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.signUpText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>If you have already an account? </Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.registerLink}>Sign In  Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  disabledButton: {
    backgroundColor: '#a9c8e8', // A lighter shade of your button color
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
    marginTop: 5,
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
  form: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginTop: 10,
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
  // errorText: {
  //   color: 'red',
  //   // textAlign: 'center',
  //   marginBottom: 15,
  // },
  signUpButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  signUpText: {
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

export default SignUpScreen;
