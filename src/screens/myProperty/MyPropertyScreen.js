import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/common/Header';
import RecentListings from '../../components/common/RecentListings';
import RecentReviews from '../../components/common/RecentReviews';
import CategoryTabs from '../../components/common/CategoryTabs';
import {lightTheme, darkTheme} from '../../components/common/theme';
import {useNavigation} from '@react-navigation/native';

const MyPropertyScreen = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [activeTab, setActiveTab] = useState('Listing');

  const handleAddPropertyPress = () => {
    navigation.navigate('AddPropertyScreen');
  };

  const handleTabPress = tabName => {
    setActiveTab(tabName);
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <CategoryTabs activeTab={activeTab} onTabPress={handleTabPress} />
      <ScrollView>
        {activeTab === 'Listing' ? <RecentListings /> : <RecentReviews />}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddPropertyPress}>
        {/* <Text style={styles.addButtonText}>LIST PROPERTY</Text> */}
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MyPropertyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    // backgroundColor: 'rgba(74, 144, 226, 0.8)', // Updated to make the button semi-transparent
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 8, height: 8},
    shadowOpacity: 0.9,
    shadowRadius: 2,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
