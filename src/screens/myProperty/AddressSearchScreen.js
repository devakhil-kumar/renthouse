import React, { useState, useEffect } from 'react';
import { View,Button, TextInput, FlatList, TouchableOpacity, Text, StyleSheet , Alert} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import axios from "axios"
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';
const AddressSearchScreen = ({ navigation, route }) => {
  const [predictions, setPredictions] = useState([]);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);


  const requestLocationPermission = async () => {
    const permission = Platform.OS === 'ios' 
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE 
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const result = await request(permission);
    return result === RESULTS.GRANTED;
  };

  const checkLocationPermission = async () => {
    const permission = Platform.OS === 'ios' 
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE 
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const result = await check(permission);
    return result === RESULTS.GRANTED;
  };
  const handleSelectAddress = (data, details) => {
    const { description, place_id } = data;
    const { geometry, address_components } = details;

    const fullAddress = description;
    const latitude = geometry.location.lat;
    const longitude = geometry.location.lng;

    const city = address_components.find(component => component.types.includes('locality'))?.long_name;
    const state = address_components.find(component => component.types.includes('administrative_area_level_1'))?.long_name;
    const zipCode = address_components.find(component => component.types.includes('postal_code'))?.long_name;
    const country = address_components.find(component => component.types.includes('country'))?.long_name;
    console.log('Full Address:', address_components );
    console.log('Full Address:', fullAddress);
    console.log('City:', city);
    console.log('State:', state);
    console.log('State:', country);
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude)
    // Navigate back to the previous screen with the selected address data
    navigation.navigate('AddPropertyScreen', {
      selectedAddress: {
        fullAddress,
        city,
        state,
        zipCode,
        country,
        coordinates: [ latitude,longitude], 
      },
    });
  };

  const handleUseCurrentLocation = async() => {
    const hasPermission = await checkLocationPermission();
    if (!hasPermission) {
      const granted = await requestLocationPermission();
      if (!granted) {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to use this feature. Please enable it in your device settings.',
          [{ text: 'OK' }]
        );
        return;
      }
    }
    setIsFetchingLocation(true);
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyARlogPc8tZDgm8MeT7Qc_pG8lcqJnCGvw`
          );
          const details = response.data.results[0];
          const fullAddress = details.formatted_address;
          const address_components = details.address_components;

          const city = address_components.find(component => component.types.includes('locality'))?.long_name;
          const state = address_components.find(component => component.types.includes('administrative_area_level_1'))?.long_name;
          const zipCode = address_components.find(component => component.types.includes('postal_code'))?.long_name;
          const country = address_components.find(component => component.types.includes('country'))?.long_name;
          console.log('Full Address:', address_components );
          console.log('Full Address:', fullAddress);
          console.log('City:', city);
          console.log('State:', state);
          console.log('Latitude:', latitude);
          console.log('State:', country);
          console.log('Longitude:', longitude)
          setIsFetchingLocation(false);
          navigation.navigate('AddPropertyScreen', {
            selectedAddress: {
              fullAddress,
              city,
              state,
              zipCode,
              country,
              coordinates: [ latitude,longitude], 
            },
          });
        } catch (error) {
          console.error('Error fetching address from coordinates:', error);
          Alert.alert('Error', 'Unable to fetch address. Please try again.');
          setIsFetchingLocation(false);
        }
      },
      (error) => {
        // console.error('Error fetching current location:', error);
        if (error.code === 2) {
          Alert.alert(
            'Location Services Disabled',
            'Please enable location services in your device settings to use this feature.',
            [{ text: 'OK' }]
          );
        } else {
          Alert.alert('Error', 'Unable to fetch your location. Please try again.');
        }
        setIsFetchingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search for an address"
        onPress={handleSelectAddress}
        query={{
          key: 'AIzaSyARlogPc8tZDgm8MeT7Qc_pG8lcqJnCGvw',
          language: 'en',
        }}
        styles={{
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
          predefinedPlacesDescription: styles.predefinedPlacesDescription,
        }}
        fetchDetails={true}
      />

      <Button
        title={isFetchingLocation ? 'Fetching Location...' : 'Use Current Location'}
        onPress={handleUseCurrentLocation}
        disabled={isFetchingLocation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 38,
    color: '#5d5d5d',
    fontSize: 16,
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
});

export default AddressSearchScreen;