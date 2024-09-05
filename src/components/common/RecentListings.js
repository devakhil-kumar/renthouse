import React,{useEffect,useState} from 'react';
import { View, Text, Image, StyleSheet, useColorScheme, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { lightTheme, darkTheme } from './theme';
import property from '../../../assets/property.png';
import user from '../../../assets/user.png';
import { useDispatch, useSelector } from 'react-redux';
import { getProperties,deleteProperty } from '../../features/propertySlice'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAgentPropertiesCount } from '../../features/propertySlice';
const ListingItem = ({ item, onPress, onEdit, onDelete }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [modalVisible, setModalVisible] = useState(false);
  const handleOptionsPress = () => {
    setModalVisible(true);
  };

  const handleOptionSelect = (option) => {
    setModalVisible(false);
    if (option === 'edit') {
      onEdit(item.id);
    } else if (option === 'delete') {
      onDelete(item.id);
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.listingItem, { backgroundColor: theme.colors.background }]}>
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
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
    <TouchableOpacity onPress={handleOptionsPress} style={styles.optionsButton}>
        <Icon name="more-vert" size={24} color={theme.colors.text} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalView, { backgroundColor: theme.colors.card }]}>
            <TouchableOpacity
              style={[styles.modalButton, { borderBottomWidth: 1, borderBottomColor: theme.colors.border }]}
              onPress={() => handleOptionSelect('edit')}
            >
              <Text style={[styles.modalButtonText, { color: theme.colors.text }]}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { borderBottomWidth: 1, borderBottomColor: theme.colors.border }]}
              onPress={() => handleOptionSelect('delete')}
            >
              <Text style={[styles.modalButtonText, { color: theme.colors.error }]}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.modalButtonText, { color: theme.colors.primary }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  </TouchableOpacity>
  );
};

const RecentListings = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [showAll, setShowAll] = useState(false);
  const [agentId, setAgentId] = useState(null);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { properties, loading, error } = useSelector((state) => state.properties);

 
  useEffect(() => {
    const fetchProperties = async () => {
      const userData = await AsyncStorage.getItem('user');
      setUser(JSON.parse(userData));
      const parsedData = JSON.parse(userData);
      const agentId = parsedData?._id;
      if (agentId) {
        dispatch(getProperties(agentId));
      } else {
        console.log('Agent ID is null');
      }
    };

    fetchProperties();
  }, [dispatch]);
  

  const handleEdit = (propertyId) => {
    // Find the property with the matching ID
    const propertyToEdit = properties.find(property => property._id === propertyId);
    if (propertyToEdit) {
      navigation.navigate('AddPropertyScreen', { propertyToEdit });
    }
  };

  // const handleDelete = (id) => {
  //   // Implement delete functionality
  //   dispatch(deleteProperty(id));
  //   console.log('Delete item with id:', id);
  // };
  const handleDelete  = async (propertyId) => {
    try {
      // Dispatch an action to delete the property
      await dispatch(deleteProperty(propertyId));
      
      // After deleting, fetch the updated properties count
      dispatch(getAgentPropertiesCount(user._id));
    } catch (error) {
      console.error('Failed to delete property:', error);
    }
  };
  // console.log("response recentlisting",properties)
  // useEffect(() => {
  //   dispatch(getProperties(agentId));
  // }, [dispatch]);
  if (loading) return <Text>Loading...</Text>;
  // if (error) return <Text>Error: {error}</Text>;
  // const listings = properties.map(property => ({
  //   id: property._id,
  //   image: property.mainImage || null, // Use a default image if not provided
  //   rating: property.rating || 0,
  //   title: property.title,
  //   description:property.description || "No description about the property",
  //   location: property.location?.address|| 'Location not available',

  //   features: property?.features || [],
  //   area: property.squareFeet || 0,
  //   baths: property.bathrooms || 0,
  //   bedrooms:property.bedrooms || 0,
  //   price: property.price || 0,
  //   type: property.type || 'Not specified',
  //   images: property.images , // Use default if not provided
  //   reviews: property.reviews || [] ,// Empty array if no reviews
  //   category:property.category||"NA",
  //   furnishedType:property.furnishedType||"null",
  //   isGatedSociety: property.gatedSociety || false,
  // isPetFriendly: property.petFriendly || false,
  // preferredTenant: property.preferredTenant || 'Any',
  // availableDate: property.nextAvailableDate || null, // Use null if not provided
  // updatedDate: property.updatedAt || null, // Use null if not provided
  // }));

  const listings = properties.map(property => {
    // Extract latitude and longitude from coordinates if available
    const [latitude = null, longitude = null] = property.location?.coordinates || [];
  
    return {
      id: property._id,
      image: property.mainImage || null, // Use a default image if not provided
      rating: property.rating || 0,
      title: property.title,
      description: property.description || "No description about the property",
      location: property.location?.address || 'Location not available',
      city: property.location?.city || 'City not available',
      state: property.location?.state || 'State not available',
      country: property.location?.country || 'Country not available',
      latitude: latitude, // Extracted latitude
      longitude: longitude, // Extracted longitude
      features: property.features || [],
      area: property.squareFeet || 0,
      baths: property.bathrooms || 0,
      bedrooms: property.bedrooms || 0,
      price: property.price || 0,
      type: property.type || 'Not specified',
      images: property.images || [], // Use default if not provided
      reviews: property.reviews || [], // Empty array if no reviews
      category: property.category || "NA",
      furnishedType: property.furnishedType || "null",
      isGatedSociety: property.gatedSociety || false,
      isPetFriendly: property.petFriendly || false,
      preferredTenant: property.preferredTenant || 'Any',
      availableDate: property.nextAvailableDate || null, // Use null if not provided
      updatedDate: property.updatedAt || null, // Use null if not provided
    };
  });
  const displayedListings = showAll ? listings : listings.slice(0, 3);
  const handleListingPress = (item) => {
    navigation.navigate('ApartmentScreen', { listing: item });
  };
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: theme.colors.text }]}>Recent Listing Properties</Text>
        <TouchableOpacity onPress={toggleShowAll}>
  <Text style={[styles.viewAll, { color: theme.colors.primary }]}>
    {showAll ? 'Show Less' : 'View All'}
  </Text>
</TouchableOpacity>
      </View>
      {displayedListings.map((listing) => (
  <ListingItem key={listing.id} item={listing} onPress={() => handleListingPress(listing)}    onEdit={handleEdit}
  onDelete={handleDelete} />
))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#f5f5f5',
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
    padding:10,
    overflow: 'hidden',
    flex: 1,
    position: 'relative',
    elevation:5
  },
  imageContainer: {
    flex: 1/2,
   
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  type: {
    position: 'absolute',
    top: 10,
    right: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  optionsButton: {
    position: 'absolute',
    top:10,
    right: 5,
    zIndex: 1,
    padding: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    borderRadius: 20,
    padding: 0,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalButton: {
    padding: 15,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default RecentListings;
