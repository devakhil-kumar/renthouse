// components/common/CategoryTabs.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './theme';

const CategoryTabs = ({ activeTab, onTabPress }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const categories = ['Listing', 'Reviews'];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.tab,
            { backgroundColor: activeTab === category ? theme.colors.primary : theme.colors.card }
          ]}
          onPress={() => onTabPress(category)}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === category ? theme.colors.background : theme.colors.text }
            ]}
          >
            {category}
          </Text>
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
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CategoryTabs;