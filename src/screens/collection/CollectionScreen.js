import React, {useState, useEffect , useRef } from 'react';
import { StyleSheet, FlatList, useColorScheme, View, Text, TouchableOpacity, Dimensions,ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { lightTheme, darkTheme } from '../../components/common/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoriteProperty } from '../../features/favoritePropertySlice';
import PropertyCard2 from '../../components/common/PropertyCard2';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const numColumns = 2;
const gap = 10;
const itemWidth = (width - gap * (numColumns + 1)) / numColumns;

const CollectionScreen = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [properties, setProperties] = useState([]); // State to store the properties
  const [loading, setLoading] = useState(false); // State for loading indicator
  const flatListRef = useRef(null); // Reference for FlatList to scroll to top
  const { favoriteProperties, loading:favoriteloading, error } = useSelector((state) => state.favoriteProperties);

  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  // useEffect(() => {
  //   const fetchProperties = async () => {
  //     const userData = await AsyncStorage.getItem('user');
  //     const parsedData = JSON.parse(userData);
  //     const userId = parsedData?._id;
  //     if (userId) {
  //       dispatch(fetchFavoriteProperty(userId));
  //     } else {
  //       console.log('user ID is null');
  //     }
  //   };

  //   fetchProperties();
  // }, [dispatch]);

 // Define fetchProperties function before using it
  // Fetch properties function
  const fetchProperties = async () => {
    setLoading(true); // Show loading indicator
    const userData = await AsyncStorage.getItem('user');
    const parsedData = JSON.parse(userData);
    const userId = parsedData?._id;
    if (userId) {
      const newProperties = await dispatch(fetchFavoriteProperty(userId)).unwrap();
      setProperties(prevProperties => [...prevProperties, ...newProperties]); // Append new properties
    }
    setLoading(false); // Hide loading indicator
  };

  useEffect(() => {
    if (isFocused) {
      fetchProperties();
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 }); // Scroll to top
    }
  }, [isFocused]);

  const handlePropertyPress = (property) => {
    console.log("Navigating to ApartmentScreen with property:", property);
    navigation.navigate('ApartmentScreen', { listing: property });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.itemContainer, { width: itemWidth }]}
      onPress={() => handlePropertyPress(item)}
    >
      <PropertyCard2 property={item} />
    </TouchableOpacity>
  );

  const favoriteProperty = favoriteProperties.map(item => ({
    id: item.property.id,
    image: item.property.mainImage || null,
    rating: item.property.rating || 0,
    title: item.property.title,
    location: item.property.location?.address || 'Location not available',
    area: item.property.squareFeet || 0,
    baths: item.property.bathrooms || 0,
    bedrooms: item.property.bedrooms || 0,
    price: item.property.price || 0,
    type: item.property.type || 'Not specified',
    images: item.property.images || [],
    reviews: item.property.reviews || [],
    viewedAt: item.viewedAt
  }));

  if (loading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // if (error) {
  //   return (
  //     <View style={[styles.centerContainer, { backgroundColor: theme.colors.background }]}>
  //       <Text style={{ color: theme.colors.text }}>Error: {error}</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>My Collections</Text>
      {favoriteProperty.length > 0 ? (
         
        <FlatList
        ref={flatListRef}
          data={favoriteProperty}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          contentContainerStyle={styles.gridContainer}
        />
      ) : (
        <View style={styles.noPropertiesContainer}>
          <Icon name="collections-bookmark" size={48} color={theme.colors.textLight} />
          <Text style={[styles.noPropertiesText, { color: theme.colors.textLight }]}>
            You haven't saved any properties to your collection yet
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  gridContainer: {
    paddingHorizontal: gap / 2,
  },
  itemContainer: {
    marginHorizontal: gap / 4,
    marginBottom: gap,
  },
  noPropertiesContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  noPropertiesText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CollectionScreen;