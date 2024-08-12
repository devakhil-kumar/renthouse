import React,{useState,useEffect} from 'react';
import { ScrollView, View, Text, Image, StyleSheet, useWindowDimensions,FlatList, TouchableOpacity, Modal ,TouchableWithoutFeedback, Linking, Platform, Animated   } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Address from '../../components/common/Address';
import ReviewTab from './ReviewTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const Tab = createMaterialTopTabNavigator();

const ApartmentScreen = ({ route }) => {
  const { listing } = route.params;
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
 
;


  const [modalVisible, setModalVisible] = useState(false);
  const [userRole, setUserRole] = useState(null);
console.log(userRole==="user")
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const translateY = new Animated.Value(0)
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = ({ nativeEvent }) => {
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
        console.log('Stored user data:', user); // Log the user data
        if (user) {
          const parsedUser = JSON.parse(user);
          console.log('Parsed user data:', parsedUser); // Log the parsed user data
          setUserRole(parsedUser.role);
         
        }
      } catch (error) {
        console.error('Failed to fetch user ID from AsyncStorage:', error);
      }
    };
    getUserRole();
  }, []);

  const  agentData= {
    name: "Sarah Johnson",
    address: "456 Oak Avenue, Sunnyville, CA 90210",
    phone: "+1 (555) 123-4567",
    imageUrl: "http://95.216.209.46:5500/uploads/properties_1722843949432-image_1.jpeg"
  };
  const handleCallNow = () => {
    let phoneNumber = +917560029425;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phoneNumber}`;
    } else {
      phoneNumber = `tel:${phoneNumber}`;
    }
    console.log( Linking.canOpenURL(phoneNumber),"ll")
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        console.log(supported,"gg")
        if (!supported) {
          alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const handleRequestCall = () => {
    // Implement request call functionality here
    alert('Call request sent to the agent');
  };
const DescriptionTab = ({ listing }) => {
  const { colors } = useTheme();
  const propertyDetails = [
    { icon: 'resize', value: listing.area, label: 'sqft' },
    { icon: 'bed-empty', value: listing.bedrooms || 'N/A', label: 'Bedrooms' },
    { icon: 'shower', value: listing.baths || 'N/A', label: 'Bathrooms' },
    { icon: 'shield-check', value: listing.squareFeet || 'N/A', label: 'Safety Rank' },
  ];
  const facilities = [
    { name: 'Car Parking', icon: 'car' },
    { name: 'Swimming...', icon: 'swim' },
    { name: 'Gym & Fit', icon: 'dumbbell' },
    { name: 'Restaurant', icon: 'food-fork-drink' },
    { name: 'Wi-fi', icon: 'wifi' },
    { name: 'Pet Center', icon: 'paw' },
    { name: 'Sports Cl.', icon: 'basketball' },
    { name: 'Laundry', icon: 'washing-machine' },
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
    },detailsContainer: {
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
        shadowOffset: { width: 0, height: 2 },
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
      justifyContent: 'space-between',
    },
    facilityItem: {
      width: '23%',
      aspectRatio: 1,
      backgroundColor: colors.card,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    facilityIcon: {
      marginBottom: 5,
    },
    facilityText: {
      fontSize: 12,
      color: colors.text,
      textAlign: 'center',
    },
  
  });

  return (
    <ScrollView style={styles.container}>
    
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
          {facilities.map((facility, index) => (
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
        <Address 
        address={listing.address || "Lorem Ipsum is simply dummy text"}
        latitude={listing.latitude || 40.7128} // Default to New York City coordinates
        longitude={listing.longitude || -74.0060}
      />
      </View>
    </ScrollView>
  );
};


const GalleryTab = ({ route }) => {
    const { listing } = route.params;
    return (
        <ScrollView contentContainerStyle={styles.galleryContainer}>
        <View style={styles.galleryRow}>
          {listing?.images.map((item, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: item }} style={styles.galleryImage} />
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
      <Image source={{ uri: listing.image}} style={styles.image} />
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
        tabBarStyle: { backgroundColor: colors.background },
        tabBarLabelStyle: { color: colors.text },
        tabBarIndicatorStyle: { backgroundColor: colors.primary },
      }}
    >
      <Tab.Screen name="Description">
        {() => <DescriptionTab listing={listing} />}
      </Tab.Screen>
      <Tab.Screen
        name="Gallery"
        component={GalleryTab}
        initialParams={{ listing }}
      />
      <Tab.Screen
  name="Review"
  component={ReviewTab}
  initialParams={{ listing }}
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
      onRequestClose={toggleModal}
    >
      <View style={styles.modalOverlay}>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View style={[styles.modalContainer, { transform: [{ translateY }] }]}>
         
            <View style={styles.topHeader}>
              <Text style={styles.agentTitle}>Agent Details</Text>
            </View>
            <Image
              style={styles.agentImage}
              source={{ uri: agentData?.imageUrl || "http://95.216.209.46:5500/uploads/properties_1722843949432-image_1.jpeg" }}
            />
            <Text style={styles.agentName}>{agentData.name}</Text>
            <Text style={styles.agentAddress}>{agentData.address}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleCallNow}>
                <Text style={styles.modalButtonText}>Call Now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleRequestCall}>
                <Text style={styles.modalButtonText}>Request Call</Text>
              </TouchableOpacity>
            </View>
            {/* Simple Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
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
    backgroundColor:"#FFFFFF",
    padding:10,
    borderRadius: 10,
     
    },
  image: {
   
    width: '100%',
    height: "100%", // Use '100%' to fill the parent container
    resizeMode: 'cover',
    borderRadius: 10,
  },
  
  header: {
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:"black"
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
    backgroundColor: "#4285F4", // Adjust color as needed
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
  modalOverlay2:{
    // flexGrow: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
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
    backgroundColor: "#4285F4",
    width: '100%',
    alignItems: "center",
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
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ApartmentScreen;
