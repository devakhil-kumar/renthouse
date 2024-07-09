// components/CustomInput.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

const CustomInput = ({ label, value, onChangeText, ...props }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          { 
            color: colors.text,
            backgroundColor: colors.background,
            // borderColor: colors.secondary
          }
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.secondary}
        multiline={true} 
        {...props}
      />
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
      fontWeight:"500",
     
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderRadius: 5,
      borderColor:"grey",
      paddingHorizontal: 10,
    },
  });
  
  export default CustomInput;