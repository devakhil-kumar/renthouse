// components/CustomInput.js
import React, { forwardRef } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

const CustomInput = ({ label, value, onChangeText, error,onLayout, ...props }) => {
  const { colors } = useTheme();

  return (
    <View onLayout={onLayout} style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {
            color: colors.text,
            backgroundColor: colors.background,
            borderColor: error ? 'red' : 'grey',
          }
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.secondary}
        multiline={true}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default CustomInput;