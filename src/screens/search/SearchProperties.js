import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { lightTheme, darkTheme } from '../../components/common/theme'; // Adjust this import path as needed

const SearchProperties = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const colorScheme = useColorScheme();
  const [activeTab, setActiveTab] = useState('recent');
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const [recentSearches, setRecentSearches] = useState([
    { id: '1', location: 'Balga, WA 6061', details: 'Buy . House . 2+ 1+ 1+' },
    { id: '2', location: 'Balga, WA 6061', details: 'Buy . House . 2+ 1+ 1+' },
    { id: '3', location: 'Balga, WA 6061', details: 'Buy . House . 2+ 1+ 1+' },
  ]);
  const [savedSearches, setSavedSearches] = useState([
    { id: '1', location: 'Saved Location 1', details: 'Rent . Apartment . 1+ 1+ 1+' },
    { id: '2', location: 'Saved Location 2', details: 'Buy . House . 3+ 2+ 2+' },
    // ...
  ]);

  const renderSearchItem = ({ item }) => (
    <View style={styles.searchItem}>
      <Icon name="search" size={24} color={theme.colors.text} />
      <View style={styles.searchItemContent}>
        <Text style={[styles.searchItemLocation, { color: theme.colors.text }]}>{item.location}</Text>
        <Text style={[styles.searchItemDetails, { color: theme.colors.textSecondary }]}>{item.details}</Text>
      </View>
      <TouchableOpacity>
        <Icon name="star-border" size={24} color={theme.colors.text} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.searchBarContainer}>
        <View style={[styles.searchContainer, { backgroundColor: theme.colors.secondary }]}>
          <Icon name="search" size={24} color={theme.colors.text} style={styles.searchIcon} />
          <TextInput 
            style={[styles.searchInput, { color: theme.colors.text }]}
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
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.colors.primary }]}>
          <Icon name="tune" size={24} color={theme.colors.background} />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.currentLocationButton}>
        <Icon name="my-location" size={24} color={theme.colors.primary} />
        <Text style={[styles.currentLocationText, { color: theme.colors.primary }]}>Use Current Location</Text>
      </TouchableOpacity>
      
      <View style={styles.tabButtons}>
  <TouchableOpacity 
    style={[
      styles.tabButton, 
      activeTab === 'recent' && styles.activeTabButton,
    ]}
    onPress={() => setActiveTab('recent')}
  >
    <Text style={[
      styles.tabButtonText, 
      { color: activeTab === 'recent' ? theme.colors.primary : theme.colors.text }
    ]}>Recent</Text>
  </TouchableOpacity>
  <TouchableOpacity 
    style={[
      styles.tabButton, 
      activeTab === 'saved' && styles.activeTabButton,
    ]}
    onPress={() => setActiveTab('saved')}
  >
    <Text style={[
      styles.tabButtonText, 
      { color: activeTab === 'saved' ? theme.colors.primary : theme.colors.text }
    ]}>Saved</Text>
  </TouchableOpacity>
</View>

<FlatList
  data={activeTab === 'recent' ? recentSearches : savedSearches}
  renderItem={renderSearchItem}
  keyExtractor={item => item.id}
/>
    </View>
  );
};

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
    backgroundColor: "blue", // Light blue background
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
});

export default SearchProperties;