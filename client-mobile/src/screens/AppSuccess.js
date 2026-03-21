import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';

const AppSuccess = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Main Success Canvas */}
        <View style={styles.mainContent}>
          
          {/* Celebratory Icon Section */}
          <View style={styles.celebrationSection}>
            <View style={styles.iconContainer}>
              <Text style={styles.successIcon}>✓</Text>
            </View>
            <Text style={styles.title}>$500.00 Sent Successfully</Text>
            <Text style={styles.subtitle}>Transaction completed on Oct 24, 2023 • 10:42 AM</Text>
          </View>

          {/* Receipt Card */}
          <View style={styles.receiptCard}>
            {/* Receiver Profile */}
            <View style={styles.receiverSection}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSue8HOd2mWPQnr6oUCYtWwrj3pdxjvRtS4Lh4G9gqwmz8WY0klvVrtCEBAcueRTutejIwViQPeyl0sA3CWmZeen3tezCBJOVqmO6W9J0F1lVZwsjG_t9NFlbHKWIZBLPEBu5nRhEIW28PSONtQxrIB2Vy9zRai3cAYoHoW1g-ZWKfhMOsdI05E4EiM8Igf_88C5GK6imtSILUommZ0tv5ifU2Mqs8Bw5CgbkrddcbHcKlV_0kBaB6brsFHUJOsNNPtm2dMtiM1do' }}
                style={styles.receiverAvatar}
              />
              <View>
                <Text style={styles.receiverLabel}>RECEIVER</Text>
                <Text style={styles.receiverName}>Jordan Sterling</Text>
                <Text style={styles.receiverDetails}>Chase Bank • •••• 8821</Text>
              </View>
            </View>

            {/* Transaction Metadata Grid */}
            <View style={styles.metadataGrid}>
              <View style={styles.metadataCardLight}>
                <Text style={styles.metadataLabel}>STATUS</Text>
                <View style={styles.statusRow}>
                  <View style={styles.statusDot} />
                  <Text style={styles.metadataValue}>Completed</Text>
                </View>
              </View>
              <View style={styles.metadataCardLight}>
                <Text style={styles.metadataLabel}>METHOD</Text>
                <Text style={styles.metadataValue}>Wallet Balance</Text>
              </View>
            </View>
            
            <View style={styles.metadataCardFull}>
              <View style={styles.metadataFullContent}>
                <View>
                  <Text style={styles.metadataLabel}>TRANSACTION ID</Text>
                  <Text style={styles.metadataId}>TXN-8821-4490-332X</Text>
                </View>
                <TouchableOpacity style={styles.copyButton}>
                  <Text style={styles.copyIcon}>📋</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Action Button */}
          <View style={styles.actionSection}>
            <TouchableOpacity 
              style={styles.doneButton}
              onPress={() => navigation.navigate('AppDashboard')}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>

          {/* Footnote */}
          <Text style={styles.footnote}>
            Funds are usually available within seconds. For security, this transaction is protected by 256-bit encryption.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
    justifyContent: 'center',
    padding: 24,
  },
  mainContent: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  celebrationSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  successIcon: {
    fontSize: 48,
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  receiptCard: {
    backgroundColor: '#FFF',
    borderRadius: 32,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  receiverSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  receiverAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
    backgroundColor: '#D1C4E9',
  },
  receiverLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#A0A0A0',
    letterSpacing: 2,
    marginBottom: 4,
  },
  receiverName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  receiverDetails: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginTop: 2,
  },
  metadataGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metadataCardLight: {
    width: '48%',
    backgroundColor: '#F8F9FB',
    padding: 16,
    borderRadius: 16,
  },
  metadataCardFull: {
    backgroundColor: '#F8F9FB',
    padding: 16,
    borderRadius: 16,
  },
  metadataFullContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metadataLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#A0A0A0',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 12,
    borderRadius: 4,
    backgroundColor: '#2E7D32',
    marginRight: 8,
  },
  metadataValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  metadataId: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#1A1A1A',
    fontWeight: '600',
  },
  copyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  copyIcon: {
    fontSize: 16,
  },
  actionSection: {
    gap: 12,
    marginBottom: 32,
  },
  doneButton: {
    width: '100%',
    backgroundColor: '#3525CD',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3525CD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  doneButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsButton: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#EFEFEF',
  },
  detailsButtonText: {
    color: '#3525CD',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footnote: {
    fontSize: 12,
    color: '#A0A0A0',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 24,
  },
});

export default AppSuccess;
