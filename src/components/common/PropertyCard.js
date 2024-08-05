import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, typography } from '../../styles';

const PropertyCard = ({ property }) => (
  <View style={styles.container}>
    <Image source={ property.image } style={styles.image} />
    <View style={styles.content}>
      <Text style={styles.title}>{property.name}</Text>
      <Text style={styles.price}>{property.price}</Text>
      <View style={styles.location}>
        <Icon name="place" size={16} color={colors.textLight} />
        <Text style={styles.locationText}>{property.location}</Text>
      </View>
    </View>
  </View>
);

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
    color:"black"
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
});

export default PropertyCard;