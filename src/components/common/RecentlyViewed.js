import React,{  useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import PropertyCard from './PropertyCard';
import {  colors,typography } from '../../styles';
import property from "../../../assets/property.png"
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecentViewed} from '../../features/viewedPropertySlice'; 
import {  addFavoriteProperty} from '../../features/favoritePropertySlice'; 



const RecentlyViewed = () => {

  const navigation = useNavigation();
  // const colorScheme = useColorScheme();
  const dispatch = useDispatch();

  const { viewedProperties, loading, error } = useSelector((state) => state.viewedProperties);
console.log(viewedProperties?.property,"kkk")
const viewedProperty = viewedProperties.map(item => ({
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
  // useEffect(()=>{
  //   dispatch( fetchRecentSearches(userId));
  // }
  

  // ,[])

  useEffect(() => {
    const fetchProperties = async () => {
      const userData = await AsyncStorage.getItem('user');
      const parsedData = JSON.parse(userData);
     
      const userId = parsedData?._id;
      console.log(userId,"ggg")
      if (userId) {
        dispatch( fetchRecentViewed(userId));
      } else {
        console.log('user ID is null');
      }
    };

    fetchProperties();
  }, [dispatch]);
  const handlePropertyPress = (property) => {
    navigation.navigate('ApartmentScreen', { listing: property });
  };
return (
  <View style={styles.container}>
  <Text style={styles.title}>Recently Viewed</Text>
  {viewedProperty.length > 0 ? (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {viewedProperty.map((property, index) => (
          <TouchableOpacity key={property.id} onPress={() => handlePropertyPress(property)}>
        <PropertyCard key={property.id|| `property-${index}`} property={property} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  ) : (
    <View style={styles.noPropertiesContainer}>
      <Icon name="visibility-off" size={48} color={colors.textLight} />
      <Text style={styles.noPropertiesText}>You have not viewed any properties yet</Text>
    </View>
  )}
</View>
)};

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  title: {
    ...typography.sectionTitle,
    marginBottom: 10,
    color:"black"
  },
  noPropertiesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  noPropertiesText: {
    ...typography.body,
    color: colors.textLight,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default RecentlyViewed;