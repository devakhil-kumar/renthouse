import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TermsConditionScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>
      
      <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
      <Text style={styles.content}>
        By using our real estate app, you agree to these Terms and Conditions. If you disagree with any part of these terms, please do not use our app.
      </Text>
      
      <Text style={styles.sectionTitle}>2. User Accounts</Text>
      <Text style={styles.content}>
        You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
      </Text>
      
      <Text style={styles.sectionTitle}>3. Property Listings</Text>
      <Text style={styles.content}>
        Agents are responsible for the accuracy of their listings. Users acknowledge that the app is not responsible for verifying the accuracy of listings.
      </Text>
      
      <Text style={styles.sectionTitle}>4. Communication</Text>
      <Text style={styles.content}>
        Users and agents agree to communicate respectfully through the app. We reserve the right to terminate accounts that violate this policy.
      </Text>
      
      <Text style={styles.sectionTitle}>5. Transactions</Text>
      <Text style={styles.content}>
        Our app facilitates connections between buyers, sellers, and agents. We are not responsible for the outcome of any real estate transactions.
      </Text>
      
      <Text style={styles.sectionTitle}>6. Intellectual Property</Text>
      <Text style={styles.content}>
        The content, organization, graphics, design, and other matters related to the app are protected under applicable copyrights and trademarks.
      </Text>
      
      <Text style={styles.sectionTitle}>7. Limitation of Liability</Text>
      <Text style={styles.content}>
        We shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the app.
      </Text>
      
      <Text style={styles.sectionTitle}>8. Changes to Terms</Text>
      <Text style={styles.content}>
        We reserve the right to modify these terms at any time. Continued use of the app after changes constitutes acceptance of the new terms.
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

export default TermsConditionScreen;