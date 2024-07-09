// Header.js
import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './theme';

const Header = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      {/* <Text style={[styles.title, { color: theme.colors.background }]}>
        Check your Collection here
      </Text> */}
      <Text style={[styles.subtitle, { color: theme.colors.background }]}>
        Write Lorem Ipsum text here dummy text
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
  },
});

export default Header;