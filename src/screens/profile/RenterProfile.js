  import React, { useState,useEffect } from 'react';
  import { 
    View, Text, TextInput, TouchableOpacity, Image, 
    ScrollView, StyleSheet, useColorScheme 
  } from 'react-native';
  import user from "../../../assets/user.png"
  import { useDispatch } from 'react-redux';
  import { updateUser,getuser,fetchUserDetails} from '../../features/authSlice';
  import AsyncStorage from '@react-native-async-storage/async-storage';

  const RenterProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [avatarUri, setAvatarUri] = useState(null);
    const [userData, setUserData] = useState({
      name: 'William Savastan',
      email: 'WilliamS@email.com',
      licenseNumber: '',
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
              licenseNumber: parsedUser.licenseNumber || '',
              stateOfLicensure: parsedUser.stateOfLicensure || '',
              // yearsOfExperience: parsedUser.yearsOfExperience || '',
              agency: parsedUser.agency || '',
              officeAddress: parsedUser.officeAddress || '',
              // avatarUri:parsedUser.imageurl ||  require('../../../assets/user.png'),
              // password: '••••••',
            });
          }
        } catch (error) {
          console.error('Failed to load user data:', error);
        }
      };
  
      loadUserData();
    }, []);

    const handleUpdate = async () => {
      if (isEditing) {
        try {
          const user = await AsyncStorage.getItem('user');
          if (user) {
            const parsedUser = JSON.parse(user);
            const ID = parsedUser._id;
            if (ID) {
              dispatch(updateUser({ ID, userData }));
            }
          }
        } catch (error) {
          console.error('Failed to update user data:', error);
        }
      }
      setIsEditing(!isEditing);
    };

    const renderField = (label, key, secureTextEntry = false) => (
      <View style={styles.fieldContainer}>
        <Text style={[styles.label, isDarkMode && styles.darkLabel]}>{label}</Text>
        <TextInput
          style={[
            styles.input,
            isDarkMode && styles.darkInput,
            !isEditing && styles.disabledInput
          ]}
          value={userData[key]}
          onChangeText={(text) => setUserData({...userData, [key]: text})}
          editable={isEditing}
          secureTextEntry={secureTextEntry}
        />
      </View>
    );

    return (
      <ScrollView style={[styles.container, isDarkMode && styles.darkContainer]}>
        <Text style={[styles.header, isDarkMode && styles.darkHeader]}>your profile</Text>
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
        {renderField('License Number', 'licenseNumber')}
        {renderField('State of Licensure', 'stateOfLicensure')}
        {/* {renderField('Years of Experience', 'yearsOfExperience')} */}
        {renderField('Agency', 'agency')}
        {renderField('Office Address', 'officeAddress')}
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
      // color:"black",
      // backgroundColor:"white"
    },
    darkInput: {
      borderColor: '#444',
      color:"black",
      backgroundColor:"white"
    },
    disabledInput: {
      // backgroundColor: '#f0f0f0',
      color:"black",
      backgroundColor:"white"
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
  });

  export default RenterProfile;