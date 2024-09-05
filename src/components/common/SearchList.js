import React, { useState,useEffect } from 'react';
import { View, Text, Image, StyleSheet, useColorScheme, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { lightTheme, darkTheme } from './theme';
import property from '../../../assets/property.png'; // Default image
import user from '../../../assets/user.png'; // Default image
import { addRecentViewed } from '../../features/viewedPropertySlice'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ListingItem = ({ item, onPress }) => {


  
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  


  return (
    <TouchableOpacity onPress={onPress} style={[styles.listingItem, { backgroundColor: theme.colors. background }]}>
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
    </View>
    <View style={styles.infoContainer}>
      <View style={styles.ratingContainer}>
        <Text style={[styles.star, { color: theme.colors.rating }]}>★</Text>
        <Text style={[styles.rating, { color: theme.colors.text }]}>{item.rating}</Text>
      </View>
      <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
      <Text style={[styles.location, { color: theme.colors.text }]}>{item.location}</Text>
      <View style={styles.details}>
        <Text style={[styles.detailText, { color: theme.colors.text }]}>{item.area} area</Text>
        <Text style={[styles.detailText, { color: theme.colors.text }]}>{item.baths} bath</Text>
        <Text style={[styles.price, { color: theme.colors.primary }]}>${item.price}/month</Text>
      </View>
    </View>
    <Text style={[styles.type, { color: theme.colors.primary }]}>{item.type}</Text>
   
      </TouchableOpacity>
  );
};

const SearchList = ({ properties }) => {

  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [showAll, setShowAll] = useState(false);
  const [userId, setUserId] = useState(null);
  // const { properties:viewedproperties, loading ,error } = useSelector((state) => state. viewedProperties);
  const navigation = useNavigation();
  useEffect(() => {
    const getUserId = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        console.log('Stored user data:', user); // Log the user data
        if (user) {
          const parsedUser = JSON.parse(user);
          // const storedUserId=parsedUser._id
          console.log('Parsed user data:', parsedUser); // Log the parsed user data
          setUserId(parsedUser._id);
         
        }
      } catch (error) {
        console.error('Failed to fetch user ID from AsyncStorage:', error);
      }
    };
    getUserId();
  }, []);

  // Ensure property mapping is correct
  const listings = properties.map(property => {
    // Extract latitude and longitude from coordinates if available
    const [latitude = null, longitude = null] = property.location?.coordinates || [];
  
    return {
      id: property._id,
      image: property.mainImage || null, // Use a default image if not provided
      rating: property.rating || 0,
      title: property.title,
      description: property.description || "No description about the property",
      location: property.location?.address || 'Location not available',
      city: property.location?.city || 'City not available',
      state: property.location?.state || 'State not available',
      country: property.location?.country || 'Country not available',
      latitude: latitude, // Extracted latitude
      longitude: longitude, // Extracted longitude
      features: property.features || [],
      area: property.squareFeet || 0,
      baths: property.bathrooms || 0,
      bedrooms: property.bedrooms || 0,
      price: property.price || 0,
      type: property.type || 'Not specified',
      images: property.images || [], // Use default if not provided
      reviews: property.reviews || [], // Empty array if no reviews
      category: property.category || "NA",
      furnishedType: property.furnishedType || "null",
      isGatedSociety: property.gatedSociety || false,
      isPetFriendly: property.petFriendly || false,
      preferredTenant: property.preferredTenant || 'Any',
      availableDate: property.nextAvailableDate || null, // Use null if not provided
      updatedDate: property.updatedAt || null, // Use null if not provided
    };
  });
  
  const displayedListings = showAll ? listings : listings.slice(0, 3);
  console.log(displayedListings, 'kkkk');
  const handleListingPress = async(item) => {
    navigation.navigate('ApartmentScreen', { listing: item });
    if (userId) {
      const viewedPropertyData = { userId, propertyId: item.id }; // Adjust as needed
      try {
        await dispatch(addRecentViewed(viewedPropertyData)).unwrap();
        // Handle success (e.g., show a success message or update local state)
        console.log('Recent search added successfully');
      } catch (error) {
        // Handle error (e.g., show an error message)
        console.error('Failed to add recent search:', error);
      }
    }
  };
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: theme.colors.text }]}>Properties</Text>
        <TouchableOpacity onPress={toggleShowAll}>
          <Text style={[styles.viewAll, { color: theme.colors.primary }]}>
            {showAll ? 'Show Less' : 'View All'}
          </Text>
        </TouchableOpacity>
      </View>
    
      {displayedListings.map((listing) => (
      
      <ListingItem key={listing.id} item={listing} onPress={() => handleListingPress(listing)} />
    
      ))}
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#f5f5f5',
   
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    fontSize: 14,
  },
  listingItem: {
    height:180,
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 15,
    padding:10,
    overflow: 'hidden',
    flexg: 1,
    position: 'relative',
    elevation:5
  },
  imageContainer: {
    flex: 1/2,
   
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    padding: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  star: {
    fontSize: 18,
    marginRight: 5,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    marginBottom: 10,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  type: {
    position: 'absolute',
    top: 10,
    right: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});

export default SearchList;
