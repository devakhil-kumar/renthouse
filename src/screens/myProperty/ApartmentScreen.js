import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, useWindowDimensions,FlatList, } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Address from '../../components/common/Address';
import ReviewTab from './ReviewTab';

const Tab = createMaterialTopTabNavigator();

const ApartmentScreen = ({ route }) => {
  const { listing } = route.params;
  const { colors } = useTheme();
  const { width } = useWindowDimensions();


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

//   const GalleryTab = ({ route }) => {
//     const { listing } = route.params;
//     console.log(listing.images)
//     const renderItem = ({ item }) => (
//         <View style={styles.imageContainer}>
//           <Image source={item.images} style={styles.galleryImage} />
//         </View>
//       );
   
//   return (
//     <FlatList
//       data={listing}
//       renderItem={renderItem}
//       keyExtractor={(item, index) => index.toString()}
//       numColumns={2}
//       contentContainerStyle={styles.galleryContainer}
//     />
//   );
//   };
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

//   const ReviewTab = ({ route }) => {
//     const { listing } = route.params;
//     console.log(listing)
//     return (
//       <ScrollView style={styles.reviewContainer}>
       
//        {listing.reviews.map((review, index) => (
//           <View key={index} style={styles.reviewItem}>
//             <Text style={styles.reviewText}>{review.text}</Text>
//             <Text style={styles.reviewAuthor}>{review.author}</Text>
//           </View>
//         ))}
  
//       </ScrollView>
//     );
//   };

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
          <Text style={styles.ratingText}>{listing.rating} (6.8k review)</Text>
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
});

export default ApartmentScreen;
