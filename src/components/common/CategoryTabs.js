// components/common/CategoryTabs.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './theme';

const CategoryTabs = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const categories = ['Listing', 'Rent', 'Sold', 'Reviews'];

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[styles.tab, { backgroundColor: theme.colors.card }]}
        >
          <Text style={[styles.tabText, { color: theme.colors.text }]}>{category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'white', // Add this to ensure visibility when sticky
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  tabText: {
    fontSize: 14,
  },
});

export default CategoryTabs;