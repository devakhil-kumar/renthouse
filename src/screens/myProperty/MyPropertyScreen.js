import {  View, ScrollView, StyleSheet, useColorScheme, SafeAreaView , TouchableOpacity, Text } from 'react-native'
import React from 'react'
import Header from '../../components/common/Header'
import RecentListings from '../../components/common/RecentListings'
import RecentReviews from '../../components/common/RecentReviews'
import CategoryTabs from '../../components/common/CategoryTabs'
import { lightTheme, darkTheme } from '../../components/common/theme';
import { useNavigation } from '@react-navigation/native';
const MyPropertyScreen = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const handleAddPropertyPress = () => {
    navigation.navigate('AddPropertyScreen'); // replace 'AddPropertyScreen' with your actual screen name
  };
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        {/* <Header/> */}
        <CategoryTabs />
        <RecentReviews />
        <RecentListings />
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddPropertyPress}>
        <Text style={styles.addButtonText}>LIST PROPERTY</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default MyPropertyScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 130,
    height: 50,
   
    borderRadius: 25,
    backgroundColor: '#4A90E2', // Change this color to match your theme
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Add shadow for iOS
    shadowOpacity: 0.8, // Add shadow for iOS
    shadowRadius: 2, // Add shadow for iOS
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
