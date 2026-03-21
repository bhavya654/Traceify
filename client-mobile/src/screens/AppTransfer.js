import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, TextInput, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const AppTransfer = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Navigation Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.navigate('AppDashboard')}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Transfer</Text>
          </View>
          <View style={styles.secureBadge}>
            <Text style={styles.secureIcon}>🛡</Text>
            <Text style={styles.secureText}>SECURE TRANSFER</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* From Account Section */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>FROM ACCOUNT</Text>
            <TouchableOpacity style={styles.accountCard}>
              <View style={styles.accountLeft}>
                <View style={styles.accountIconContainer}>
                  <Text style={styles.accountIcon}>💳</Text>
                </View>
                <View>
                  <Text style={styles.accountName}>Savings Account</Text>
                  <Text style={styles.accountDetails}>....4532 • Available: <Text style={styles.accountBalance}>$12,450.00</Text></Text>
                </View>
              </View>
              <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* To Account / Contact Selector */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionLabel}>TO CONTACT</Text>
              <TouchableOpacity>
                <Text style={styles.manageContacts}>Manage Contacts</Text>
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput 
                style={styles.searchInput}
                placeholder="Name, @handle, or account number"
                placeholderTextColor="#A0A0A0"
              />
            </View>

            {/* Recent Contacts */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.contactsScroll}>
              <TouchableOpacity style={styles.contactItem}>
                <View style={[styles.contactAvatar, styles.newContactAvatar]}>
                  <Text style={styles.newContactIcon}>+</Text>
                </View>
                <Text style={styles.contactName}>New</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.contactItem}>
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfVzjUdzIyiEoLaGHGplWcj4obT9PLJElYKuBVL_Hxn2c5rVTfSksmjIyD9cdiiSf6tn768PqU8urcPyTz83h8daVrLGQH4-_xgo5OdAYW74nnIKhLF9pPyc9XbMRj-5Ow9xfSfw1VkNoH1DVzQ_r3j4BlNqA3VqYPuesrAyaX0eUUph27p_smIvxGTv1UTdStbDHNt621O96Nc3xHZdDbvPrJHhpmpWkrN9kbbwHeEL3_VZof2Nk1ifyjjUl-kbiPo3jB6bzhfek' }} 
                  style={[styles.contactAvatar, styles.selectedContactAvatar]} 
                />
                <Text style={styles.contactName}>Alex M.</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.contactItem}>
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLL7_jZBd5z_I6I2o_DrIUOTAPPMDSOdqfP8gj9CY3Er_XVm92gI55ZzjkA2inkNhSkDrjaAzJ-L5nnElqsBmrvrangM2iE5bKGTtb3EruE53ERVpttT8iQfebgOrPNDM50I7KJu3A-Wf_YWCMQhiJUKQ2PJT0I4RJvd5hvIMgLdzS6OpYkcXBsWFI17k42HhWPcYBkru-eoBIXe6qicVmeT1r8IH2rTY4KCISgA1SSXm4REOedDIC2aZQSQ4u7vyfLgH7D9oS0I4' }} 
                  style={styles.contactAvatar} 
                />
                <Text style={styles.contactName}>Sarah W.</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.contactItem}>
                <View style={[styles.contactAvatar, { backgroundColor: '#8E9196', justifyContent: 'center', alignItems: 'center' }]}>
                  <Text style={{ color: '#FFF', fontWeight: 'bold' }}>JD</Text>
                </View>
                <Text style={styles.contactName}>John D.</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.contactItem}>
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxBnmmnGmIS60nC2NSqamCOzRN0gkppcj0nNgSajD63bQ3O_Wu6ezZwgFVZPTnN4XM9xYdTor5dN_iOUdVCNgXxGn_BuEIfwcTqRKGjDpBvBmWvSDquQcaa5RFKKq9WFw8Ac4AFrbQER2OACOXtX-VBRhRZFFJnCifWrSs_Zz6SoL7zo6L41AXFv8fbilRVXbmFMKaIJQ2dJO8G69Yt1Ycmxln9AMvfY-cVgvo9OZd4CeuCw5NnnBURiJNK0Q5wbJooXj1MFufNg4' }} 
                  style={styles.contactAvatar} 
                />
                <Text style={styles.contactName}>Mike R.</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Amount Input Section */}
          <View style={styles.amountSection}>
            <Text style={styles.sectionLabelCenter}>ENTER AMOUNT</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <Text style={styles.amountValue}>1,250.00</Text>
            </View>
            <View style={styles.feeContainer}>
              <Text style={styles.feeLabel}>Fee:</Text>
              <Text style={styles.feeValue}>$0.00</Text>
            </View>
          </View>

          {/* Note Input */}
          <View style={styles.noteContainer}>
            <Text style={styles.noteIcon}>📝</Text>
            <TextInput 
              style={styles.noteInput}
              placeholder="Add a note (Optional)"
              placeholderTextColor="#A0A0A0"
            />
          </View>

          {/* Custom Numeric Keypad */}
          <View style={styles.keypadContainer}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((num) => (
              <TouchableOpacity key={num} style={styles.keypadButton}>
                <Text style={styles.keypadText}>{num}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.keypadButton}>
              <Text style={styles.keypadText}>⌫</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Fixed Action Button */}
        <View style={styles.bottomActionContainer}>
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={() => navigation.navigate('AppSuccess')}
          >
            <Text style={styles.sendButtonText}>Send Money ↗</Text>
          </TouchableOpacity>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#F8F9FB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  backIcon: {
    fontSize: 24,
    color: '#3525CD',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#3525CD',
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  secureIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  secureText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2E7D32',
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#A0A0A0',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  sectionLabelCenter: {
    fontSize: 12,
    fontWeight: '700',
    color: '#A0A0A0',
    letterSpacing: 1.5,
    marginBottom: 12,
    textAlign: 'center',
  },
  accountCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  accountLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8E6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  accountIcon: {
    fontSize: 20,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  accountDetails: {
    fontSize: 12,
    color: '#888',
  },
  accountBalance: {
    fontWeight: '600',
    color: '#3525CD',
  },
  dropdownIcon: {
    color: '#A0A0A0',
    fontSize: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  manageContacts: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3525CD',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 16,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
  },
  contactsScroll: {
    marginBottom: 8,
  },
  contactItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  contactAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 8,
  },
  newContactAvatar: {
    backgroundColor: '#F0F0F0',
    borderWidth: 2,
    borderColor: '#CCC',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newContactIcon: {
    fontSize: 24,
    color: '#888',
  },
  selectedContactAvatar: {
    borderWidth: 2,
    borderColor: '#3525CD',
  },
  contactName: {
    fontSize: 11,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  amountSection: {
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 8,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: '800',
    color: '#666',
    marginRight: 4,
  },
  amountValue: {
    fontSize: 48,
    fontWeight: '900',
    color: '#1A1A1A',
  },
  feeContainer: {
    flexDirection: 'row',
    backgroundColor: '#EBEBEB',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
  },
  feeLabel: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  feeValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 24,
  },
  noteIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  noteInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
  },
  keypadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  keypadButton: {
    width: '31%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 12,
    marginBottom: 8,
  },
  keypadText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  bottomActionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: 'rgba(248, 249, 251, 0.95)',
  },
  sendButton: {
    backgroundColor: '#3525CD',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3525CD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  sendButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AppTransfer;
