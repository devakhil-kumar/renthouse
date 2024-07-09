import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../../components/common/theme';
import CustomInput from '../../components/common/CustomInput';
import CustomDropdown from '../../components/common/CustomDropdown';
import CustomDatePicker from '../../components/common/CustomDatePicker';

export default function AddPropertyStep1({ navigation }) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const [formData, setFormData] = useState({
    locality: '',
    fullAddress: '',
    bedrooms: '1',
    bathrooms: '1',
    floorNumber: 'Ground Floor',
    squareFeet: '',
    category: '1BHK',
    furnishedType: 'Fully Furnished',
    price: '',
    brokerage: 'Brokerage estimation',
    preferredTenant: 'All',
    parking: '0',
    nextAvailableDate: new Date(),
    description: '',
  });

  const handleChange = (name, value) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TouchableOpacity style={[styles.imageUploader, { borderColor: theme.colors.secondary }]}>
        <Text style={[styles.uploaderText, { color: theme.colors.text }]}>Upload Property Images</Text>
      </TouchableOpacity>

      <CustomInput
        label="Locality"
        value={formData.locality}
        onChangeText={(value) => handleChange('locality', value)}
        inputStyle={{ color: theme.colors.text }}
        placeholderTextColor={theme.colors.secondary}
      />
      <CustomInput
        label="Full Address"
        value={formData.fullAddress}
        onChangeText={(value) => handleChange('fullAddress', value)}
        inputStyle={{ color: theme.colors.text }}
        placeholderTextColor={theme.colors.secondary}
      />

      <View style={styles.row}>
        <CustomDropdown
          label="No of Bedrooms"
          value={formData.bedrooms}
          onValueChange={(value) => handleChange('bedrooms', value)}
          items={['1', '2', '3', '4', '5+']}
          containerStyle={[styles.halfWidth, { borderColor: theme.colors.secondary }]}
          textStyle={{ color: theme.colors.text }}
        />
        <CustomDropdown
          label="No of Bathrooms"
          value={formData.bathrooms}
          onValueChange={(value) => handleChange('bathrooms', value)}
          items={['1', '2', '3', '4', '5+']}
          containerStyle={[styles.halfWidth, { borderColor: theme.colors.secondary }]}
          textStyle={{ color: theme.colors.text }}
        />
      </View>

      <CustomDropdown
        label="Floor number"
        value={formData.floorNumber}
        onValueChange={(value) => handleChange('floorNumber', value)}
        items={['Ground Floor', '1', '2', '3', '4', '5+']}
        containerStyle={{ borderColor: theme.colors.secondary }}
        textStyle={{ color: theme.colors.text }}
      />

      <CustomInput
        label="Square feet"
        value={formData.squareFeet}
        onChangeText={(value) => handleChange('squareFeet', value)}
        keyboardType="numeric"
        placeholder="Enter sq ft"
        inputStyle={{ color: theme.colors.text }}
        placeholderTextColor={theme.colors.secondary}
      />

      <CustomDropdown
        label="Category"
        value={formData.category}
        onValueChange={(value) => handleChange('category', value)}
        items={['1BHK', '2BHK', '3BHK', '4BHK', '5BHK+']}
        containerStyle={{ borderColor: theme.colors.secondary }}
        textStyle={{ color: theme.colors.text }}
      />

      <CustomDropdown
        label="Furnished Type"
        value={formData.furnishedType}
        onValueChange={(value) => handleChange('furnishedType', value)}
        items={['Fully Furnished', 'Semi-Furnished', 'Unfurnished']}
        containerStyle={{ borderColor: theme.colors.secondary }}
        textStyle={{ color: theme.colors.text }}
      />

      <CustomInput
        label="Price"
        value={formData.price}
        onChangeText={(value) => handleChange('price', value)}
        keyboardType="numeric"
        placeholder="Price estimation"
        inputStyle={{ color: theme.colors.text }}
        placeholderTextColor={theme.colors.secondary}
      />

      <View style={styles.row}>
        <CustomDropdown
          label="Brokerage"
          value={formData.brokerage}
          onValueChange={(value) => handleChange('brokerage', value)}
          items={['Brokerage estimation', 'Fixed']}
          containerStyle={[styles.threeQuartersWidth, { borderColor: theme.colors.secondary }]}
          textStyle={{ color: theme.colors.text }}
        />
        <CustomDropdown
          label=""
          value="fix"
          onValueChange={() => {}}
          items={['fix']}
          containerStyle={[styles.quarterWidth, { borderColor: theme.colors.secondary }]}
          textStyle={{ color: theme.colors.text }}
        />
      </View>

      <CustomDropdown
        label="Preferred Tenant"
        value={formData.preferredTenant}
        onValueChange={(value) => handleChange('preferredTenant', value)}
        items={['All', 'Family', 'Bachelor', 'Company']}
        containerStyle={{ borderColor: theme.colors.secondary }}
        textStyle={{ color: theme.colors.text }}
      />

      <CustomDropdown
        label="Parking"
        value={formData.parking}
        onValueChange={(value) => handleChange('parking', value)}
        items={['0', '1', '2', '3', '4', '5+']}
        containerStyle={{ borderColor: theme.colors.secondary }}
        textStyle={{ color: theme.colors.text }}
      />

      <CustomDatePicker
        label="Next Available Date"
        value={formData.nextAvailableDate}
        onChange={(value) => handleChange('nextAvailableDate', value)}
        containerStyle={{ borderColor: theme.colors.secondary }}
        textStyle={{ color: theme.colors.text }}
      />

      <CustomInput
        label="Description"
        value={formData.description}
        onChangeText={(value) => handleChange('description', value)}
        multiline
        numberOfLines={4}
        placeholder="Short Description of the Property"
        inputStyle={{ color: theme.colors.text }}
        placeholderTextColor={theme.colors.secondary}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('AddPropertyScreen2', { formData })}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imageUploader: {
    height: 100,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploaderText: {
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  threeQuartersWidth: {
    width: '48%',
  },
  quarterWidth: {
    width: '48%',
  },
  button: {
    padding: 16,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
