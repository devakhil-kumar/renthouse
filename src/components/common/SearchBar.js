// SearchBar.js
import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { lightTheme, darkTheme } from './theme';

const SearchBar = ({ onPress }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.searchContainer, { backgroundColor: theme.colors.secondary }]}
        onPress={onPress}
      >
        <Icon name="search" size={24} color={theme.colors.text} style={styles.searchIcon} />
        <TextInput
          style={[styles.input, { color: theme.colors.text }]}
          placeholder="Search by Address, City, or ZIP"
          placeholderTextColor={theme.colors.text}
          editable={false}
        />
        {/* <TouchableOpacity>
          <Icon name="close" size={24} color={theme.colors.text} />
        </TouchableOpacity> */}
      </TouchableOpacity>
      {/* <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.colors.primary }]}>
        <Icon name="tune" size={24} color={theme.colors.background} />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    padding: 10,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  filterButton: {
    padding: 10,
    borderRadius: 25,
  },
});

export default SearchBar;