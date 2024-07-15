import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/common/Header'
import SearchBar from '../../components/common/SearchBar'
import RecentSearches from '../../components/common/RecentSearches'
import RecentlyViewed from '../../components/common/RecentlyViewed'
import SuggestedProperties from '../../components/common/SuggestedProperties'

const SearchScreen = () => {
  const navigation = useNavigation();

  const handleSearchPress = () => {
    navigation.navigate('Searchproperties');
  };
  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* <Header/> */}
        <SearchBar onPress={handleSearchPress} />
        <RecentSearches/>
        <RecentlyViewed/>
        
        <SuggestedProperties />
      </ScrollView>
     
    </>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})