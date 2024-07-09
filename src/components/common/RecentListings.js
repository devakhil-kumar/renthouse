import React from 'react';
import { View, Text, Image, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { lightTheme, darkTheme } from './theme';
import property from '../../../assets/property.png';
import user from '../../../assets/user.png';

const ListingItem = ({ item, onPress }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.listingItem, { backgroundColor: theme.colors.card }]}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
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

const RecentListings = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const navigation = useNavigation();

  const listings = [
    {
      id: '1',
      image: property,
      rating: 4.9,
      title: 'Woodland Apartment',
      location: '1012 Ocean avenue, New york, USA',
      area: 1.225,
      baths: 3.0,
      price: 340,
      
      type: 'Apartment',
      images: [property, property, property], // Add paths to images
    reviews: [
      { text: 'Great place, very clean!', author: 'John Doe', rating:3,user:user ,helpfulCount:2},
      { text: 'Amazing experience!', author: 'Jane Smith',rating:3,user:user,helpfulCount:2},
      // Add more reviews as needed
    ],
    },
    {
      id: '2',
      image: property,
      rating: 4.9,
      title: 'Woodland Apartment',
      location: '1012 Ocean avenue, New york, USA',
      area: 1.225,
      baths: 3.0,
      price: 340,
      type: 'Apartment',
      rating:3,
      images: [property, property, property], // Add paths to images
    reviews: [
      { text: 'Very comfortable stay.', author: 'Alice Brown' ,rating:3 ,user:user,helpfulCount:2 },
      { text: 'Would definitely come back!', author: 'Bob White', rating:3 ,user:user,helpfulCount:2},
      // Add more reviews as needed
    ],
    },
    // Add more listing items as needed
  ];

  const handleListingPress = (item) => {
    navigation.navigate('ApartmentScreen', { listing: item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: theme.colors.text }]}>Recent Listing Properties</Text>
        <Text style={[styles.viewAll, { color: theme.colors.primary }]}>View all</Text>
      </View>
      {listings.map((listing) => (
        <ListingItem key={listing.id} item={listing} onPress={() => handleListingPress(listing)} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    flex: 1,
  },
  imageContainer: {
    flex: 1/2,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
    fontSize: 16,
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

export default RecentListings;
