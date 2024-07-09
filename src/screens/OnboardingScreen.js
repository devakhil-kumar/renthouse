import React, { useState } from 'react';
import { View,Text, FlatList, Image, StyleSheet, Dimensions,TouchableOpacity } from 'react-native';

// Import your images
import image1 from '../../assets/StartedScreen01.jpg';
import image2 from '../../assets/OnboardingScreen02.jpg';
import image3 from '../../assets/OnboardingScreen3.jpg';

const { width } = Dimensions.get('window');

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = React.useRef(null);
  const onboardingData = [
    { id: 1, image: image1 },
    { id: 2, image: image2 },
    { id: 3, image: image3 },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
    </View>
  );

  const handleScroll = (event) => {
    const offset = event.nativeEvent.contentOffset.x;
    const targetIndex = Math.round(offset / width);
    setCurrentIndex(targetIndex);
  };

  const scrollToIndex = (index) => {
    flatListRef.current.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  };

  const scrollToNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < onboardingData.length) {
      scrollToIndex(nextIndex);
    }
  };

  const scrollToPrevious = () => {
    const previousIndex = currentIndex - 1;
    if (previousIndex >= 0) {
      scrollToIndex(previousIndex);
    }
  };

  return (
    <View style={styles.container}>
    <FlatList
      ref={flatListRef}
      data={onboardingData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={handleScroll}
    />
    <View style={styles.paginationContainer}>
      <TouchableOpacity style={styles.arrowButton} onPress={scrollToPrevious}>
        <Text style={styles.arrowText}>{'<'}</Text>
      </TouchableOpacity>
      {onboardingData.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            index === currentIndex && styles.activeDot,
          ]}
        />
      ))}
      <TouchableOpacity style={styles.arrowButton} onPress={scrollToNext}>
        <Text style={styles.arrowText}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      itemContainer: {
        width,
        alignItems: 'center',
        justifyContent: 'center',
      },
      image: {
        width: '80%',
        height: '80%',
      },
      paginationContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        alignItems: 'center',
      },
      paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'gray',
        marginHorizontal: 5,
      },
      activeDot: {
        backgroundColor: 'blue',
        width: 12,
        height: 12,
        borderRadius: 6,
      },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;