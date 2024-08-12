import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, typography } from '../../styles';

const recentSearches = [
  // { id: '1', location: 'Balga, WA 6061', type: 'Buy', propertyType: 'House', beds: '2+', baths: '1+', parking: '1+' },
  // { id: '2', location: 'Balga, WA 6061', type: 'Buy', propertyType: 'House', beds: '2+', baths: '1+', parking: '1+' },
  // { id: '3', location: 'Balga, WA 6061', type: 'Buy', propertyType: 'House', beds: '2+', baths: '1+', parking: '1+' },
  // { id: '4', location: 'Balga, WA 6061', type: 'Buy', propertyType: 'House', beds: '2+', baths: '1+', parking: '1+' },
  // { id: '5', location: 'Balga, WA 6061', type: 'Buy', propertyType: 'House', beds: '2+', baths: '1+', parking: '1+' },
  // { id: '6', location: 'Balga, WA 6061', type: 'Buy', propertyType: 'House', beds: '2+', baths: '1+', parking: '1+' },
];

const RecentSearchItem = ({ item }) => (
  <View style={styles.item}>
    <Icon name="search" size={24} color={colors.textLight} />
    <View style={styles.itemContent}>
      <Text style={styles.location}>{item.location}</Text>
      <Text style={styles.details}>{`${item.type} · ${item.propertyType} · ${item.beds} · ${item.baths} · ${item.parking}`}</Text>
    </View>
  </View>
);

const RecentSearches = () => {
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const displayedSearches = showAll ? recentSearches : recentSearches.slice(0, 2);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Searches</Text>
      {recentSearches.length > 0 ? (
        <>
          <FlatList
            data={displayedSearches}
            renderItem={({ item }) => <RecentSearchItem item={item} />}
            keyExtractor={item => item.id}
          />
          {recentSearches.length > 2 && (
            <TouchableOpacity onPress={handleShowAll}>
              <Text style={styles.seeAll}>{showAll ? 'Show less' : 'See all'}</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <View style={styles.noSearchesContainer}>
          <Icon name="search-off" size={48} color={colors.textLight} />
          <Text style={styles.noSearchesText}>You have not searched yet </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  title: {
    ...typography.sectionTitle,
    marginBottom: 10,
    color:"black"
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemContent: {
    flex: 1,
    marginLeft: 10,
   
  },
  location: {
    ...typography.body,
    fontWeight: 'bold',
    color:"black"
  },
  details: {
    ...typography.caption,
    color: colors.textLight,
  },
  seeAll: {
    ...typography.link,
    marginTop: 10,
  },
  noSearchesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  noSearchesText: {
    ...typography.body,
    color: colors.textLight,
    marginTop: 10,
  },
});

export default RecentSearches;
