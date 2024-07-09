import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, StatusBar, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const notificationData = [
  {
    id: '1',
    title: 'Tour Booked Successfully',
    description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard.',
    icon: 'calendar-check',
    time: '1hr',
    date: 'Today'
  },
  {
    id: '2',
    title: 'Exclusive Offers Inside',
    description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard.',
    icon: 'tag',
    time: '1hr',
    date: 'Today'
  },
  {
    id: '3',
    title: 'Property Review Request',
    description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard.',
    icon: 'star',
    time: '1hr',
    date: 'Today'
  },
  {
    id: '4',
    title: 'Tour Booked Successfully',
    description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard.',
    icon: 'calendar-check',
    time: '1hr',
    date: 'Yesterday'
  },
  {
    id: '5',
    title: 'Exclusive Offers Inside',
    description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard.',
    icon: 'tag',
    time: '1hr',
    date: 'Yesterday'
  },
  {
    id: '6',
    title: 'Property Review Request',
    description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard.',
    icon: 'star',
    time: '1hr',
    date: 'Yesterday'
  },
];

const NotificationItem = ({ item }) => (
  <View style={styles.notificationItem}>
    <Icon name={item.icon} size={24} color="#4A90E2" style={styles.icon} />
    <View style={styles.notificationContent}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationDescription}>{item.description}</Text>
    </View>
    <Text style={styles.notificationTime}>{item.time}</Text>
  </View>
);

const NotificationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <Text style={styles.headerSubtitle}>Check the notifications</Text>
      </View> */}
      <FlatList
        data={notificationData}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <Text style={styles.dateHeader}>{notificationData[0].date}</Text>
        )}
        stickyHeaderIndices={[0]}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#4A90E2',
    padding: 20,
    // paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    // opacity: 0.8,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: 'white',
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
});

export default NotificationScreen;