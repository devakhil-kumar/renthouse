import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Address = ({ address ,latitude,longitude,onViewMapPress }) => {
  // const latitude = 37.78825;
  // const longitude = -122.4324;
  console.log({latitude,longitude})
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingTop:15 ,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    viewMapText: {
      fontSize: 14,
      color: colors.primary,
    },
    addressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    addressIcon: {
      marginRight: 10,
    },
    addressText: {
      fontSize: 14,
      color: colors.text,
      flex: 1,
    },
    mapContainer: {
      height: 200,
      marginBottom:100,
      borderRadius: 10,
      overflow: 'hidden',
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Address</Text>
        {/* <Text style={styles.viewMapText}>View on Map</Text> */}
      </View>
      <View style={styles.addressContainer}>
        <Icon 
          name="map-marker-outline" 
          size={24} 
          color={colors.text} 
          style={styles.addressIcon}
        />
        <Text style={styles.addressText}>{address}</Text>
      </View>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{ latitude, longitude }}
            title="Property Location"
          >
            <Icon name="home" size={30} color={colors.primary} />
          </Marker>
        </MapView>
      </View>
    </View>
  );
};

export default Address;