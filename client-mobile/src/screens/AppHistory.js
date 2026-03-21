import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, TextInput } from 'react-native';

const AppHistory = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* TopAppBar */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_kW1SBUoIdG1zs7BV7Hy7_vUT1HMg-9M7tPYMqbSTu0HqaYpd5bugdET59PgSW3C1RAVqMqEgol7Jb4EcY5ssAlzJXUxf32v72doRBzuEhj_bw5h7vP8d1zyFdZPSNfDRCML-Q_ufGdTIRPaxY7iHyBcr8mnpPUcLctJLKIdREGLVB3tayhrLU41OyIZMNMc_rTFtWveTra1uo_wKmr-IwmAZoiUHCCynb6o9-NONg9hWbc_H0xAvZfB4t7WDMldnCyC3HFpPEq4' }}
                style={styles.avatar}
              />
            </View>
            <Text style={styles.headerTitle}>History</Text>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Search and Filter Section */}
          <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput 
                style={styles.searchInput}
                placeholder="Search transactions..."
                placeholderTextColor="#A0A0A0"
              />
            </View>
            
            <View style={styles.filterContainer}>
              <TouchableOpacity style={styles.filterButtonActive}>
                <Text style={styles.filterTextActive}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterText}>Sent</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterText}>Received</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Transaction Feed */}
          <View style={styles.feedContainer}>
            {/* Today */}
            <Text style={styles.sectionHeader}>TODAY</Text>
            
            {/* Received */}
            <View style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={[styles.transactionIconContainer, { backgroundColor: '#E5F3FF' }]}>
                  <Text style={{ fontSize: 18, color: '#3525CD' }}>↓</Text>
                </View>
                <View>
                  <Text style={styles.transactionName}>Elena Gilbert</Text>
                  <Text style={styles.transactionDetails}>12:45 PM • Success</Text>
                </View>
              </View>
              <Text style={styles.transactionAmountPositive}>+$1,240.00</Text>
            </View>

            {/* Sent */}
            <View style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={[styles.transactionIconContainer, { backgroundColor: '#E8E6FF' }]}>
                  <Text style={{ fontSize: 18, color: '#3525CD' }}>↑</Text>
                </View>
                <View>
                  <Text style={styles.transactionName}>Apple Store</Text>
                  <Text style={styles.transactionDetails}>09:12 AM • Success</Text>
                </View>
              </View>
              <Text style={styles.transactionAmountNegative}>-$899.00</Text>
            </View>

            {/* Yesterday */}
            <Text style={[styles.sectionHeader, { marginTop: 24 }]}>YESTERDAY</Text>
            
            {/* Pending */}
            <View style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={[styles.transactionIconContainer, { backgroundColor: '#F0F0F0' }]}>
                  <Text style={{ fontSize: 18, color: '#888' }}>⏱</Text>
                </View>
                <View>
                  <Text style={styles.transactionName}>Stefan Salvatore</Text>
                  <Text style={styles.transactionDetails}>04:30 PM • Pending</Text>
                </View>
              </View>
              <Text style={styles.transactionAmountNeutral}>-$250.00</Text>
            </View>

            {/* Received */}
            <View style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={[styles.transactionIconContainer, { backgroundColor: '#E5F3FF' }]}>
                  <Text style={{ fontSize: 18, color: '#3525CD' }}>↓</Text>
                </View>
                <View>
                  <Text style={styles.transactionName}>Wealthfront Div</Text>
                  <Text style={styles.transactionDetails}>01:15 PM • Success</Text>
                </View>
              </View>
              <Text style={styles.transactionAmountPositive}>+$45.20</Text>
            </View>

            {/* Sent */}
            <View style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={[styles.transactionIconContainer, { backgroundColor: '#E8E6FF' }]}>
                  <Text style={{ fontSize: 18, color: '#3525CD' }}>🛍</Text>
                </View>
                <View>
                  <Text style={styles.transactionName}>Whole Foods</Text>
                  <Text style={styles.transactionDetails}>10:05 AM • Success</Text>
                </View>
              </View>
              <Text style={styles.transactionAmountNegative}>-$124.50</Text>
            </View>
          </View>
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNavContainer}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AppDashboard')}>
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AppTransfer')}>
            <Text style={styles.navIcon}>💸</Text>
            <Text style={styles.navText}>Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItemFocused}>
            <Text style={styles.navIconFocused}>📜</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AppProfile')}>
            <Text style={styles.navIcon}>👤</Text>
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f9fb',
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
    backgroundColor: '#f7f9fb',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#D1C4E9',
    marginRight: 12,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  searchSection: {
    marginBottom: 32,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#EBEBEB',
    borderRadius: 30,
    padding: 4,
    alignSelf: 'flex-start',
  },
  filterButtonActive: {
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  filterTextActive: {
    color: '#3525CD',
    fontWeight: '700',
    fontSize: 14,
  },
  filterText: {
    color: '#888',
    fontWeight: '600',
    fontSize: 14,
  },
  feedContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#A0A0A0',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 24,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  transactionDetails: {
    fontSize: 12,
    color: '#888',
  },
  transactionAmountPositive: {
    fontSize: 18,
    fontWeight: '800',
    color: '#00B96B',
  },
  transactionAmountNegative: {
    fontSize: 18,
    fontWeight: '800',
    color: '#E02B2B',
  },
  transactionAmountNeutral: {
    fontSize: 18,
    fontWeight: '800',
    color: '#888',
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 30, // Assuming padding for modern phones
    left: '10%',
    width: '80%',
    height: 64,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 32,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  navItemFocused: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3525CD',
    width: 48,
    height: 48,
    borderRadius: 24,
    shadowColor: '#3525CD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  navIconFocused: {
    fontSize: 20,
    color: '#FFF',
  },
  navIcon: {
    fontSize: 20,
    color: '#888',
    marginBottom: 2,
  },
  navText: {
    fontSize: 10,
    color: '#888',
    fontWeight: '600',
  },
});

export default AppHistory;
