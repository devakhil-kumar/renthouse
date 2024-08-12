// PropertyGrid.js
import React from 'react';
import { FlatList, StyleSheet, useColorScheme } from 'react-native';
import PropertyCard2 from './PropertyCard2';
import { lightTheme, darkTheme } from './theme';

const PropertyGrid = ({ properties }) => {
  console.log(properties)
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <FlatList
      data={properties}
      renderItem={({ item }) => <PropertyCard2 {...item} />}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
});

export default PropertyGrid;