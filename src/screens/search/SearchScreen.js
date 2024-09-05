import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, Modal ,Image} from 'react-native';
import React,{useState,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/common/Header'
import SearchBar from '../../components/common/SearchBar'
import RecentSearches from '../../components/common/RecentSearches'
import RecentlyViewed from '../../components/common/RecentlyViewed'
import SuggestedProperties from '../../components/common/SuggestedProperties'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons' 
import { useDispatch, useSelector } from 'react-redux';
import { getAgentNotifications, markNotificationAsRead, getUnreadNotificationCount } from '../../features/notificationSlice';
import { getAgentPropertiesCount } from '../../features/propertySlice';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SearchScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector((state) => state.notifications);
  const { agentPropertiesCount, loading: propertiesLoading } = useSelector((state) => state.properties);
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
// console.log(user,"user19")
// console.log({ notifications, unreadCount },"user19")
// console.log(user,"user19")
useEffect(() => {
  const fetchUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  fetchUser();
}, []);

useEffect(() => {
  if (user && user._id) {
    const agentId = user._id
    dispatch(getAgentNotifications({ agentId}));
    dispatch(getUnreadNotificationCount( agentId ));
    dispatch(getAgentPropertiesCount(agentId));
  }
}, [dispatch, user]);
 // Dummy data (replace with actual data from your backend)

 const reviews = [] // Empty array for no reviews scenario
 const agentFeatures = [
  { icon: 'home-search', text: 'Property Search Assistance' },
  { icon: 'cash', text: 'Price Negotiation' },
  { icon: 'file-document', text: 'Paperwork Handling' },
  { icon: 'handshake', text: 'Client Support' },
]
  const handleSearchPress = () => {
    navigation.navigate('Searchproperties');
  };

  // const handleNotificationPress = (notificationId) => {
  //   dispatch(markNotificationAsRead(notificationId));
  // };

  // const handleCall = (phoneNumber) => {
  //   Linking.openURL(`tel:${phoneNumber}`);
  // };
  const handleNotificationPress = (notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  const handleCall = () => {
    if (selectedNotification && selectedNotification.userId.phone) {
      Linking.openURL(`tel:${selectedNotification.userId.phone}`);
      handleCloseModal();
    }
  };

  const handleDeny = () => {
    handleCloseModal();
  };

  const handleCloseModal = () => {
    if (selectedNotification) {
      console.log('Selected notification:', selectedNotification);
      dispatch(markNotificationAsRead(selectedNotification._id))
       
    }
    setModalVisible(false);
    setSelectedNotification(null);
  };

  // const unreadNotifications = notifications.filter(notification => notification.status === 'unread');
  // console.log(unreadNotifications,"unread")
  // console.log(notifications,"unread")
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.totalPropertiesBox}>
        <Text style={styles.totalPropertiesText}>Total Properties Added</Text>
        {propertiesLoading ? (
          <Text style={styles.totalPropertiesNumber}>Loading...</Text>
        ) : (
          <Text style={styles.totalPropertiesNumber}>{agentPropertiesCount}</Text>
        )}
      </View>
      {unreadCount > 0 && (
        <View style={styles.newNotificationsBox}>
          <Text style={styles.newNotificationsText}>
            You have {unreadCount} new Leads{unreadCount !== 1 ? 's' : ''}
          </Text>
        </View>
      )}

      <View style={styles.notificationsSection}>
        <Text style={styles.sectionTitle}>Leads</Text>
        <ScrollView >
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <TouchableOpacity
              key={notification._id}
              style={[
                styles.notificationItem,
                { backgroundColor: notification.status === 'unread' ? '#e8f4fd' : '#ffffff' }
              ]}
              onPress={() => handleNotificationPress(notification)}
            >
              <View style={styles.notificationContent}>
                <View style={styles.notificationConten}>
                <Image
                  source={{ uri: notification.userId.imageurl || DEFAULT_IMAGE_URL }}
                  style={styles.userImage}
                />
                </View>
                <View style={styles.textContent}>
                  <Text style={styles.userName}>{notification.userId.name || 'User Name'}</Text>
                  <Text style={styles.propertyDetails}>
                    {notification.propertyId ? (
                      `${notification.propertyId.title} - ${notification.propertyId?.location?.address}`
                    ) : (
                      "Property details not available"
                    )}
                  </Text>
                  <Text style={styles.notificationTime}>
                    {format(new Date(notification.createdAt), 'MMM d, yyyy HH:mm')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noNotifications}>
            <Text style={styles.noNotificationsText}>
              Currently, no one has shown interest in your property. 
              When someone shows interest, we will notify you here.
            </Text>
          </View>
        )}
          </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notification Options</Text>
            <Text style={styles.modalMessage}>
              Would you like to call {selectedNotification?.userId?.name} or deny the notification?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalButton} onPress={handleCall}>
                <Text style={styles.modalButtonText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleDeny}>
                <Text style={styles.modalButtonText}>Deny</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Current Features</Text>
        <View style={styles.featuresGrid}>
          {agentFeatures.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Icon name={feature.icon} size={30} color="#3498db" />
              <Text style={styles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.reviewsSection}>
        <Text style={styles.reviewsTitle}>Reviews</Text>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <Text key={index}>{review}</Text>
          ))
        ) : (
          <View style={styles.noReviewsBox}>
            <Text style={styles.noReviewsText}>You have no reviews yet</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
 

export default SearchScreen

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  totalPropertiesBox: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 40,
    margin: 10,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  totalPropertiesText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalPropertiesNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 10,
  },
  featuresSection: {
    marginBottom: 20,
    margin:10
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    backgroundColor: '#ffffff',
    width: '48%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  featureText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    color: '#34495e',
  },
  reviewsSection: {
    margin: 10,
  },
  reviewsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  noReviewsBox: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  noReviewsText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#7f8c8d',
  },
  newNotificationsBox: {
    backgroundColor: '#3498db',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  newNotificationsText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  notificationsSection: {
    margin: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  notificationContent: {
    flexDirection: 'row', // Horizontal arrangement of image and text content
    alignItems: 'center',
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  propertyDetails: {
    fontSize: 14,
    color: '#34495e',
    marginTop: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
  callButton: {
    padding: 10,
  },
  notificationsSection: {
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  // notificationContent: {
  //   flex: 1,
  // },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  propertyDetails: {
    fontSize: 14,
    color: '#666666',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999999',
  },
  callButton: {
    padding: 8,
  },
  noNotifications: {
    alignItems: 'center',
    padding: 20,
  },
  noNotificationsText: {
    marginTop: 10,
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
  },
  modalButton: {
    backgroundColor: '#3498db',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#e0e0e0', // Light grey background color for placeholders
  },
 
    textContent: {
      flex: 1, // Takes up remaining space
      flexDirection: 'column',
    },
  
  
})