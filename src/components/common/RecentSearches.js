import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, typography } from '../../styles';

const recentSearches = [
  { id: '1', location: 'Balga, WA 6061', type: 'Buy', propertyType: 'House', beds: '2+', baths: '1+', parking: '1+' },
  { id: '2', location: 'Balga, WA 6061', type: 'Buy', propertyType: 'House', beds: '2+', baths: '1+', parking: '1+' },
];

const RecentSearchItem = ({ item }) => (
  <TouchableOpacity style={styles.item}>
    <Icon name="search" size={20} color={colors.textLight} />
    <View style={styles.itemContent}>
      <Text style={styles.location}>{item.location}</Text>
      <Text style={styles.details}>
        {`${item.type} · ${item.propertyType} · ${item.beds} · ${item.baths} · ${item.parking}`}
      </Text>
    </View>
    <TouchableOpacity>
      <Icon name="star-border" size={20} color={colors.textLight} />
    </TouchableOpacity>
  </TouchableOpacity>
);

const RecentSearches = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Recent Searches</Text>
    <FlatList
      data={recentSearches}
      renderItem={({ item }) => <RecentSearchItem item={item} />}
      keyExtractor={item => item.id}
    />
    <TouchableOpacity>
      <Text style={styles.seeAll}>See all</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  title: {
    ...typography.sectionTitle,
    marginBottom: 10,
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
  },
  details: {
    ...typography.caption,
    color: colors.textLight,
  },
  seeAll: {
    ...typography.link,
    marginTop: 10,
  },
});

export default RecentSearches;