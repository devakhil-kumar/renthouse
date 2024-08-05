// components/RecentReviews.js
import React,{useState} from 'react';
import { View, Text, Image, StyleSheet, useColorScheme, TouchableOpacity  } from 'react-native';
import { lightTheme, darkTheme } from './theme';
import user from '../../../assets/user.png';
const ReviewItem = ({ rating, title, date, description, author }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
 
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);
  return (
    <View style={[styles.reviewItem, { backgroundColor: theme.colors.card }]}>
    <View style={styles.ratingContainer}>
      {[...Array(5)].map((_, i) => (
        <Text key={i} style={[styles.star, { color: theme.colors.rating }]}>
          ★
        </Text>
      ))}
      <Text style={[styles.ratingText, { color: theme.colors.text }]}>{rating}</Text>
    </View>
    <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
    <Text style={[styles.date, { color: theme.colors.text }]}>{date}</Text>
    <Text 
      style={[styles.description, { color: theme.colors.text }]}
      numberOfLines={expanded ? undefined : 2}
    >
      {description}
    </Text>
    <TouchableOpacity onPress={toggleExpanded}>
      <Text style={[styles.readMore, { color: theme.colors.primary }]}>
        {expanded ? 'Read Less' : 'Read More'}
      </Text>
    </TouchableOpacity>
    <View style={styles.authorContainer}>
      <Image source={author.image} style={styles.authorImage} />
      <Text style={[styles.authorName, { color: theme.colors.text }]}>{author.name}</Text>
    </View>
  </View>
  );
};

const RecentReviews = () => {
  
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [showAll, setShowAll] = useState(false);
  const reviews = [
    {
      rating: 5.0,
      title: 'Seller of House in Klemzing, SA',
      date: '2 Years 6 months ago',
      description: 'Laurie is professional, Knowledgeable, experienced, friendly and genuine...Laurie is professional, Knowledgeable, experienced, friendly and genuine...Laurie is professional, Knowledgeable, experienced, friendly and genuine...',
      author: { name: 'Robert Fox', image: user },
    },
    {
        rating: 5.0,
        title: 'Seller of House in Klemzing, SA',
        date: '2 Years 6 months ago',
        description: 'Laurie is professional, Knowledgeable, experienced, friendly and genuine...',
        author: { name: 'Robert Fox', image: 'https://example.com/robert-fox.jpg' },
      },
      {
        rating: 5.0,
        title: 'Seller of House in Klemzing, SA',
        date: '2 Years 6 months ago',
        description: 'Laurie is professional, Knowledgeable, experienced, friendly and genuine...',
        author: { name: 'Robert Fox', image: 'https://example.com/robert-fox.jpg' },
      },
      {
        rating: 5.0,
        title: 'Seller of House in Klemzing, SA',
        date: '2 Years 6 months ago',
        description: 'Laurie is professional, Knowledgeable, experienced, friendly and genuine...',
        author: { name: 'Robert Fox', image: 'https://example.com/robert-fox.jpg' },
      },
      {
        rating: 5.0,
        title: 'Seller of House in Klemzing, SA',
        date: '2 Years 6 months ago',
        description: 'Laurie is professional, Knowledgeable, experienced, friendly and genuine...',
        author: { name: 'Robert Fox', image: 'https://example.com/robert-fox.jpg' },
      },
    // Add more review items as needed
  ];
  const displayedReviews = showAll ? reviews : reviews.slice(0, 2);

  const toggleShowAll = () => setShowAll(!showAll);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: theme.colors.text }]}>Recent Review</Text>
        <TouchableOpacity onPress={toggleShowAll}>
          <Text style={[styles.viewAll, { color: theme.colors.primary }]}>
            {showAll ? 'Show Less' : 'View All'}
          </Text>
        </TouchableOpacity>
      </View>
      {displayedReviews.map((review, index) => (
        <ReviewItem key={index} {...review} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    fontSize: 14,
  },
  reviewItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  star: {
    fontSize: 18,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
    lineHeight: 20,
  },
  readMore: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorName: {
    fontSize: 14,
  },
});

export default RecentReviews;