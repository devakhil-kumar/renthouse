import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Image, 
  ScrollView, StyleSheet, useColorScheme 
} from 'react-native';
import user from "../../../assets/user.png"

const RenterProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    userName: 'William Savastan',
    email: 'WilliamS@email.com',
    licenseNumber: '',
    stateOfLicensure: '',
    yearsOfExperience: '',
    agency: '',
    officeAddress: '',
    password: '••••••',
  });

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const handleUpdate = () => {
    if (isEditing) {
      // Perform update logic here
      console.log('Updating profile:', userData);
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
      <Text style={[styles.header, isDarkMode && styles.darkHeader]}>Complete your profile</Text>
      {/* <Text style={[styles.subHeader, isDarkMode && styles.darkSubHeader]}>Please Enter the Details</Text> */}
      
      <View style={styles.avatarContainer}>
        <Image
          source={user}
          style={styles.avatar}
        />
      </View>

      {renderField('User Name', 'userName')}
      {renderField('Email', 'email')}
      {renderField('License Number', 'licenseNumber')}
      {renderField('State of Licensure', 'stateOfLicensure')}
      {renderField('Years of Experience', 'yearsOfExperience')}
      {renderField('Agency', 'agency')}
      {renderField('Office Address', 'officeAddress')}
      {renderField('Password', 'password', true)}

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
});

export default RenterProfile;