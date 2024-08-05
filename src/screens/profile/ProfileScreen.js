import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  List,
  IconButton,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const {width} = Dimensions.get('window');
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {logout, updateUser} from '../../features/authSlice';


const ProfileScreen = () => {


  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [avatarUri, setAvatarUri] = useState(null);
  const [ID, setId] = useState(null);
  // useEffect(() => {
  //   const updateUserInStorage = async () => {
  //     try {
  //       const user = await AsyncStorage.getItem('user');
  //       if (user) {
  //         const parsedUser = JSON.parse(user);
  //         // const updatedUser = { ...parsedUser, imageurl: avatarUri };
  //         await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
  //       }
  //     } catch (error) {
  //       console.error('Failed to update user in AsyncStorage:', error);
  //     }
  //   };
  //   if (avatarUri) {
  //     updateUserInStorage();
  //   }
  // }, [avatarUri]);
  useEffect(() => {
    const getUserId = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        console.log('Stored user data:', user); // Log the user data
        if (user) {
          const parsedUser = JSON.parse(user);
          console.log('Parsed user data:', parsedUser); // Log the parsed user data
          setId(parsedUser._id);
          setAvatarUri(parsedUser?.imageurl)
        }
      } catch (error) {
        console.error('Failed to fetch user ID from AsyncStorage:', error);
      }
    };
    getUserId();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    console.log('Logout pressed');
  };


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const pickImage = async(useCamera) => {
    
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
    };
    if (!ID) {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        setId(parsedUser._id);
      } else {
        console.error('User ID is not available');
        return;
      }
    }

    if (useCamera) {
      launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled camera picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          const imageurl = `data:${asset.type || 'image/jpeg'};base64,${
            asset.base64
          }`;

          setAvatarUri(imageurl);

          // Dispatch an action to update the user profile with the new avatar URI and user ID
          const userData = { imageurl};
          dispatch(updateUser({ ID, userData }));

          // console.log('New avatar URI:', imageurl);
        }
        toggleModal();
      });
    } else {
      launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          const imageurl = `data:${asset.type || 'image/jpeg'};base64,${
            asset.base64
          }`;

          setAvatarUri(imageurl);

          // Dispatch an action to update the user profile with the new avatar URI and user ID
          const userData = { imageurl};
          dispatch(updateUser({ ID, userData }));

          // console.log('New avatar URI:', newImage);
        }
        toggleModal();
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={100}
          style={styles.avatar}
          source={
            avatarUri ? {uri: avatarUri} : require('../../../assets/user.png')
          }
        />
        <IconButton
          icon="pencil"
          color="#4a90e2"
          size={20}
          style={styles.editButton}
          onPress={toggleModal}
        />
      </View>

      <View style={styles.statsContainer}>
        <Card style={styles.statsCard}>
          <Card.Content>
            <Title style={styles.statsNumber}>1</Title>
            <Paragraph style={styles.statsText}>Added Properties</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.statsCard}>
          <Card.Content>
            <Title style={styles.statsNumber}>1</Title>
            <Paragraph style={styles.statsText}>
              Rented-out Properties
            </Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.statsCard}>
          <Card.Content>
            <Title style={styles.statsNumber}>0</Title>
            <Paragraph style={styles.statsText}>Tot. Calls Recieved</Paragraph>
          </Card.Content>
        </Card>
      </View>

      <Card style={styles.menuCard}>
        <List.Item
          title="Renter Profile"
          description="Create or update your renter profile"
          left={props => <List.Icon {...props} icon="account" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() =>
            navigation.navigate('Profile', {screen: 'RenterProfile'})
          }
        />
        <List.Item
          title="My Finances"
          description="Update your data and view your home loans approvals"
          left={props => <List.Icon {...props} icon="cash" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
        <List.Item
          title="Guides"
          description="View our comprehensive guides and take control of your property journey"
          left={props => <List.Icon {...props} icon="book-open-variant" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
        <List.Item
          title="Explore Suburbs"
          description="Explore suburbs insights & characteristics to find your ideal area"
          left={props => <List.Icon {...props} icon="map-search" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
        <List.Item
          title="Rental Application"
          description="Check the status and view your rental applications"
          left={props => <List.Icon {...props} icon="file-document" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
        <List.Item
          title="My Rental listings"
          description="Create and manage your rental property listings"
          left={props => <List.Icon {...props} icon="home" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
      </Card>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon
          name="log-out-outline"
          size={24}
          color="#fff"
          style={styles.logoutIcon}
        />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => pickImage(true)}>
            <Icon name="camera-outline" size={24} color="#4a90e2" />
            <Text style={styles.modalButtonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => pickImage(false)}>
            <Icon name="image-outline" size={24} color="#4a90e2" />
            <Text style={styles.modalButtonText}>Choose from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={toggleModal}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  avatar: {
    borderWidth: 3,
    borderColor: 'white',
  },
  editButton: {
    position: 'absolute',
    right: width * 0.35,
    bottom: 0,
    backgroundColor: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  statsCard: {
    width: width * 0.28,
    elevation: 4,
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statsText: {
    fontSize: 12,
    textAlign: 'center',
    color: 'grey',
  },
  menuCard: {
    margin: 10,
    elevation: 4,
  },
  logoutButton: {
    backgroundColor: '#4a90e2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    margin: 10,
    borderRadius: 5,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
  },
  modalButtonText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#4a90e2',
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 18,
    color: 'red',
  },
});

export default ProfileScreen;
