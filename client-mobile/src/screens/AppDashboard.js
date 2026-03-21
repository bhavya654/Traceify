import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

const AppDashboard = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* TopAppBar */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmVeo76xYnLJA9E0hQuMIIfqYOftnl8kf_-R8tiGcGIJhV65U2KUQLaVgAcTUp9PjNFgvzf9vB7wfiZfWL-B3Mipyv41R_L4Cc-bahzGwmSP9jorSSmreYqcl_o3svRm6wBo4qSNDORQSCtJR9gi0ph3Xqfu00iUZsOC4Qm2Gs-llUo4oz5-E_h0GRWeD-XcvckH9oNa4RmCO-Nqm9sM8-8Sw6wZapWTrdK-_WRcsKMOMRk4E4a-zVBbCXWPzB1lnmi4Au-9aOTTI' }}
                style={styles.avatar}
              />
            </View>
            <Text style={styles.greetingHeader}>Good Morning</Text>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Greeting Section */}
          <View style={styles.greetingSection}>
            <Text style={styles.title}>Hi, User 👋</Text>
            <Text style={styles.subtitle}>Welcome back to your digital vault.</Text>
          </View>

          {/* Large Account Balance Card (Hero) */}
          <View style={styles.heroCard}>
            <View style={styles.heroTop}>
              <Text style={styles.heroLabel}>AVAILABLE BALANCE</Text>
              <Text style={styles.heroBalance}>$12,450.00</Text>
            </View>
            <View style={styles.heroBottom}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardInfoText}>**** 4421</Text>
              </View>
            </View>
          </View>

          {/* Quick Action Grid */}
          <View style={styles.gridContainer}>
            <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('AppTransfer')}>
              <View style={[styles.gridIconContainer, { backgroundColor: '#E8E6FF' }]}>
                <Text style={styles.gridIcon}>↗️</Text>
              </View>
              <Text style={styles.gridText}>Send Money</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.gridItem}>
              <View style={[styles.gridIconContainer, { backgroundColor: '#E5F3FF' }]}>
                <Text style={styles.gridIcon}>↙️</Text>
              </View>
              <Text style={styles.gridText}>Request Money</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem}>
              <View style={[styles.gridIconContainer, { backgroundColor: '#FFE5EC' }]}>
                <Text style={styles.gridIcon}>📱</Text>
              </View>
              <Text style={styles.gridText}>Scan & Pay</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem}>
              <View style={[styles.gridIconContainer, { backgroundColor: '#E5FFE5' }]}>
                <Text style={styles.gridIcon}>📄</Text>
              </View>
              <Text style={styles.gridText}>Bill Pay</Text>
            </TouchableOpacity>
          </View>

          {/* Recent Transactions */}
          <View style={styles.recentHeaderContainer}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AppHistory')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactionsContainer}>
            <View style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxwkbjWUdP5kHNnabxtMvWLXEyfbKDZPLlSsU46ZR4KQBJ5IG_dSJ044TvvbPh8a-T_jjZMQmiP9jutAzwZnW54HDRvTi3ahM1xIO-XzpclMeH1ECienN0nfsT-gCYn4SjjMpchDDAasn46vy52saf9uqBWP7dKit9camQJI1puwl7WBCO9Qjkqxee07mlJBaGL6i8gUOBeJnMWMI1ed88LDLLyi7A-IJ_taCGrkOcc_QMTvQ_J71RaoiMyddh31OLP9p2UP1PAaA' }} style={styles.transactionAvatar} />
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionName}>Alex Thompson</Text>
                  <Text style={styles.transactionDate}>Oct 24, 2023</Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={styles.transactionAmountNegative}>-$120.00</Text>
                <Text style={styles.transactionType}>Food & Drink</Text>
              </View>
            </View>

            <View style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={[styles.transactionAvatar, { backgroundColor: '#E5F3FF', justifyContent: 'center', alignItems: 'center' }]}>
                  <Text>📈</Text>
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionName}>Weekly Salary</Text>
                  <Text style={styles.transactionDate}>Oct 23, 2023</Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={styles.transactionAmountPositive}>+$2,450.00</Text>
                <Text style={styles.transactionType}>Deposit</Text>
              </View>
            </View>

            <View style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsT_F2Kbb0Y6YMj2W1KlR0s7FzW7aN5OPXRDO9WxL4uHSxBvf5bEpWOGzjT4LtXi_qA0FKfJqNuDM-nw_qscEoBLC7OR7xxSbPZ0HnuCGLnXt1vVqBvZ6B5ZQ0WF2_bQILDGW-LVvavLDJJmCQwHFLTJgLJms9VXeozBJ-OPg1F_wfELtIVyFI8cYfgMquIejy6V9veqrL5YTCQK0I4-3UCQQTjItdJE3zzEsPZQcPTzBTtftrzE9IjcKBSOvVKssI5jX-hsck7sA' }} style={styles.transactionAvatar} />
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionName}>Sarah Jenkins</Text>
                  <Text style={styles.transactionDate}>Oct 22, 2023</Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={styles.transactionAmountNegative}>-$45.50</Text>
                <Text style={styles.transactionType}>Utilities</Text>
              </View>
            </View>
          </View>
          
          <View style={{ height: 120 }} />
        </ScrollView>

        {/* BottomNavBar */}
        <View style={styles.bottomNavContainer}>
          <TouchableOpacity style={styles.navItemFocused}>
            <Text style={styles.navIconFocused}>🏠</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AppTransfer')}>
            <Text style={styles.navIcon}>💸</Text>
            <Text style={styles.navText}>Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AppHistory')}>
            <Text style={styles.navIcon}>📜</Text>
            <Text style={styles.navText}>History</Text>
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
  greetingHeader: {
    fontSize: 18,
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
  greetingSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  heroCard: {
    backgroundColor: '#3525CD',
    borderRadius: 32,
    padding: 32,
    minHeight: 200,
    justifyContent: 'space-between',
    marginBottom: 32,
    shadowColor: '#3525CD',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  heroTop: {
    marginBottom: 40,
  },
  heroLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    letterSpacing: 1.5,
    fontWeight: '600',
    marginBottom: 8,
  },
  heroBalance: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: '900',
  },
  heroBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardInfo: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cardInfoText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  gridIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  gridIcon: {
    fontSize: 20,
  },
  gridText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  recentHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3525CD',
  },
  transactionsContainer: {
    backgroundColor: '#F8F9FB',
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
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
    backgroundColor: '#F0F0F0',
  },
  transactionDetails: {
    justifyContent: 'center',
  },
  transactionName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#888',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmountNegative: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  transactionAmountPositive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00B96B',
    marginBottom: 4,
  },
  transactionType: {
    fontSize: 10,
    textTransform: 'uppercase',
    color: '#888',
    letterSpacing: 0.5,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 30 : 20,
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

export default AppDashboard;
