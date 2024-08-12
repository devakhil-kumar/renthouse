import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, typography } from '../../styles';
import { useDispatch } from 'react-redux';
import { addFavoriteProperty } from '../../features/favoritePropertySlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PropertyCard = ({ property }) => {
  const dispatch = useDispatch();

  const handleAddFavorite = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const parsedData = JSON.parse(userData);
      const userId = parsedData?._id;

      if (userId && property.id) {
        dispatch(addFavoriteProperty({ userId, propertyId: property.id }));
      } else {
        console.log('User ID or Property ID is missing');
      }
    } catch (error) {
      console.error('Error adding favorite property:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: property.image }} style={styles.image} />
      <TouchableOpacity style={styles.bookmarkButton} onPress={handleAddFavorite}>
        <Icon name="bookmark-outline" size={24} color={colors.primary} />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>{property.title}</Text>
        <Text style={styles.price}>{property.price}</Text>
        <View style={styles.location}>
          <Icon name="place" size={16} color={colors.textLight} />
          <Text style={styles.locationText}>{property.location}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 250,
    marginRight: 15,
    borderRadius: 8,
    backgroundColor: colors.white,
    ...typography.shadow,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    padding: 10,
  },
  title: {
    ...typography.body,
    fontWeight: 'bold',
    color: "black"
  },
  price: {
    ...typography.body,
    color: colors.primary,
    marginTop: 5,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    ...typography.caption,
    color: colors.textLight,
    marginLeft: 5,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 5,
  },
});

export default PropertyCard;