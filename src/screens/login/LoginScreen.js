import React, { useState ,useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LoaderModal from '../../components/common/LoaderModel';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch,useSelector  } from 'react-redux';
import { loginUser,loadInitialState } from '../../features/authSlice';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [loaderStatus, setLoaderStatus] = useState(null);
  const [loaderMessage, setLoaderMessage] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth); 
  console.log({loading, error})

  useEffect(() => {
    if (loading) {
      setLoaderStatus('loading');
      setLoaderMessage('Please wait...\nYou will be directed to the homepage soon.');
    } else if (error) {
      setLoaderStatus('failure');
      setLoaderMessage(error);
      setTimeout(() => {
        // dispatch(loadInitialState());
        setLoaderStatus(null);
        setLoaderMessage('');
      }, 2000);
    } else {
      setLoaderStatus(null);
      setLoaderMessage('');
    }
  }, [loading, error]);


  
  const handleSignIn = () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

   

    dispatch(loginUser({ email, password }))
   
     
  };
  



  const handleForgotPassword = () => {
    // Implement forgot password logic
    navigation.navigate('emailscreen');
  };

  const handleRegister = () => {
    navigation.navigate('Signup');
  };

  return (
    <>
    <StatusBar backgroundColor="#4a90e2" barStyle="light-content" />
    <SafeAreaView style={styles.container}>
    
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
        keyboardShouldPersistTaps="handled"
      > */}
      <ScrollView 
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
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
              onChangeText={setEmail}
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
              onChangeText={setPassword}
              placeholderTextColor="#999" 
              secureTextEntry
            />
          </View>

          <View style={styles.rememberContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setRememberPassword(!rememberPassword)}
            >
              {rememberPassword && <Icon name="checkmark" size={18} color="#4a90e2" />}
            </TouchableOpacity>
            <Text style={styles.rememberText}>Remember Password</Text>
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
      {/* </KeyboardAvoidingView> */}
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
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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