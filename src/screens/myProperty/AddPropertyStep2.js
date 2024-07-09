import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../../components/common/theme';
import Icon from 'react-native-vector-icons/Ionicons';
export default function AddPropertyStep2({ route, navigation }) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const { formData: step1Data } = route.params;
  const [formData, setFormData] = useState({
    propertyType: '',
    rentNegotiable: null,
    petFriendly: null,
    gatedSociety: null,
    amenities: [],
  });

  const handleRadioChange = (name, value) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prevState => ({
      ...prevState,
      amenities: prevState.amenities.includes(amenity)
        ? prevState.amenities.filter(a => a !== amenity)
        : [...prevState.amenities, amenity]
    }));
  };

  const RadioButton = ({ label, name, value, selectedValue }) => (
    <TouchableOpacity
      style={styles.radioButton}
      onPress={() => handleRadioChange(name, value)}
    >
      <View style={[
        styles.radio,
        { borderColor: theme.colors.primary },
        selectedValue === value && { backgroundColor: theme.colors.primary }
      ]} />
      <Text style={[styles.radioLabel, { color: theme.colors.text }]}>{label}</Text>
    </TouchableOpacity>
  );

  const CheckBox = ({ label, value, onToggle }) => (
    <TouchableOpacity
      style={styles.checkBox}
      onPress={() => onToggle(value)}
    >
      <View style={[
        styles.check,
        { borderColor: theme.colors.primary },
        formData.amenities.includes(value) && styles.checkedBox
      ]}>
        {formData.amenities.includes(value) && (
         <Icon name="checkmark" size={18} color="#fff" />
        )}
      </View>
      <Text style={[styles.checkLabel, { color: theme.colors.text }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Type of Property</Text>
      <View style={styles.radioGroup}>
        <RadioButton label="Livin Couple" name="propertyType" value="livinCouple" selectedValue={formData.propertyType} />
        <RadioButton label="Fully Independent" name="propertyType" value="fullyIndependent" selectedValue={formData.propertyType} />
        <RadioButton label="Student Allowed" name="propertyType" value="studentAllowed" selectedValue={formData.propertyType} />
        <RadioButton label="Owner Free" name="propertyType" value="ownerFree" selectedValue={formData.propertyType} />
      </View>

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Is rent negotiable?</Text>
      <View style={styles.radioGroup}>
        <RadioButton label="Yes" name="rentNegotiable" value={true} selectedValue={formData.rentNegotiable} />
        <RadioButton label="No" name="rentNegotiable" value={false} selectedValue={formData.rentNegotiable} />
      </View>

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Pet Friendly?</Text>
      <View style={styles.radioGroup}>
        <RadioButton label="Yes" name="petFriendly" value={true} selectedValue={formData.petFriendly} />
        <RadioButton label="No" name="petFriendly" value={false} selectedValue={formData.petFriendly} />
      </View>

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Gated Society</Text>
      <View style={styles.radioGroup}>
        <RadioButton label="Yes" name="gatedSociety" value={true} selectedValue={formData.gatedSociety} />
        <RadioButton label="No" name="gatedSociety" value={false} selectedValue={formData.gatedSociety} />
      </View>

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Amenities</Text>
      <View style={styles.checkGroup}>
        <CheckBox label="Gas and Stove" value="gasAndStove" onToggle={handleAmenityToggle} />
        <CheckBox label="Lift" value="lift" onToggle={handleAmenityToggle} />
        <CheckBox label="AC" value="ac" onToggle={handleAmenityToggle} />
        <CheckBox label="WIFI" value="wifi" onToggle={handleAmenityToggle} />
        <CheckBox label="Fridge" value="fridge" onToggle={handleAmenityToggle} />
        <CheckBox label="Washing Machine" value="washingMachine" onToggle={handleAmenityToggle} />
        <CheckBox label="Power Backup/ Inverter" value="powerBackup" onToggle={handleAmenityToggle} />
      </View>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={() => {
          // Combine data from both steps and submit
          const finalData = { ...step1Data, ...formData };
          console.log('Final form data:', finalData);
          // Here you would typically send this data to your API
        }}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%', // Adjust to create two columns
    marginBottom: 10,
  },
  radio: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 10,
  },
  radioLabel: {
    fontSize: 16,
  },
  checkGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
  },
  check: {
  
    height: 24,
    width: 24,
    borderWidth: 2,
    marginRight: 10,
  },
  checkLabel: {
    fontSize: 16,
  },
  checkedBox: {
    backgroundColor: '#2196F3', // Adjust the color as needed
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom:40
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
});
