import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Linking,
  Platform,
  PermissionsAndroid,
  Animated,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Address from '../../components/common/Address';
import ReviewTab from './ReviewTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAgentDetails} from '../../features/authSlice';
import { createNotification } from '../../features/notificationSlice';

const Tab = createMaterialTopTabNavigator();

const ApartmentScreen = ({route}) => {
  const {listing} = route.params;
  const {colors} = useTheme();
  const {width} = useWindowDimensions();
  const dispatch = useDispatch();
  const {Agent, loading, error} = useSelector(state => state.auth);
  const [modalVisible, setModalVisible] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [avatarUri, setAvatarUri] = useState(null);
  // console.log(userRole==="user")
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const translateY = new Animated.Value(0);
  const onGestureEvent = Animated.event(
    [{nativeEvent: {translationY: translateY}}],
    {useNativeDriver: true},
  );

  const onHandlerStateChange = ({nativeEvent}) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationY > 10) {
        // If the user has swiped down by more than 100 pixels, close the modal
        Animated.timing(translateY, {
          toValue: 500, // move the modal out of the screen
          duration: 300,
          useNativeDriver: true,
        }).start(() => setModalVisible(false));
      } else {
        // If not, reset the position
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        // console.log('Stored user data:', user); // Log the user data
        if (user) {
          const parsedUser = JSON.parse(user);
          // console.log('Parsed user data:', parsedUser); // Log the parsed user data
          setUserRole(parsedUser.role);
          setUserId(parsedUser._id);
        }
      } catch (error) {
        console.error('Failed to fetch user ID from AsyncStorage:', error);
      }
    };
    getUserRole();
  }, []);

  useEffect(() => {
    console.log(listing.agentId);
    if (listing && listing.agentId) {
      const ID = listing.agentId;
      dispatch(fetchAgentDetails(ID));
    }
  }, [listing]);
  console.log(Agent, 'llllll');
  const agentData = {
    name: Agent?.name || 'akhil',
    address: Agent?.Address || '456 Oak Avenue, Sunnyville, CA 90210',
    email: Agent?.email,
    phone: Agent?.phone,
    imageUrl:
      Agent?.imageurl ||
      'http://95.216.209.46:5500/uploads/properties_1722843949432-image_1.jpeg',
  };
  // const handleCallNow = () => {
  //   let phoneNumber = +917560029425;
  //   if (Platform.OS !== 'android') {
  //     phoneNumber = `telprompt:${phoneNumber}`;
  //   } else {
  //     phoneNumber = `tel:${phoneNumber}`;
  //   }
  //   // console.log( Linking.canOpenURL(phoneNumber),"ll")
  //   Linking.canOpenURL(phoneNumber)
  //     .then(supported => {
  //       // console.log(supported,"gg")
  //       if (!supported) {
  //         alert('Phone number is not available');
  //       } else {
  //         return Linking.openURL(phoneNumber);
  //       }
  //     })
  //     .catch(err => console.error('An error occurred'));
  // };
  async function requestCallPermission() {
    if (Platform.OS !== 'android') return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        {
          title: 'Phone Call Permission',
          message: 'This app needs access to your phone to make calls',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Error requesting call permission:', err);
      return false;
    }
  }

  const handleCallNow = async () => {
    const phoneNumber = '+917560029425';

    if (Platform.OS === 'android') {
      const hasPermission = await requestCallPermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission Denied',
          'You need to grant phone call permission to make calls.',
        );
        return;
      }
    }

    const url =
      Platform.OS === 'android'
        ? `tel:${phoneNumber}`
        : `telprompt:${phoneNumber}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert(
          'Not Supported',
          'Phone calls are not supported on this device',
        );
      } else {
        await Linking.openURL(url);
      }
    } catch (err) {
      console.error('An error occurred while trying to make a call:', err);
      Alert.alert('Error', 'An error occurred while trying to make the call');
    }
  };
  // const handleRequestCall = async () => {
  //   if (userId && listing) {
  //     const notificationData = {
  //       userId: userId,
  //       agentId: listing.agentId,
  //       propertyId: listing.id,
  //       // Add any other required fields for your notification
  //     };
      
  //     try {
  //       await dispatch(createNotification(notificationData)).unwrap();
  //       // You can add a success message or any other feedback here
  //       console.log('Notification created successfully');
  //     } catch (error) {
  //       console.error('Failed to create notification:', error);
  //       // You can add an error message or any other error handling here
  //     }
  //   } else {
  //     console.error('Missing user ID or listing data');
  //   }
  // };
  const handleRequestCall = async () => {
    if (userId && listing) {
      const notificationData = {
        userId: userId,
        agentId: listing.agentId,
        propertyId: listing.id,
        // Add any other required fields for your notification
      };
      
      try {
        await dispatch(createNotification(notificationData)).unwrap();
        Toast.show({
          type: 'success',
          text1: 'Request Sent',
          text2: 'The agent will contact you soon.',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        toggleModal(); // Hide the modal
      } catch (error) {
        console.error('Failed to create notification:', error);
        Toast.show({
          type: 'error',
          text1: 'Request Failed',
          text2: 'Please try again later.',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
    } else {
      console.error('Missing user ID or listing data');
      Toast.show({
        type: 'error',
        text1: 'Request Failed',
        text2: 'Missing user or property information.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };
  const DescriptionTab = ({listing}) => {
    const {colors} = useTheme();
    const [showFullDescription, setShowFullDescription] = useState(false);
    const propertyDetails = [
      {icon: 'resize', value: listing.area, label: 'sqft'},
      {icon: 'bed-empty', value: listing.bedrooms || 'N/A', label: 'Bedrooms'},
      {icon: 'shower', value: listing.baths || 'N/A', label: 'Bathrooms'},
      {
        icon: 'shield-check',
        value: listing.squareFeet || 'N/A',
        label: 'Safety Rank',
      },
    ];
    const facilities = [
      {name: 'Car Parking', icon: 'car', key: 'parking'},
      {name: 'Swimming...', icon: 'swim', key: 'pool'},
      {name: 'Gym & Fit', icon: 'dumbbell', key: 'gym&fit'},
      {name: 'Wi-fi', icon: 'wifi', key: 'wifi'},
      {name: 'Laundry', icon: 'washing-machine', key: 'washingMachine'},
      {name: 'Gas Stove', icon: 'stove', key: 'gasAndStove'},
      {name: 'Lift', icon: 'elevator', key: 'lift'},
      {name: 'A/C', icon: 'air-conditioner', key: 'ac'},
      {name: 'Refrigerator', icon: 'fridge', key: 'fridge'},
      {name: 'Power Backup', icon: 'power', key: 'powerBackup'},
    ];

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.background,
      },
      header: {
        padding: 15,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
      },
      address: {
        fontSize: 16,
        color: colors.text,
        marginTop: 5,
      },
      rating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
      },
      ratingText: {
        fontSize: 16,
        color: colors.text,
        marginLeft: 5,
      },
      infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      },
      infoItem: {
        alignItems: 'center',
      },
      infoValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
      },
      infoLabel: {
        fontSize: 14,
        color: colors.text,
      },
      facilitiesContainer: {
        padding: 15,
      },
      detailsContainer: {
        padding: 15,
      },
      detailsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      detailItem: {
        width: '48%',
        backgroundColor: colors.card,
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      detailIcon: {
        marginRight: 10,
      },
      detailTextContainer: {
        flex: 1,
      },
      detailValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
      },
      detailLabel: {
        fontSize: 12,
        color: colors.text,
        opacity: 0.7,
      },
      facilitiesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 15,
      },
      facilitiesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        // justifyContent: 'flex-start', // Align items to start
  alignItems: 'space-evenly', // Prevent shrinking
      },
      facilityItem: {
        flexBasis: '22%', // Ensures each item takes 25% of the width
        // width: '20%',
        aspectRatio: 1,
        marginBottom: 5, // Adds spacing between rows
  marginRight: 5, 
        backgroundColor: colors.card,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        // padding:10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      facilityIcon: {
        // marginBottom: 5,
        paddingTop:10
      },
      facilityText: {
        fontSize: 12,
        color: colors.text,
        textAlign: 'center',
        paddingBottom:10
      },
      descriptionContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      },
      descriptionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 10,
      },
      descriptionText: {
        fontSize: 14,
        color: colors.text,
        lineHeight: 18,
      },
      seeMoreButton: {
        marginTop: 10,
        alignSelf: 'flex-start',
      },
      seeMoreText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
      },
      noFacilitiesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
      },
      noFacilitiesIcon: {
        marginRight: 10,
        marginLeft: 10,
        color: 'red',
      },
      noFacilitiesText: {
        fontSize: 16,
        color: '#666',
      },
      additionalDetailsContainer: {
        marginVertical: 20,
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
      },
      additionalDetailsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      additionalDetailItem: {
        flexDirection: 'row',
        marginBottom: 8,
      },
      additionalDetailLabel: {
        fontWeight: '600',
        marginRight: 10,
      },
      additionalDetailValue: {
        color: '#555',
      },
    });

    const truncateDescription = (text, lines) => {
      const words = text.split(' ');
      const truncated = words.slice(0, lines * 10).join(' '); // Assuming average of 10 words per line
      return truncated + (words.length > lines * 10 ? '...' : '');
    };

    // Format the updated date to show how long ago the property was updated
    const formatUpdatedDate = updatedDate => {
      const date = new Date(updatedDate);
      const today = new Date();
      const differenceInTime = today.getTime() - date.getTime();
      const differenceInDays = Math.floor(
        differenceInTime / (1000 * 3600 * 24),
      );

      if (differenceInDays === 0) {
        return 'Today';
      } else if (differenceInDays === 1) {
        return '1 day ago';
      } else {
        return `${differenceInDays} days ago`;
      }
    };

    return (
      <ScrollView style={styles.container}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            {showFullDescription
              ? listing.description
              : truncateDescription(listing.description, 3)}
          </Text>
          {listing.description.split(' ').length > 30 && (
            <TouchableOpacity
              style={styles.seeMoreButton}
              onPress={() => setShowFullDescription(!showFullDescription)}>
              <Text style={styles.seeMoreText}>
                {showFullDescription ? 'See Less' : 'See More'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.facilitiesTitle}>Property Details</Text>
          <View style={styles.detailsGrid}>
            {propertyDetails.map((detail, index) => (
              <View key={index} style={styles.detailItem}>
                <Icon
                  name={detail.icon}
                  size={24}
                  color={colors.primary}
                  style={styles.detailIcon}
                />
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailValue}>{detail.value}</Text>
                  <Text style={styles.detailLabel}>{detail.label}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.facilitiesContainer}>
          <Text style={styles.facilitiesTitle}>Facilities</Text>
          <View style={styles.facilitiesGrid}>
            {listing?.features.length > 0 ? (
              <View style={styles.facilitiesGrid}>
                {facilities
                  .filter(facility => listing?.features.includes(facility.key))
                  .map((facility, index) => (
                    <View key={index} style={styles.facilityItem}>
                      <Icon
                        name={facility.icon}
                        size={24}
                        color={colors.primary}
                        style={styles.facilityIcon}
                      />
                      <Text style={styles.facilityText}>{facility.name}</Text>
                    </View>
                  ))}
              </View>
            ) : (
              <View style={styles.noFacilitiesContainer}>
                <Icon
                  name="info-circle"
                  type="font-awesome"
                  size={24}
                  color="#666"
                  style={styles.noFacilitiesIcon}
                />
                <Text style={styles.noFacilitiesText}>
                  No facilities added by the agent.
                </Text>
              </View>
            )}
          </View>

          {/* New Additional Details Section */}
  <View style={styles.additionalDetailsContainer}>
    <Text style={styles.additionalDetailsTitle}>Additional Details</Text>
    
    <View style={styles.additionalDetailItem}>
      <Text style={styles.additionalDetailLabel}>Gated Society:</Text>
      <Text style={styles.additionalDetailValue}>
        {listing.isGatedSociety ? "Yes" : "No"}
      </Text>
    </View>
    
    <View style={styles.additionalDetailItem}>
      <Text style={styles.additionalDetailLabel}>Pet-Friendly:</Text>
      <Text style={styles.additionalDetailValue}>
        {listing.isPetFriendly ? "Yes" : "No"}
      </Text>
    </View>
    
    <View style={styles.additionalDetailItem}>
      <Text style={styles.additionalDetailLabel}>Preferred Tenant:</Text>
      <Text style={styles.additionalDetailValue}>
        {listing.preferredTenant || "Any"}
      </Text>
    </View>
    <View style={styles.additionalDetailItem}>
      <Text style={styles.additionalDetailLabel}>Furnished Type:</Text>
      <Text style={styles.additionalDetailValue}>
        {listing.furnishedType || "Any"}
      </Text>
    </View>
    <View style={styles.additionalDetailItem}>
      <Text style={styles.additionalDetailLabel}>Category:</Text>
      <Text style={styles.additionalDetailValue}>
        {listing.category || "Any"}
      </Text>
    </View>
    
    <View style={styles.additionalDetailItem}>
      <Text style={styles.additionalDetailLabel}>Available Date:</Text>
      <Text style={styles.additionalDetailValue}>
        {new Date(listing.availableDate).toLocaleDateString() || "Not specified"}
      </Text>
    </View>
    
    <View style={styles.additionalDetailItem}>
      <Text style={styles.additionalDetailLabel}>Added:</Text>
      <Text style={styles.additionalDetailValue}>
        {formatUpdatedDate(listing.updatedDate)}
      </Text>
    </View>
  </View>
          <Address
            address={listing?.location || 'Lorem Ipsum is simply dummy text'}
            latitude={listing?.latitude} // Default to New York City coordinates
            longitude={listing.longitude }
          />
        </View>
      </ScrollView>
    );
  };
console.log(listing?.latitude,"5")
console.log(listing?.address,"5")
  const GalleryTab = ({route}) => {
    const {listing} = route.params;
    return (
      <ScrollView contentContainerStyle={styles.galleryContainer}>
        <View style={styles.galleryRow}>
          {listing?.images.map((item, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{uri: item}} style={styles.galleryImage} />
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.imagetop}>
          <Image source={{uri: listing.image}} style={styles.image} />
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>{listing.title}</Text>
          <Text style={styles.address}>{listing.location}</Text>
          <View style={styles.rating}>
            <Icon name="star" size={20} color="#FFD700" />
            <Text style={styles.ratingText}>{listing.rating} (N/A review)</Text>
          </View>
        </View>

        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {backgroundColor: colors.background},
            tabBarLabelStyle: {color: colors.text, fontSize: 12},
            tabBarIndicatorStyle: {backgroundColor: colors.primary},
          }}>
          <Tab.Screen name="Description">
            {() => <DescriptionTab listing={listing} />}
          </Tab.Screen>
          <Tab.Screen
            name="Gallery"
            component={GalleryTab}
            initialParams={{listing}}
          />
          <Tab.Screen
            name="Review"
            component={ReviewTab}
            initialParams={{listing}}
          />
        </Tab.Navigator>
      </ScrollView>
      {userRole == 'user' && (
        <TouchableOpacity style={styles.contactButton} onPress={toggleModal}>
          <Text style={styles.contactButtonText}>Contact</Text>
        </TouchableOpacity>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.modalOverlay}>
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}>
            <Animated.View
              style={[styles.modalContainer, {transform: [{translateY}]}]}>
              <View style={styles.topHeader}>
                <Text style={styles.agentTitle}>Agent Details</Text>
              </View>
              <Image
                style={styles.agentImage}
                source={{
                  uri:
                    agentData?.imageUrl ||
                    'http://95.216.209.46:5500/uploads/properties_1722843949432-image_1.jpeg',
                }}
              />
              <Text style={styles.agentName}>{agentData.name}</Text>
              <Text style={styles.agentAddress}>{agentData.address}</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleCallNow}>
                  <Text style={styles.modalButtonText}>Call Now</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleRequestCall}>
                  <Text style={styles.modalButtonText}>Request Call</Text>
                </TouchableOpacity>
              </View>
              {/* Simple Close Button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleModal}>
                <Icon name="close" size={24} color="white" />
              </TouchableOpacity>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imagetop: {
    height: 200,
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%', // Use '100%' to fill the parent container
    resizeMode: 'cover',
    borderRadius: 10,
  },

  header: {
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  address: {
    fontSize: 16,
    color: 'gray',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 16,
    color: 'gray',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoLabel: {
    fontSize: 14,
    color: 'gray',
  },
  //   galleryContainer: {
  //     flex: 1,
  //     padding: 16,
  //   },
  //   galleryImage: {
  //     width: '100%',
  //     height: 200,
  //     borderRadius: 10,
  //     marginBottom: 16,
  //   },
  reviewContainer: {
    flex: 1,
    padding: 16,
  },
  reviewItem: {
    marginBottom: 16,
  },
  reviewText: {
    fontSize: 16,
  },
  reviewAuthor: {
    fontSize: 14,
    color: 'gray',
    marginTop: 8,
  },
  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // padding: 10,
  },
  galleryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    width: '44%', // 48% to provide some space between columns
    margin: 10,
  },
  galleryImage: {
    width: '100%',
    height: 150,
  },
  contactButton: {
    backgroundColor: '#4285F4', // Adjust color as needed
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  contactButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalOverlay2: {
    // flexGrow: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20, // Circular button
    // backgroundColor: '#FF0000', // Red background for close buttons
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 5, // Add shadow for better visibility
  },
  topHeader: {
    backgroundColor: '#4285F4',
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
  },
  agentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  agentImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 20,
    borderWidth: 3,
    borderColor: '#4285F4',
  },
  agentName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  agentAddress: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
  },
  agentPhone: {
    fontSize: 18,
    marginBottom: 20,
    color: '#4285F4',
    fontWeight: '500',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    elevation: 2,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ApartmentScreen;
