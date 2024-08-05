import React, {useState} from 'react';
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
  ActivityIndicator
  // Slider
} from 'react-native';
import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {lightTheme, darkTheme} from '../../components/common/theme'; // Adjust this import path as needed
import { useDispatch, useSelector } from 'react-redux';
import { searchProperties } from '../../features/searchPropertySlice';
import SearchList from '../../components/common/SearchList';

const SearchProperties = () => {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.searchProperties);
console.log(properties.properties)
console.log(loading)
console.log(properties)
  const [searchQuery, setSearchQuery] = useState('');
  const colorScheme = useColorScheme();
  const [activeTab, setActiveTab] = useState('recent');
  const [isModalVisible, setModalVisible] = useState(false);

  const [priceRange, setPriceRange] = useState(500);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [bedrooms, setBedrooms] = useState('Any');
  const [bathrooms, setBathrooms] = useState('Any');
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');

  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    searchBarContainer: {
      flexDirection: 'row',
      padding: 10,
      alignItems: 'center',
    },
    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 25,
      padding: 10,
      marginRight: 10,
    },
    searchIcon: {
      marginRight: 10,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
    },
    filterButton: {
      padding: 10,
      borderRadius: 25,
    },
    currentLocationButton: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 16,
    },
    currentLocationText: {
      marginLeft: 8,
    },
    tabButtons: {
      flexDirection: 'row',
      marginLeft: 16,
      marginRight: 'auto', // This will push the buttons to the left
      marginVertical: 16,
    },
    tabButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20, // Increased for more rounded corners
      marginRight: 8,
    },
    activeTabButton: {
      backgroundColor: 'blue', // Light blue background
    },
    tabButtonText: {
      fontWeight: '500',
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
      padding: 22,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    modalContent: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: 20,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#3498db', // Blue color for header
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

    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalSubtitle: {
      fontSize: 14,
      marginBottom: 20,
    },
    propertyTypeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
    },
    propertyTypeText: {
      fontSize: 16,
    },
    radioButton: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
    },
    updateButton: {
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    updateButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
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
      borderColor: theme.colors.textSecondary,
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
      borderColor: theme.colors.textSecondary,
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
    sliderContainer: {
      height: 40,
      justifyContent: 'center',
    },
    sliderTrack: {
      height: 4,
      backgroundColor: theme.colors.textSecondary,
      borderRadius: 2,
    },
    sliderFill: {
      height: 4,
      backgroundColor: theme.colors.primary,
      borderRadius: 2,
      position: 'absolute',
    },
    sliderThumb: {
      width: 20,
      height: 20,
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
      position: 'absolute',
      top: 10,
      marginLeft: -10,
    },
  });

  const [recentSearches, setRecentSearches] = useState([
    {id: '1', location: 'Balga, WA 6061', details: 'Buy . House . 2+ 1+ 1+'},
    {id: '2', location: 'Balga, WA 6061', details: 'Buy . House . 2+ 1+ 1+'},
    {id: '3', location: 'Balga, WA 6061', details: 'Buy . House . 2+ 1+ 1+'},
  ]);

  const [savedSearches, setSavedSearches] = useState([
    {
      id: '1',
      location: 'Saved Location 1',
      details: 'Rent . Apartment . 1+ 1+ 1+',
    },
    {id: '2', location: 'Saved Location 2', details: 'Buy . House . 3+ 2+ 2+'},
    // ...
  ]);

  const renderSearchItem = ({item}) => (
    <View style={styles.searchItem}>
      <Icon name="search" size={24} color={theme.colors.text} />
      <View style={styles.searchItemContent}>
        <Text style={[styles.searchItemLocation, {color: theme.colors.text}]}>
          {item.location}
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
  );

  const handleSearch = () => {
    const queryParams = {};

    // Only add parameters that have a value
    // if (longitude) queryParams.longitude = longitude;
    // if (latitude) queryParams.latitude = latitude;
    // if (maxDistance) queryParams.maxDistance = maxDistance;
    if (priceRange) queryParams.minPrice = 50 ;
    if (priceRange) queryParams.maxPrice = priceRange * 1000;
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
  
    // Dispatch the action with only the selected filters
    dispatch(searchProperties(queryParams));

 
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
    if (loading) {
      return <ActivityIndicator size="large" color={theme.colors.primary} />;
    }

    if (error) {
      return <Text style={{color: theme.colors.error}}>{error}</Text>;
    }

    if (properties && Array.isArray(properties.properties) && properties.properties.length > 0) {
      return <SearchList properties={properties.properties}  />;
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
          keyExtractor={item => item.id}
        />
      </>
    );
  };

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.searchBarContainer}>
        <View
          style={[
            styles.searchContainer,
            {backgroundColor: theme.colors.secondary},
          ]}>
          <Icon
            name="search"
            size={24}
            color={theme.colors.text}
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput, {color: theme.colors.text}]}
            placeholder="Search by Address, City, or ZIP"
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={toggleModal}
          style={[
            styles.filterButton,
            {backgroundColor: theme.colors.primary},
          ]}>
          <Icon name="tune" size={24} color={theme.colors.background} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.currentLocationButton}>
        <Icon name="my-location" size={24} color={theme.colors.primary} />
        <Text
          style={[styles.currentLocationText, {color: theme.colors.primary}]}>
          Use Current Location
        </Text>
      </TouchableOpacity>
      {renderContent()}

      {/* <View style={styles.tabButtons}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'recent' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('recent')}>
          <Text
            style={[
              styles.tabButtonText,
              {
                color:
                  activeTab === 'recent'
                    ? theme.colors.primary
                    : theme.colors.text,
              },
            ]}>
            Recent
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'saved' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('saved')}>
          <Text
            style={[
              styles.tabButtonText,
              {
                color:
                  activeTab === 'saved'
                    ? theme.colors.primary
                    : theme.colors.text,
              },
            ]}>
            Saved
          </Text>
        </TouchableOpacity>
      </View> */}

      {/* <FlatList
        data={activeTab === 'recent' ? recentSearches : savedSearches}
        renderItem={renderSearchItem}
        keyExtractor={item => item.id}
      /> */}
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
              minimumValue={50}
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
                      borderColor: theme.colors.textSecondary,
                    },
                  ]}
                  placeholder="Min"
                  placeholderTextColor={theme.colors.textSecondary}
                  keyboardType="numeric"
                  value={minArea}
                  onChangeText={setMinArea}
                />
                <Text
                  style={[styles.toText, {color: theme.colors.textSecondary}]}>
                  to
                </Text>
                <TextInput
                  style={[
                    styles.areaInput,
                    {
                      color: theme.colors.text,
                      borderColor: theme.colors.textSecondary,
                    },
                  ]}
                  placeholder="Max"
                  placeholderTextColor={theme.colors.textSecondary}
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
                handleSearch();
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
