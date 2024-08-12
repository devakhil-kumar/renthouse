import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      
      <Text style={styles.sectionTitle}>1. Information We Collect</Text>
      <Text style={styles.content}>
        We collect personal information such as your name, email address, phone number, and location. For agents, we may also collect professional credentials and listing information.
      </Text>
      
      <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
      <Text style={styles.content}>
        We use your information to provide and improve our services, match buyers with properties, and facilitate communication between users and agents.
      </Text>
      
      <Text style={styles.sectionTitle}>3. Information Sharing</Text>
      <Text style={styles.content}>
        We may share your information with agents or users as necessary for property transactions. We do not sell your personal information to third parties.
      </Text>
      
      <Text style={styles.sectionTitle}>4. Data Security</Text>
      <Text style={styles.content}>
        We implement industry-standard security measures to protect your personal information from unauthorized access or disclosure.
      </Text>
      
      <Text style={styles.sectionTitle}>5. Your Rights</Text>
      <Text style={styles.content}>
        You have the right to access, correct, or delete your personal information. You may also opt out of certain data collection or use practices.
      </Text>
      
      <Text style={styles.sectionTitle}>6. Changes to This Policy</Text>
      <Text style={styles.content}>
        We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
      </Text>
      
      <Text style={styles.footer}>
        Last updated: August 7, 2024
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#444',
  },
  content: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
    color: '#555',
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    fontStyle: 'italic',
    color: '#777',
  },
});

export default PrivacyPolicyScreen;