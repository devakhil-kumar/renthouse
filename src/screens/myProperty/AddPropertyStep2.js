import React, {useState,useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  Alert 
} from 'react-native';
import {lightTheme, darkTheme} from '../../components/common/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { addProperty,updateProperty } from '../../features/propertySlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AddPropertyStep2({route, navigation}) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const { formData: step1Data, isEditing, propertyId } = route.params;
  // console.log(propertyId,"hdshhfhdjhjsdhjfhsjd")
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    propertyType: '',
    rentNegotiable: null,
    petFriendly: null,
    gatedSociety: null,
    amenities: [],
  });
// console.log({user})
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
    if (isEditing) {
      setFormData({
       type: step1Data.type || '',
        rentNegotiable: step1Data.rentNegotiable || null,
        petFriendly: step1Data.petFriendly || null,
        gatedSociety: step1Data.gatedSociety || null,
        amenities: step1Data.features || [],
      });
    }
  }, []);

  const handleRadioChange = (name, value) => {
    setFormData(prevState => ({...prevState, [name]: value}));
  };

  const handleAmenityToggle = amenity => {
    setFormData(prevState => ({
      ...prevState,
      amenities: prevState.amenities.includes(amenity)
        ? prevState.amenities.filter(a => a !== amenity)
        : [...prevState.amenities, amenity],
    }));
  };

  const handleSubmit = async () => {
    if (!user) {
      console.error('User data not available');
      // Handle the case where user data is not available
      return;
    }
  
    const finalData = {
      ...step1Data,
      ...formData,
    };
    // console.log({finalData})
    // Transform the data to match the desired format
    const transformedData = {
      title: finalData.title || "Untitled Property", // You might want to generate a title based on some criteria
      type: finalData.propertyType || "Apartment",
      bedrooms: parseInt(finalData.bedrooms) || 0,
      bathrooms: parseInt(finalData.bathrooms) || 0,
      squareFeet: parseInt(finalData.squareFeet) || 0,
      price: parseInt(finalData.price) || 0,
      description: finalData.description || "No description provided",
      features: finalData.amenities || [],
      status: false ,
      location: {
        type: "Point",
        coordinates: [0, 0], // You'll need to get actual coordinates
        address: finalData.fullAddress || "",
        city: finalData.locality || "dfads",
        state: "fdsfg", // You'll need to add this to your form if required
        zip: "5555", // You'll need to add this to your form if required
        country: "India" // Assuming the property is in India
      },
      agentId: user._id, // Assuming the user object has an id field
      images: finalData.images, 
      mainImage:finalData.mainImage,
      furnishedType: finalData.furnishedType,
      floorNumber: finalData.floorNumber,
      parking: parseInt(finalData.parking) || 0,
      preferredTenant: finalData.preferredTenant,
      nextAvailableDate: finalData.nextAvailableDate,
      petFriendly: finalData.petFriendly,
      gatedSociety: finalData.gatedSociety,
      brokerage: finalData.brokerage
    };
  
    // console.log('Transformed form data:', transformedData);
    try {
      if (isEditing) {
        await dispatch(updateProperty({  propertyId, propertyData: transformedData }));
        Alert.alert(
          'Success',
          'Property updated successfully',
          [
            {
              text: 'OK',
              onPress: () => {
                setTimeout(() => {
                  navigation.navigate('MyPropertystack');
                }, 2000);
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        await dispatch(addProperty(transformedData));
        Alert.alert(
          'Success',
          'Property uploaded successfully',
          [
            {
              text: 'OK',
              onPress: () => {
                setTimeout(() => {
                  navigation.navigate('MyPropertystack');
                }, 2000);
              },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error('Error storing property data:', error);
      // Handle the error
    }
  };

  const RadioButton = ({label, name, value, selectedValue}) => (
    <TouchableOpacity
      style={styles.radioButton}
      onPress={() => handleRadioChange(name, value)}>
      <View
        style={[
          styles.radio,
          {borderColor: theme.colors.primary},
          selectedValue === value && {backgroundColor: theme.colors.primary},
        ]}
      />
      <Text style={[styles.radioLabel, {color: theme.colors.text}]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const CheckBox = ({label, value, onToggle}) => (
    <TouchableOpacity style={styles.checkBox} onPress={() => onToggle(value)}>
      <View
        style={[
          styles.check,
          {borderColor: theme.colors.primary},
          formData.amenities.includes(value) && styles.checkedBox,
        ]}>
        {formData.amenities.includes(value) && (
          <Icon name="checkmark" size={18} color="#fff" />
        )}
      </View>
      <Text style={[styles.checkLabel, {color: theme.colors.text}]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
        Type of Property
      </Text>
      <View style={styles.radioGroup}>
        <RadioButton
          label="House"
          name="propertyType"
          value="House"
          selectedValue={formData.propertyType}
        />
        <RadioButton
          label="Appartment"
          name="propertyType"
          value="Appartment"
          selectedValue={formData.propertyType}
        />
        <RadioButton
          label="Townhouse"
          name="propertyType"
          value="studentAllowed"
          selectedValue={formData.propertyType}
        />
        <RadioButton
          label="Room Set"
          name="propertyType"
          value="RoomSet"
          selectedValue={formData.propertyType}
        />
      </View>

      {/* <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
        Is rent negotiable?
      </Text>
      <View style={styles.radioGroup}>
        <RadioButton
          label="Yes"
          name="rentNegotiable"
          value={true}
          selectedValue={formData.rentNegotiable}
        />
        <RadioButton
          label="No"
          name="rentNegotiable"
          value={false}
          selectedValue={formData.rentNegotiable}
        />
      </View> */}

      <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
        Pet Friendly?
      </Text>
      <View style={styles.radioGroup}>
        <RadioButton
          label="Yes"
          name="petFriendly"
          value={true}
          selectedValue={formData.petFriendly}
        />
        <RadioButton
          label="No"
          name="petFriendly"
          value={false}
          selectedValue={formData.petFriendly}
        />
      </View>

      <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
        Gated Society
      </Text>
      <View style={styles.radioGroup}>
        <RadioButton
          label="Yes"
          name="gatedSociety"
          value={true}
          selectedValue={formData.gatedSociety}
        />
        <RadioButton
          label="No"
          name="gatedSociety"
          value={false}
          selectedValue={formData.gatedSociety}
        />
      </View>

      <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
        Amenities
      </Text>
      <View style={styles.checkGroup}>
        <CheckBox
          label="Gas and Stove"
          value="gasAndStove"
          onToggle={handleAmenityToggle}
        />
        <CheckBox label="Lift" value="lift" onToggle={handleAmenityToggle} />
        <CheckBox label="AC" value="ac" onToggle={handleAmenityToggle} />
        <CheckBox label="WIFI" value="wifi" onToggle={handleAmenityToggle} />
        <CheckBox
          label="Fridge"
          value="fridge"
          onToggle={handleAmenityToggle}
        />
        <CheckBox
          label="Washing Machine"
          value="washingMachine"
          onToggle={handleAmenityToggle}
        />
        <CheckBox
          label="Power Backup/ Inverter"
          value="powerBackup"
          onToggle={handleAmenityToggle}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme.colors.primary}]}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%', // Adjust to create two columns
    marginBottom: 10,
  },
  radio: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 10,
  },
  radioLabel: {
    fontSize: 16,
  },
  checkGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
  },
  check: {
    height: 24,
    width: 24,
    borderWidth: 2,
    marginRight: 10,
  },
  checkLabel: {
    fontSize: 16,
  },
  checkedBox: {
    backgroundColor: '#2196F3', // Adjust the color as needed
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
