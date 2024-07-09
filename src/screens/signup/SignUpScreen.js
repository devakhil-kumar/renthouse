import React, { useState ,useEffect } from 'react';
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
import LoaderModal from '../../components/common/LoaderModel';
const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  useEffect(() => {
    setErrorMessage('');
  }, [name, email, password, confirmPassword]);

  const handleInputChange = (setter) => (value) => {
    setter(value);
    setErrorMessage('');
  };
  console.log({ loading, error },"45")
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
  
    if (!name || !email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
  
    try {
      const resultAction = await dispatch(register({ name, email, password }));
      console.log(register.fulfilled.match(resultAction),"22")
      if (register.fulfilled.match(resultAction)) {
        // Registration successful
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
        // Registration failed
        setErrorMessage(resultAction.payload || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };
  const handleLogin = () => {
    navigation.navigate('Login');
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
            <View style={styles.inputContainer}>
              <Icon name="person-outline" size={24} color="#999" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Enter Name"
                value={name}
                onChangeText={handleInputChange(setName)}
                placeholderTextColor="#999" 
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="mail-outline" size={24} color="#999" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Enter Email Address"
                value={email}
                onChangeText={handleInputChange(setEmail)}
                keyboardType="email-address"
                placeholderTextColor="#999" 
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={24} color="#999" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Enter Password"
                value={password}
                onChangeText={handleInputChange(setPassword)}
                placeholderTextColor="#999" 
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={24} color="#999" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={handleInputChange(setConfirmPassword)}
                placeholderTextColor="#999" 
                secureTextEntry
              />
            </View>

            {(errorMessage || error) && (
            <Text style={styles.errorText}>{errorMessage || error}</Text>
          )}

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
              <Text style={styles.registerLink}>SignIn Now</Text>
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
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  signUpButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
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
