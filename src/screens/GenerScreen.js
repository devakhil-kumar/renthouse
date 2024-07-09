import React, { useState ,useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Dimensions, StatusBar,Image} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { RadioButton } from 'react-native-paper';
import buyicon from '../../assets/buyicon.png';
import saleicon from '../../assets/saleicon.png';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('window');
import { useDispatch } from 'react-redux';
import { setUserRole,updateUser} from '../features/authSlice';

const GenerScreen = ( onRoleSet ) => {
  const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState('agent');
    const navigation = useNavigation();
    // useEffect(() => {
    //   // Load user data from AsyncStorage when the component mounts
    //   const loadUserData = async () => {
    //     const user = await AsyncStorage.getItem('user');
    //     console.log(user)
    //     if (user) {
    //       const parsedUser = JSON.parse(user);
    //       setSelectedOption(parsedUser.role || 'agent'); // Set initial role from user data if available
    //     }
    //   };
    //   loadUserData();
    // }, []);
    // const handleRoleSelection = (role) => {
    //   dispatch(setUserRole(role));
    // };
    const handleRoleSelection = async (role) => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          const ID = parsedUser._id;
          console.log(ID);
          if (ID) {
            const userData = { role };
            dispatch(updateUser({ ID, userData }));
          }
        }
        // await AsyncStorage.setItem('userRole', role);
        // dispatch(setUserRole(role));
        // navigation.navigate('Home');
      } catch (error) {
        console.error('Failed to save user role:', error);
      }
    };
  return (
  <>
  
  <StatusBar backgroundColor="#4a90e2" barStyle="light-content" />
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>What are you looking to do?</Text>
        <Text style={styles.subtitle}>Choose an option What you need to:</Text>
      </View>
      
      <View style={styles.optionsContainer}>
        <TouchableOpacity  style={[styles.option, selectedOption === 'agent' && styles.selectedOption]}
        onPress={() => setSelectedOption('agent')}>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="agent"
            status={selectedOption === 'agent' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedOption('agent')}
          />
        </View>
        <Image source={saleicon} style={styles.icon} />
          <View  />
          <Text style={styles.optionTitle}>Sale/Rent Property</Text>
          <Text style={styles.optionSubtitle}>Post your property</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.option, selectedOption === 'user' && styles.selectedOption]}
        onPress={() => setSelectedOption('user')}>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="user"
            status={selectedOption === 'user' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedOption('user')}
          />
        </View>
        <Image source={buyicon} style={styles.icon} />
          <View />
          <Text style={styles.optionTitle}>user Property</Text>
          <Text style={styles.optionSubtitle}>Post your requirement</Text>
        </TouchableOpacity>
        
      </View>
      <View style={styles.continueButtonbox}>
      <TouchableOpacity style={styles.continueButton} onPress={() => handleRoleSelection(selectedOption)}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
      </View>
      
      
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#2196F3',
    // padding: 20,
  },
  header: {
    marginBottom: 30,
    backgroundColor: '#4a90e2',
    height: 200,
    justifyContent: 'flex-end',
    // alignItems: 'center',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: RFPercentage(4),
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: RFPercentage(2),
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    padding:20
  },
  option: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: width * 0.42,
    alignItems: 'center',
  },
  selectedOption: {
    borderColor: '#1565C0',
    borderWidth: 2,
  },
  iconPlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#E3F2FD',
    borderRadius: 25,
    marginBottom: 10,
  },
  optionTitle: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  optionSubtitle: {
    fontSize: RFPercentage(1.5),
    color: 'gray',
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#1565C0',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',

  },
  continueButtonbox: {
    // backgroundColor: '#1565C0',
    // borderRadius: 25,
    // padding: 15,
    // alignItems: 'center',
    paddingHorizontal:30

  },
  continueButtonText: {
    color: 'white',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
  },

  selectedOption: {
    borderColor: 'blue',
  },
  radioButtonContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: '#ddd',
    marginRight: 10,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#888',
  },
});

export default GenerScreen;