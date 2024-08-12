import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/common/Header'
import SearchBar from '../../components/common/SearchBar'
import RecentSearches from '../../components/common/RecentSearches'
import RecentlyViewed from '../../components/common/RecentlyViewed'
import SuggestedProperties from '../../components/common/SuggestedProperties'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons' 

const SearchScreen = () => {
  const navigation = useNavigation();
 // Dummy data (replace with actual data from your backend)
 const totalProperties = 15
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
  return (
    <>
       <ScrollView contentContainerStyle={styles.scrollContent}>
       <View style={styles.totalPropertiesBox}>
        <Text style={styles.totalPropertiesText}>
          Total Properties Added
        </Text>
        <Text style={styles.totalPropertiesNumber}>{totalProperties}</Text>
      </View>

      {/* Your existing components can go here */}
      {/* <Header/> */}
      {/* <SearchBar onPress={handleSearchPress} /> */}
      {/* <RecentSearches/> */}
      {/* <RecentlyViewed/> */}
      {/* <SuggestedProperties /> */}

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
            <Text key={index}>{review}</Text> // Replace with your review component
          ))
        ) : (
          <View style={styles.noReviewsBox}>
            <Text style={styles.noReviewsText}>You have no reviews yet</Text>
          </View>
        )}
      </View>
    </ScrollView>
     
    </>
  )
}

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
})