import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useColorScheme, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { lightTheme, darkTheme } from './theme';
import property from '../../../assets/property.png'; // Default image
import user from '../../../assets/user.png'; // Default image

const ListingItem = ({ item, onPress }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.listingItem, { backgroundColor: theme.colors.card }]}>
    <View style={styles.imageContainer}>
      <Image source={item.image ? { uri: item.image } : property} style={styles.image} />
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
      <Text style={[styles.type, { color: theme.colors.primary }]}>{item.type}</Text>
    </View>
  </TouchableOpacity>
  );
};

const SearchList = ({ properties }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [showAll, setShowAll] = useState(false);

  const navigation = useNavigation();

  // Ensure property mapping is correct
  const listings = properties.map(property => ({
    id: property._id,
    image: property.mainImage || null, // Use a default image if not provided
    rating: property.rating || 0,
    title: property.title,
    location: property.location?.address|| 'Location not available',
    area: property.squareFeet || 0,
    baths: property.bathrooms || 0,
    bedrooms:property.bedrooms || 0,
    price: property.price || 0,
    type: property.type || 'Not specified',
    images: property.images || [defaultPropertyImage], // Use default if not provided
    reviews: property.reviews || [] // Empty array if no reviews
  }));
  
  const displayedListings = showAll ? listings : listings.slice(0, 3);
  console.log(displayedListings, 'kkkk');
  const handleListingPress = (item) => {
    navigation.navigate('ApartmentScreen', { listing: item });
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
      <ScrollView>
      {displayedListings.map((listing) => (
      
      <ListingItem key={listing.id} item={listing} onPress={() => handleListingPress(listing)} />
    
      ))}
       </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
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
        flexDirection: 'row',
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
        flexGrow: 1,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 2,
      },
      imageContainer: {
        width: 120,
        height: 135,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        overflow: 'hidden',
      },
      image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
      infoContainer: {
        flexGrow: 1,
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
        fontSize: 16,
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
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
      },
});

export default SearchList;
