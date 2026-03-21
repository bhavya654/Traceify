import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';

const AppProfile = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* TopAppBar */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxYWSbfwqD8uuUWdqyBBfKoJefnmVYXiL5iZ2ESO2Ix8CwqGdXSchGO7PcncCgFw7QVM9Ml3QEUHDJDEVU80XOpHN_R0Kj3dLYqTYMhYAu7CTchfaD8AwVE9OskFVjY8LcTX9Io8kzVTbIUaXHo6fzlhu2tAEVmYNCWeu70pwe8Ts8DvPH2ivSJ5yhgKO-7KdzuiGWrpxt7Nye5xWtvacWEmJF4XmbOaoyGBPpgDSYJNwPj9qB-0outnpE8agXEmCWjvECEs4Kijc' }}
                style={styles.avatar}
              />
            </View>
            <Text style={styles.headerTitle}>Good Morning</Text>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Hero Profile Section */}
          <View style={styles.profileHero}>
            <View style={styles.mainAvatarContainer}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPadc-8YZBJIFtA3k128e9UY57fReQr_P6XefYzJIlZ73DVmoLuZLgdo24hPbZItHIvzfNOqTjPi1osX_oWRdiT_JEoCFDxPPUrqHEUAowg1tfGf19fgmAS5gQhhd9NyOgRJu3cE6-XswjYkRDkdvGVm8TTDScC6T2E2qzOpcJRYmsJebKkrxyBjpBjB3R8-q2ByTUvvKxsqgROyiu7_PDyLR6_FzJJo2S3L-eO3PLvXEwpJA6c27TEpkn0d2-f8tK6Tq6Ezvzd6E' }}
                style={styles.mainAvatar}
              />
              <View style={styles.editBadge}>
                <Text style={styles.editIcon}>✏️</Text>
              </View>
            </View>
            <Text style={styles.profileName}>Alex Thompson</Text>
            <Text style={styles.profileEmail}>alex.thompson@premium-fintech.com</Text>
            <View style={styles.badgeRow}>
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>🛡 Verified Member</Text>
              </View>
              <View style={styles.tierBadge}>
                <Text style={styles.tierText}>Gold Tier</Text>
              </View>
            </View>
          </View>

          {/* Premium Bento Stats */}
          <View style={styles.statsGrid}>
            <View style={styles.statCardLight}>
              <Text style={styles.statIconLight}>💳</Text>
              <View>
                <Text style={styles.statLabelLight}>Total Balance</Text>
                <Text style={styles.statValueLight}>$42,950.00</Text>
              </View>
            </View>
            <View style={styles.statCardDark}>
              <Text style={styles.statIconDark}>⭐</Text>
              <View>
                <Text style={styles.statLabelDark}>Rewards Points</Text>
                <Text style={styles.statValueDark}>12,480</Text>
              </View>
            </View>
          </View>

          {/* Menu Section */}
          <View style={styles.menuSection}>
            <Text style={styles.menuTitle}>Account Management</Text>
            <View style={styles.menuContainer}>
              
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={styles.menuIconContainer}>
                    <Text style={styles.menuIcon}>🏦</Text>
                  </View>
                  <View>
                    <Text style={styles.menuItemTitle}>Linked Bank Accounts</Text>
                    <Text style={styles.menuItemSubtitle}>3 Accounts connected</Text>
                  </View>
                </View>
                <Text style={styles.menuArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={styles.menuIconContainer}>
                    <Text style={styles.menuIcon}>🔒</Text>
                  </View>
                  <View>
                    <Text style={styles.menuItemTitle}>Security & Privacy</Text>
                    <Text style={styles.menuItemSubtitle}>Biometrics & 2FA enabled</Text>
                  </View>
                </View>
                <Text style={styles.menuArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={styles.menuIconContainer}>
                    <Text style={styles.menuIcon}>⚙️</Text>
                  </View>
                  <View>
                    <Text style={styles.menuItemTitle}>App Settings</Text>
                    <Text style={styles.menuItemSubtitle}>Notifications & Theme</Text>
                  </View>
                </View>
                <Text style={styles.menuArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={styles.menuIconContainer}>
                    <Text style={styles.menuIcon}>🎧</Text>
                  </View>
                  <View>
                    <Text style={styles.menuItemTitle}>Help & Support</Text>
                    <Text style={styles.menuItemSubtitle}>24/7 Chat available</Text>
                  </View>
                </View>
                <Text style={styles.menuArrow}>›</Text>
              </TouchableOpacity>
              
            </View>
          </View>

          {/* Logout & Security Badge */}
          <View style={styles.footerSection}>
            <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('AppLogin')}>
              <Text style={styles.logoutText}>🚪 Logout</Text>
            </TouchableOpacity>
            
            <View style={styles.securityBadge}>
              <Text style={styles.securityBadgeIcon}>✅</Text>
              <Text style={styles.securityBadgeText}>Securely protected by 256-bit encryption</Text>
            </View>
          </View>
          
          <View style={{ height: 120 }} />
        </ScrollView>

        {/* BottomNavBar */}
        <View style={styles.bottomNavContainer}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AppDashboard')}>
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AppTransfer')}>
            <Text style={styles.navIcon}>💸</Text>
            <Text style={styles.navText}>Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AppHistory')}>
            <Text style={styles.navIcon}>📜</Text>
            <Text style={styles.navText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItemFocused}>
            <Text style={styles.navIconFocused}>👤</Text>
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
    borderWidth: 2,
    borderColor: '#FFF',
    marginRight: 12,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  profileHero: {
    alignItems: 'center',
    marginBottom: 32,
  },
  mainAvatarContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  mainAvatar: {
    width: 120,
    height: 120,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  editBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: '#3525CD',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#F8F9FB',
  },
  editIcon: {
    color: '#FFF',
    fontSize: 14,
  },
  profileName: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  verifiedBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  verifiedText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '700',
  },
  tierBadge: {
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tierText: {
    color: '#F57F17',
    fontSize: 12,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCardLight: {
    width: '48%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 24,
    justifyContent: 'space-between',
    minHeight: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  statCardDark: {
    width: '48%',
    backgroundColor: '#3525CD',
    padding: 20,
    borderRadius: 24,
    justifyContent: 'space-between',
    minHeight: 140,
    shadowColor: '#3525CD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  statIconLight: {
    fontSize: 24,
    marginBottom: 16,
  },
  statIconDark: {
    fontSize: 24,
    marginBottom: 16,
  },
  statLabelLight: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginBottom: 4,
  },
  statValueLight: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1A1A1A',
  },
  statLabelDark: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
    marginBottom: 4,
  },
  statValueDark: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFF',
  },
  menuSection: {
    marginBottom: 32,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#666',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  menuContainer: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuIcon: {
    fontSize: 18,
  },
  menuItemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: '#888',
  },
  menuArrow: {
    fontSize: 24,
    color: '#CCC',
  },
  footerSection: {
    alignItems: 'center',
    gap: 24,
  },
  logoutButton: {
    width: '100%',
    backgroundColor: '#FFEBEB',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#E02B2B',
    fontWeight: '800',
    fontSize: 16,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  securityBadgeIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  securityBadgeText: {
    fontSize: 11,
    color: '#888',
    fontWeight: '600',
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 30,
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

export default AppProfile;
