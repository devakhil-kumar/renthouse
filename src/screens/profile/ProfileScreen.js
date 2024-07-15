import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Avatar, Card, Title, Paragraph, List, IconButton, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
const { width } = Dimensions.get('window');
import { useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice';
const ProfileScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
    console.log('Logout pressed');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Image size={100} style={styles.avatar} />
        <IconButton
          icon="pencil"
          color="#4a90e2"
          size={20}
          style={styles.editButton}
          onPress={() => console.log('Edit avatar')}
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
            <Paragraph style={styles.statsText}>Rented-out Properties</Paragraph>
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
          onPress={() => navigation.navigate('Profile', { screen: 'RenterProfile' })}
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
        <Icon name="log-out-outline" size={24} color="#fff" style={styles.logoutIcon} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
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
    color:'grey'
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
});

export default ProfileScreen;