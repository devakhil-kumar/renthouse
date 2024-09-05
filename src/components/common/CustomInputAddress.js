import React from 'react';
// import { TouchableOpacity, Text } from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';


const CustomInputAddress = ({
  label,
  value,
  onChangeText,
  inputStyle,
  placeholderTextColor,
  error,
  onLayout,
}) => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const handlePress = () => {
    navigation.navigate('AddressScreen');
  };

  return (
    <View onLayout={onLayout} style={styles.container}>
      <Text style={[styles.label, {color: colors.text}]}>{label}</Text>
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.input,
          {
            backgroundColor: colors.background,
            borderColor: error ? 'red' : 'grey',
          },
        ]}>
        <Text
          style={[
            {
              color: value
                ? colors.text
                : placeholderTextColor || colors.secondary,
            },
            inputStyle,
          ]}>
          {value || label}
        </Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default CustomInputAddress;
const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
