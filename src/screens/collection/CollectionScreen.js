import React from 'react';
import { StyleSheet, FlatList, View, useColorScheme } from 'react-native';
import Header from '../../components/common/Header';
import SearchBar from '../../components/common/SearchBar';
import { lightTheme, darkTheme } from '../../components/common/theme';
import PropertyGrid from '../../components/common/PropertyGrid';
import property from "../../../assets/property.png"

const CollectionScreen = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const properties = [
    { id: '1', image:  property, name: 'Lorem House', price: '340', address: '123 Lorem St' },
    { id: '2', image:  property, name: 'Ipsum Villa', price: '450', address: '456 Ipsum Ave' },
    { id: '3', image:  property, name: 'Lorem House', price: '340', address: '123 Lorem St' },
    { id: '4', image:  property, name: 'Ipsum Villa', price: '450', address: '456 Ipsum Ave' },
    { id: '5', image:  property, name: 'Lorem House', price: '340', address: '123 Lorem St' },
    { id: '6', image:  property, name: 'Ipsum Villa', price: '450', address: '456 Ipsum Ave' },
    // ... more properties
  ];

  return (
    <FlatList
      ListHeaderComponent={
        <>
          {/* <Header /> */}
          <SearchBar />
        </>
      }
      data={properties}
      renderItem={({ item }) => <PropertyGrid properties={[item]} />}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.scrollContent}
    />
  );
};

export default CollectionScreen;

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
});
