import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@react-navigation/native';

const ReviewTab = ({ route }) => {
  const { listing } = route.params;
  const { colors } = useTheme();
console.log(listing)
  const styles = StyleSheet.create({
    reviewContainer: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
    },
    reviewCard: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
    },
    authorName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    date: {
      fontSize: 14,
      color: colors.text,
      opacity: 0.7,
    },
    content: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 12,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    star: {
      fontSize: 18,
      color: '#FFD700',
      marginRight: 2,
    },
    rating: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
      marginLeft: 8,
    },
    helpfulButton: {
      backgroundColor: colors.primary,
      padding: 8,
      borderRadius: 4,
      alignSelf: 'flex-start',
    },
    helpfulButtonActive: {
      backgroundColor: colors.primaryDark,
    },
    helpfulButtonText: {
      color: colors.white,
      fontWeight: 'bold',
    },
  });

  const Review = ({ review }) => {
    const [helpful, setHelpful] = useState(false);

    return (
      <View style={styles.reviewCard}>
        <View style={styles.header}>
          <Image source={ review.user } style={styles.avatar} />
          <View>
            <Text style={styles.authorName}>{review.author}</Text>
            <Text style={styles.date}>{review.date}</Text>
          </View>
        </View>
        <Text style={styles.content}>{review.text}</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Text key={star} style={styles.star}>
              {star <= review.rating ? '★' : '☆'}
            </Text>
          ))}
          <Text style={styles.rating}>{review?.rating}</Text>
        </View>
        <TouchableOpacity
          style={[styles.helpfulButton, helpful && styles.helpfulButtonActive]}
          onPress={() => setHelpful(!helpful)}
        >
          <Text style={styles.helpfulButtonText}>
            Helpful {helpful ? '✓' : ''} ({review.helpfulCount})
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.reviewContainer}>
      {listing.reviews.map((review, index) => (
        <Review key={index} review={review} />
      ))}
    </ScrollView>
  );
};

export default ReviewTab;

