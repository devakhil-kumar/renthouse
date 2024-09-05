import React, {useState,useEffect,useRef, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert
  // Slider
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {lightTheme, darkTheme} from '../../components/common/theme'; // Adjust this import path as needed
import { useDispatch, useSelector } from 'react-redux';
import { searchProperties } from '../../features/searchPropertySlice';
import { addRecentSearch ,fetchRecentSearches} from '../../features/recentSearchesSlice';

import SearchList from '../../components/common/SearchList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';
// Geolocation.setRNConfiguration(config)
const SearchProperties = () => {
  const dispatch = useDispatch();
  const { properties, loading: searchLoading, error: searchError } = useSelector((state) => state.searchProperties);
  const { recentSearches, loading: recentSearchesLoading, error: recentSearchesError } = useSelector(state => state.recentSearches);
console.log(recentSearches)
// console.log(loading)
// console.log(properties)
const [loading, setLoading] = useState(false); 
const [showingSearchResults, setShowingSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userId, setUserId] = useState(null);
  const colorScheme = useColorScheme();
  const [activeTab, setActiveTab] = useState('recent');
  const [isModalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [priceRange, setPriceRange] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [bedrooms, setBedrooms] = useState('Any');
  const [bathrooms, setBathrooms] = useState('Any');
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const [maxDistance, setMaxDistance] = useState('10'); 
  const googlePlacesRef = useRef();


  useEffect(() => {
    const getUserId = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        console.log('Stored user data:', user); // Log the user data
        if (user) {
          const parsedUser = JSON.parse(user);
          const storedUserId=parsedUser._id
          console.log('Parsed user data:', parsedUser); // Log the parsed user data
          setUserId(parsedUser._id);
          dispatch(fetchRecentSearches(storedUserId));
        }
      } catch (error) {
        console.error('Failed to fetch user ID from AsyncStorage:', error);
      }
    };
    getUserId();
  }, []);


  useFocusEffect(
    React.useCallback(() => {
      // This effect runs every time the screen comes into focus
      clearSearchResults();
    }, [])
   
  );
//   Geolocation.getCurrentPosition(info => {
//     const { latitude, longitude } = info.coords;
//     console.log(latitude, longitude);
//     // Now use these coordinates to get the address
// });
console.log(searchQuery,"kk")
const getCurrentLocation = () => {
  setLoading(true);
  Geolocation.getCurrentPosition(
    async position => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
      const address = await getAddress(latitude, longitude);
      if (address) {
        updateSearchQuery(address);
      }
      setLoading(false);
    },
    error => {
      console.error('Geolocation error:', error);
      Alert.alert('Error', `Failed to get location: ${error.message}`);
      setLoading(false);
    },
    { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
  );
};

  
  const updateSearchQuery = useCallback((newQuery) => {
    console.log("Updating search query to:", newQuery);
    setSearchQuery(newQuery);
    if (googlePlacesRef.current) {
      googlePlacesRef.current.setAddressText(newQuery);
    }
  }, []);
  
  const getAddress = async (latitude, longitude) => {
    const apiKey = 'AIzaSyARlogPc8tZDgm8MeT7Qc_pG8lcqJnCGvw';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await axios.get(url, { timeout: 10000 });
      const data = response.data;

      if (data.status === 'OK') {
        const address = data.results[0].formatted_address;
        console.log("Address:", address);
        return address;
      } else {
        console.error('Geocoding API error:', data.status);
        Alert.alert('Error', `Geocoding failed: ${data.status}`);
        return null;
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
      if (error.code === 'ECONNABORTED') {
        Alert.alert('Error', 'Request timed out. Please check your internet connection and try again.');
      } else {
        Alert.alert('Error', `Failed to fetch address: ${error.message}`);
      }
      return null;
    }
  };


  const clearSearchResults = () => {
    setSearchQuery('');
    setShowingSearchResults(false);
    dispatch(searchProperties({}));
  };
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
     
      
    },
    searchBarContainer: {
      flexDirection: 'row',
      padding: 10,
      alignItems: 'center',
      zIndex: 1,
      backgroundColor: '#f5f5f5',
    
    },
    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 25,
      padding: 10,
      marginRight: 10,
      backgroundColor: '#D3D3D3',
      zIndex: 2,
    },
    searchIcon: {
      marginRight: 10,
    },
    searchInput: {
      flex: 1,
      fontSize: 14,
    },
    filterButton: {
      padding: 10,
      borderRadius: 25,
    },
    currentLocationButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#f5f5f5',
    },
    currentLocationText: {
      marginLeft: 8,
    },
    tabButtons: {
      flexDirection: 'row',
      marginLeft: 16,
      marginRight: 'auto',
      marginVertical: 16,
      
    },
    tabButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      marginRight: 8,
    },
    activeTabButton: {
      backgroundColor: '#e6f0ff',
    },
    tabButtonText: {
      fontWeight: '500',
    },
    searchItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
      
      
    },
    searchItemContent: {
      flex: 1,
      marginLeft: 16,
    },
    searchItemLocation: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    searchItemDetails: {
      marginTop: 4,
    },
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalContent: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: 20,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#3498db',
      padding: 15,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    modalTitle: {
      color: '#ffffff',
      fontSize: 20,
      fontWeight: 'bold',
    },
    closeButton: {
      padding: 5,
    },
    scrollView: {
      maxHeight: '80%',
      paddingHorizontal: 15,
    },
    filterSectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    priceRangeContainer: {
      marginBottom: 20,
    },
    priceText: {
      textAlign: 'center',
      marginBottom: 10,
    },
    slider: {
      width: '100%',
      height: 40,
    },
    checkboxGroup: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 20,
    },
    checkbox: {
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      marginRight: 10,
      marginBottom: 10,
    },
    checkboxText: {
      fontSize: 14,
    },
    buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    button: {
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
    },
    buttonText: {
      fontSize: 14,
    },
    areaInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    areaInput: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
    },
    toText: {
      marginHorizontal: 10,
    },
    maxDistanceInput: {
      height: 40,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    updateButton: {
      margin:15,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    updateButtonText: {
    
      fontSize: 16,
      fontWeight: 'bold',
    },
    searchButtonContainer: {
      marginLeft: 10,
    },
    searchButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 2, // for Android shadow
      shadowColor: '#000', // for iOS shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
  });

 
  const [savedSearches, setSavedSearches] = useState([
    // {
    //   id: '1',
    //   location: 'Saved Location 1',
    //   details: 'Rent . Apartment . 1+ 1+ 1+',
    // },
    // {id: '2', location: 'Saved Location 2', details: 'Buy . House . 3+ 2+ 2+'},
    // ...
  ]);
  const handleRecentSearchClick = (item) => {
  updateSearchQuery(item.searchText);
  setLocation({
    latitude: item.latitude,
    longitude: item.longitude
  });
  // Optionally, you can also trigger a search here
  // handleSearch();
};

  const renderSearchItem = ({item}) => (
   <TouchableOpacity onPress={() => handleRecentSearchClick(item)}>
      <View style={styles.searchItem}>
        <Icon name="search" size={24} color={theme.colors.text} />
        <View style={styles.searchItemContent}>
          <Text style={[styles.searchItemLocation, {color: theme.colors.text}]}>
            {item.searchText}
          </Text>
          <Text
            style={[
              styles.searchItemDetails,
              {color: theme.colors.textSecondary},
            ]}>
            {item.details}
          </Text>
        </View>
        <TouchableOpacity>
          <Icon name="star-border" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );


const handleSearch = () => {
  const queryParams = {};

  if (location) {
    queryParams.latitude = location.latitude;
    queryParams.longitude = location.longitude;
    
  }
  if (maxDistance) queryParams.maxDistance = parseInt(maxDistance) * 1000; // Convert km to meters
  if (priceRange) {
    queryParams.minPrice = 0;
    queryParams.maxPrice = priceRange * 1000;
  }
  if (selectedTypes.length > 0) queryParams.propertyType = selectedTypes.join(',');
  if (bedrooms !== 'Any') {
    queryParams.minBedrooms = 0;
    queryParams.maxBedrooms = bedrooms.replace('+', '');
  }
  if (bathrooms !== 'Any') {
    queryParams.minBathrooms = 0;
    queryParams.maxBathrooms = bathrooms.replace('+', '');
  }
  if (minArea) queryParams.minArea = minArea;
  if (maxArea) queryParams.maxArea = maxArea;

  // Add the search query from GooglePlacesAutocomplete
  // if (searchQuery) queryParams.searchQuery = searchQuery;

  dispatch(searchProperties(queryParams));
  setShowingSearchResults(true);

  // Save the search
  if (userId) {
    const searchData = {
      userId: userId,
      searchText: searchQuery,
      latitude: location.latitude,
      longitude: location.longitude
    };
    dispatch(addRecentSearch(searchData));
  }
};

const handleSearchPress = () => {
  if (searchQuery.trim() !== '') {
    handleSearch();
  }
};
  const handleCancelPress = () => {
    setSearchQuery('');
    googlePlacesRef.current?.setAddressText('');
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const togglePropertyType = type => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type],
    );
  };

  const renderContent = () => {
    if (searchLoading) {
      return <ActivityIndicator size="large" color={theme.colors.primary} />;
    }

    // if (error) {
    //   return <Text style={{color: theme.colors.error}}>{error}</Text>;
    // }

    if (showingSearchResults&&properties && Array.isArray(properties.properties) && properties.properties.length > 0) {
     
      return  <ScrollView><SearchList properties={properties.properties}  /></ScrollView>;
    }
    return (
      <>
        <View style={styles.tabButtons}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'recent' && styles.activeTabButton]}
            onPress={() => setActiveTab('recent')}>
            <Text style={[styles.tabButtonText, {color: activeTab === 'recent' ? theme.colors.primary : theme.colors.text}]}>
              Recent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'saved' && styles.activeTabButton]}
            onPress={() => setActiveTab('saved')}>
            <Text style={[styles.tabButtonText, {color: activeTab === 'saved' ? theme.colors.primary : theme.colors.text}]}>
              Saved
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={activeTab === 'recent' ? recentSearches : savedSearches}
          renderItem={renderSearchItem}
          keyExtractor={item => item._id} 
        />
      </>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
    <View style={styles.searchBarContainer}>
      <View style={styles.searchContainer}>
      {searchQuery !== '' && (
            <TouchableOpacity onPress={() => updateSearchQuery('')} style={styles.iconButton}>
              <Icon name="close" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          )}
         <GooglePlacesAutocomplete
            ref={googlePlacesRef}
            placeholder="Search by Address, City, or ZIP"
            onPress={(data, details = null) => {
              console.log("Place selected:", data.description);
              updateSearchQuery(data.description);
              if (details && details.geometry) {
                setLocation({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng
                });
              }
            }}
            query={{
              key: 'AIzaSyARlogPc8tZDgm8MeT7Qc_pG8lcqJnCGvw',
              language: 'en',
            }}
            textInputProps={{
              placeholderTextColor: "black",
              backgroundColor: "#D3D3D3",
              value: searchQuery,
              onChangeText: (text) => {
                console.log("Input changed:", text);
                setSearchQuery(text);
              },
            }}
            styles={{
              textInput: styles.searchInput,
              predefinedPlacesDescription: {
                color: theme.colors.primary,
              },
              container: {
                flex: 1,
              },
              listView: {
                position: 'absolute',
                top: 50,
                left: 0,
                right: 0,
                backgroundColor: "#D3D3D3",
                borderRadius: 5,
                elevation: 3,
                zIndex: 1000,
              },
            }}
            enablePoweredByContainer={false}
            fetchDetails={true}
            debounce={300}
          />
        {searchQuery !== '' && (
          <View style={styles.searchButtonContainer}>
            <TouchableOpacity 
              onPress={handleSearchPress}
              style={styles.searchButton}
            >
              <Icon name="search" size={20} color={theme.colors.background} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={toggleModal}
        style={[styles.filterButton, { backgroundColor: theme.colors.primary }]}
      >
        <Icon name="tune" size={24} color={theme.colors.background} />
      </TouchableOpacity>
    </View>

    <TouchableOpacity style={styles.currentLocationButton} onPress={getCurrentLocation}>
    {loading ? (
          <ActivityIndicator size="small" color={theme.colors.primary} />
        ) : (
          <>
            <Icon name="my-location" size={24} color={theme.colors.primary} />
            <Text style={[styles.currentLocationText, { color: theme.colors.primary }]}>
              Use Current Location
            </Text>
          </>
        )}
    </TouchableOpacity>
      {renderContent()}

     
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          onSwipeComplete={toggleModal}
          // swipeDirection={['down']}
          style={styles.modal}>
          <View
            style={[
              styles.modalContent,
              {backgroundColor: theme.colors.background},
            ]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter</Text>
              <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                <Icon name="close" size={24} color={theme.colors.background} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView}>
            <Text style={[styles.filterSectionTitle, {color: theme.colors.text}]}>
              Max Distance (km)
            </Text>
            <TextInput
              style={[styles.maxDistanceInput, {color: theme.colors.text, borderColor: theme.colors.textSecondary}]}
              placeholder="Max Distance (km)"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="numeric"
              value={maxDistance}
              onChangeText={setMaxDistance}
            />
              {/* Price Range */}
              <Text
                style={[styles.filterSectionTitle, {color: theme.colors.text}]}>
                Price Range
              </Text>
              <View style={styles.priceRangeContainer}>
                <Text
                  style={[styles.priceText, {color: theme.colors.textSecondary}]}>
                  ${priceRange}k
                </Text>
                
                <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1000}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor={theme.colors.textSecondary}
              thumbTintColor={theme.colors.primary}
            />
              </View>

              {/* Property Type */}
              <Text
                style={[styles.filterSectionTitle, {color: theme.colors.text}]}>
                Property Type
              </Text>
              <View style={styles.checkboxGroup}>
                {['House', 'Apartment', 'Townhouse', 'Land'].map(
                  (type, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.checkbox,
                        selectedTypes.includes(type) && {
                          backgroundColor: theme.colors.primary,
                        },
                      ]}
                      onPress={() => togglePropertyType(type)}>
                      <Text
                        style={[
                          styles.checkboxText,
                          {
                            color: selectedTypes.includes(type)
                              ? theme.colors.background
                              : theme.colors.text,
                          },
                        ]}>
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ),
                )}
              </View>

              {/* Bedrooms */}
              <Text
                style={[styles.filterSectionTitle, {color: theme.colors.text}]}>
                Bedrooms
              </Text>
              <View style={styles.buttonGroup}>
                {['Any', '1+', '2+', '3+', '4+'].map((bed, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.button,
                      bedrooms === bed && {backgroundColor: theme.colors.primary},
                    ]}
                    onPress={() => setBedrooms(bed)}>
                    <Text
                      style={[
                        styles.buttonText,
                        {
                          color:
                            bedrooms === bed
                              ? theme.colors.background
                              : theme.colors.text,
                        },
                      ]}>
                      {bed}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Bathrooms */}
              <Text
                style={[styles.filterSectionTitle, {color: theme.colors.text}]}>
                Bathrooms
              </Text>
              <View style={styles.buttonGroup}>
                {['Any', '1+', '2+', '3+'].map((bath, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.button,
                      bathrooms === bath && {
                        backgroundColor: theme.colors.primary,
                      },
                    ]}
                    onPress={() => setBathrooms(bath)}>
                    <Text
                      style={[
                        styles.buttonText,
                        {
                          color:
                            bathrooms === bath
                              ? theme.colors.background
                              : theme.colors.text,
                        },
                      ]}>
                      {bath}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Area */}
              <Text
                style={[styles.filterSectionTitle, {color: theme.colors.text}]}>
                Area (sqft)
              </Text>
              <View style={styles.areaInputContainer}>
                <TextInput
                  style={[
                    styles.areaInput,
                    {
                      color: theme.colors.text,
                      borderColor: theme.colors.secondary,
                    },
                  ]}
                  placeholder="Min"
                  placeholderTextColor={theme.colors.secondary}
                  keyboardType="numeric"
                  value={minArea}
                  onChangeText={setMinArea}
                />
                <Text
                  style={[styles.toText, {color: theme.colors.secondary}]}>
                  to
                </Text>
                <TextInput
                  style={[
                    styles.areaInput,
                    {
                      color: theme.colors.text,
                      borderColor: theme.colors.secondary,
                    },
                  ]}
                  placeholder="Max"
                  placeholderTextColor={theme.colors.secondary}
                  keyboardType="numeric"
                  value={maxArea}
                  onChangeText={setMaxArea}
                />
              </View>
            </ScrollView>

            <TouchableOpacity
              style={[
                styles.updateButton,
                {backgroundColor: theme.colors.primary},
              ]}
              onPress={() => {
                // handleSearch();
                toggleModal();
              }}>
              <Text
                style={[
                  styles.updateButtonText,
                  {color: theme.colors.background},
                ]}>
                Apply Filters
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
    </View>
  );
};

export default SearchProperties;
