// components/CustomDatePicker.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@react-navigation/native';

const CustomDatePicker = ({ label, value, onChange }) => {
    const { colors } = useTheme();
    const [show, setShow] = useState(false);
  
    const onChangeInternal = (event, selectedDate) => {
      const currentDate = selectedDate || value;
      setShow(Platform.OS === 'ios');
      onChange(currentDate);
    };
  
    const showDatepicker = () => {
      setShow(true);
    };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TouchableOpacity
        onPress={showDatepicker}
        style={[
          styles.dateButton,
          { backgroundColor: colors.background, borderColor: colors.secondary }
        ]}
      >
        <Text style={[styles.dateText, { color: colors.text }]}>
          {value.toDateString()}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeInternal}
          textColor={colors.text}
        />
      )}
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
    dateButton: {
      height: 40,
      borderWidth: 1,
      borderRadius: 5,
      justifyContent: 'center',
      paddingHorizontal: 10,
    },
    dateText: {
      fontSize: 16,
    },
  });
  export default CustomDatePicker;