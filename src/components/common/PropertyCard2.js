// PropertyCard.js
import React from 'react';
import { View, Image, Text, StyleSheet, useColorScheme, Dimensions,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { lightTheme, darkTheme } from './theme';

const { width } = Dimensions.get('window');
const cardWidth = (width - 30) / 2; // 2 columns with 10px padding on each side

const PropertyCard2 = ({ image, name, price, address }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <Image source={image } style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: theme.colors.text }]}>{name}</Text>
        <Text style={[styles.price, { color: theme.colors.primary }]}>${price}/month</Text>
        <Text style={[styles.address, { color: theme.colors.text }]}>{address}</Text>
      </View>
      <TouchableOpacity style={styles.bookmarkButton}>
        <Icon name="bookmark-outline" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    fontSize: 12,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default PropertyCard2;