import React, { useState,useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Image, 
  ScrollView, StyleSheet, useColorScheme ,Alert
} from 'react-native';
import Toast from 'react-native-toast-message';
import user from "../../../assets/user.png"
import { useDispatch } from 'react-redux';
import {logoutUser, updateUser} from '../../features/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUri, setAvatarUri] = useState(null);
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    name: 'William Savastan',
    email: 'WilliamS@email.com',
    phone:"",
    // licenseNumber: '',
    // stateOfLicensure: '',
    // yearsOfExperience: '',
    // agency: '',
    // officeAddress: '',
    // password: '••••••',
  });

  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const isDarkMode = colorScheme === 'dark';
  useEffect(() => {
    // Load user data from AsyncStorage when component mounts
    const loadUserData = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          setAvatarUri(parsedUser?.imageurl )
          setUserData({
            name: parsedUser.name || '',
            email: parsedUser.email || '',
            // licenseNumber: parsedUser.licenseNumber || '',
            phone: parsedUser.phone || '',
            // yearsOfExperience: parsedUser.yearsOfExperience || '',
            // agency: parsedUser.agency || '',
            // officeAddress: parsedUser.officeAddress || '',
            // avatarUri:parsedUser.imageurl ||  require('../../../assets/user.png'),
            // password: parsedUser.password ||'••••••',
          });
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    loadUserData();
  }, []);

  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    return phone.length === 10 && /^\d+$/.test(phone);
  };

  const validateName = (name) => {
    return name.trim().length > 0;
  };
  // const handleUpdate = async () => {
  //   if (isEditing) {
  //     let newErrors = {};

  //     if (!validateName(userData.name)) {
  //       newErrors.name = 'Name cannot be empty';
  //     }

  //     if (!validateEmail(userData.email)) {
  //       newErrors.email = 'Invalid email address';
  //     }

  //     if (userData.phone && !validatePhone(userData.phone)) {
  //       newErrors.phone = 'Phone number must be 10 digits';
  //     }

  //     if (Object.keys(newErrors).length > 0) {
  //       setErrors(newErrors);
  //       return;
  //     }

  //     try {
  //       const user = await AsyncStorage.getItem('user');
  //       if (user) {
  //         const parsedUser = JSON.parse(user);
  //         const ID = parsedUser._id;
  //         if (ID) {
  //           dispatch(updateUser({ ID, userData }));
  //           Alert.alert('Success', 'Profile updated successfully');
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Failed to update user data:', error);
  //       Alert.alert('Error', 'Failed to update profile');
  //     }
  //   }
  //   setIsEditing(!isEditing);
  //   setErrors({});
  // };

  const handleUpdate = async () => {
    if (isEditing) {
      let newErrors = {};
  
      if (!validateName(userData.name)) {
        newErrors.name = 'Name cannot be empty';
      }
  
      if (!validateEmail(userData.email)) {
        newErrors.email = 'Invalid email address';
      }
  
      if (userData.phone && !validatePhone(userData.phone)) {
        newErrors.phone = 'Phone number must be 10 digits';
      }
  
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
  
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          const ID = parsedUser._id;
          if (ID) {
            await dispatch(updateUser({ ID, userData })).unwrap();
            // Alert.alert('Success', 'Profile updated successfully');
            Toast.show({
              type: 'success',
              text1: 'Profile Updated',
              text2: 'Your profile was updated successfully.',
              visibilityTime: 3000,
              autoHide: true,
              topOffset: 30,
              bottomOffset: 40,
            });
          }
        }
      } catch (error) {
       
        
        Toast.show({
          type: 'error',
          text1: 'Update Failed',
          text2: 'Failed to update profile. Please try again later.',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
    }
    setIsEditing(!isEditing);
    setErrors({});
  };

  const renderField = (label, key, secureTextEntry = false) => (
    <View style={styles.fieldContainer}>
      <Text style={[styles.label, isDarkMode && styles.darkLabel]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          isDarkMode && styles.darkInput,
          !isEditing && styles.disabledInput,
          errors[key] && styles.errorInput
        ]}
        value={userData[key]}
        onChangeText={(text) => {
          setUserData({...userData, [key]: text});
          setErrors({...errors, [key]: null});
        }}
        editable={isEditing}
        secureTextEntry={secureTextEntry}
      />
      {errors[key] && <Text style={styles.errorText}>{errors[key]}</Text>}
    </View>
  
  );

  return (
    <ScrollView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.header, isDarkMode && styles.darkHeader]}>Your profile</Text>
      {/* <Text style={[styles.subHeader, isDarkMode && styles.darkSubHeader]}>Please Enter the Details</Text> */}
      
      <View style={styles.avatarContainer}>
          <Image
            source={
              avatarUri ? { uri: avatarUri } : require('../../../assets/user.png')
            }
            style={styles.avatar}
          />
        
      </View>

      {renderField('User Name', 'name')}
      {renderField('Email', 'email')}
      {renderField('Phone Number', 'phone')}
      {/* {renderField('License Number', 'licenseNumber')}
  
      {renderField('Years of Experience', 'yearsOfExperience')}
      {renderField('Agency', 'agency')}
      {renderField('Office Address', 'officeAddress')} */}
      {/* {renderField('Password', 'password', true)} */}

      <TouchableOpacity
        style={[styles.button, isDarkMode && styles.darkButton]}
        onPress={handleUpdate}
      >
        <Text style={styles.buttonText}>
          {isEditing ? 'Update' : 'Edit'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  darkHeader: {
    color: '#fff',
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 20,
  },
  darkSubHeader: {
    color: '#ccc',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  darkLabel: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  darkInput: {
    borderColor: '#444',
    color: '#fff',
    backgroundColor: '#333',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 30,
  },
  darkButton: {
    backgroundColor: '#0A84FF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default UserProfile;