// components/CustomDropdown.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@react-navigation/native';

const CustomDropdown = ({ label, value, onValueChange, items, ...props }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, props.containerStyle]}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <View style={[
        styles.pickerContainer,
        { 
            backgroundColor: colors.background,
            //  borderColor: colors.secondary 
            }
      ]}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={[styles.picker, { color: colors.text }]}
          dropdownIconColor={colors.text}
        >
          {items.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>
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
      fontWeight:"500"
    },
    pickerContainer: {
      borderWidth: 1,
      borderRadius: 5,
      overflow: 'hidden',
      borderColor: "grey",
      // height: 150, // Increase this value to show more items at once
    },
    picker: {
      height: 50,
    },
  });
  export default CustomDropdown;