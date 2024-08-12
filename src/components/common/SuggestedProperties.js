import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import PropertyCard from './PropertyCard';
import { typography } from '../../styles';
import { lightTheme, darkTheme } from './theme';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuggestedProperties } from '../../features/suggestedPropertySlice';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to import the Icon component

const SuggestedProperties = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const { suggestedProperties, loading, error } = useSelector((state) => state.suggestedProperties);
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const suggestedProperty = suggestedProperties.map(property => ({
    id: property._id,
    image: property.mainImage || null,
    rating: property.rating || 0,
    title: property.title,
    location: property.location?.address || 'Location not available',
    area: property.squareFeet || 0,
    baths: property.bathrooms || 0,
    bedrooms: property.bedrooms || 0,
    price: property.price || 0,
    type: property.type || 'Not specified',
    images: property.images,
    reviews: property.reviews || []
  }));

  useEffect(() => {
    dispatch(fetchSuggestedProperties());
  }, []);

  const handlePropertyPress = (property) => {
    navigation.navigate('ApartmentScreen', { listing: property });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suggested Properties for you</Text>
      {suggestedProperty.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {suggestedProperty.map(property => (
            <TouchableOpacity key={property.id} onPress={() => handlePropertyPress(property)}>
              <PropertyCard property={property} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noPropertiesContainer}>
          <Icon name="home" size={48} color={theme.colors.textLight} />
          <Text style={[styles.noPropertiesText, { color: theme.colors.text }]}>
            No suggested properties available at the moment
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    
  },
  title: {
    ...typography.sectionTitle,
    marginBottom: 10,
    color: "black"
  },
  noPropertiesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  noPropertiesText: {
    ...typography.body,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SuggestedProperties;