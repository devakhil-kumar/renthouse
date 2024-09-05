import React,{useState,useEffect, useCallback, useRef} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, typography } from '../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteProperty,deleteFavoriteProperty,
  fetchFavoritePropertyID } from '../../features/favoritePropertySlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
const PropertyCard = ({ property }) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
 
  const { favPropertiesID, loading, error,message } = useSelector((state) => state.favoriteProperties);
// console.log(favPropertiesID)
const checkFavoriteStatus = useCallback(async () => {
  try {
    const userData = await AsyncStorage.getItem('user');
    const parsedData = JSON.parse(userData);
    const userId = parsedData?._id;

    if (userId) {
      dispatch(fetchFavoritePropertyID(userId));
    }
  } catch (error) {
    console.error('Error fetching favorite properties:', error);
  }
}, [dispatch]);

useEffect(() => {
  checkFavoriteStatus();
}, [checkFavoriteStatus]);


useEffect(() => {
  const favoriteStatus = favPropertiesID.some(fav => fav.propertyId === property.id);
  if (isFavorite !== favoriteStatus) {
    setIsFavorite(favoriteStatus);
  }
}, [favPropertiesID, property.id, isFavorite]);
  // useEffect(() => {
  //   setIsFavorite(favPropertiesID.some(fav => fav.propertyId === property.id));
  // }, [favPropertiesID, property.id]);
  // console.log(isFavorite)
 
  

  
  const handleAddFavorite = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const parsedData = JSON.parse(userData);
      const userId = parsedData?._id;
  
      if (userId && property.id) {
        if (isFavorite) {
          await dispatch(deleteFavoriteProperty({ userId, propertyId: property.id })).unwrap();
          setIsFavorite(false);
          Toast.show({
            type: 'error',
            text1: 'Removed from collection',
          });
        } else {
          await dispatch(addFavoriteProperty({ userId, propertyId: property.id })).unwrap();
          setIsFavorite(true);
          Toast.show({
            type: 'success',
            text1: 'Added to collection',
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'User ID or Property ID is missing',
        });
      }
    } catch (error) {
      console.error('Error toggling collection property:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Failed to update collection',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: property.image }} style={styles.image} />
      <TouchableOpacity style={styles.bookmarkButton} onPress={handleAddFavorite}>
        <Icon name={isFavorite ? "bookmark" : "bookmark-outline"}  size={24} color={colors.primary} />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>{property.title}</Text>
        <Text style={styles.price}>${property.price}</Text>
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
    marginBottom:10,
    marginLeft:3,
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