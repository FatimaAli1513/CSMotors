import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../constants/colors';

const ProfileScreen = ({ navigation }) => {
  const handleMenuPress = useCallback((item) => {
    switch (item) {
      case 'favorites':
        navigation.navigate('FavoritesTab');
        break;
      case 'contact':
        navigation.navigate('ContactTab');
        break;
      case 'rate':
        Alert.alert('Rate Us', 'Thank you for your support!');
        break;
      case 'share':
        Alert.alert('Share App', 'Share functionality coming soon!');
        break;
      case 'privacy':
        Linking.openURL('https://csmotors.pk/privacy');
        break;
      case 'terms':
        Linking.openURL('https://csmotors.pk/terms');
        break;
      default:
        break;
    }
  }, [navigation]);

  const MenuItem = ({ icon, title, subtitle, onPress, showBadge = false, badgeText = '' }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.8}
      accessible={true}
      accessibilityLabel={title}
      accessibilityRole="button"
    >
      <View style={styles.menuIconContainer}>
        <Ionicons name={icon} size={22} color={COLORS.primary} />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.menuRight}>
        {showBadge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        )}
        <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileSection}>
          <LinearGradient
            colors={[COLORS.surface, COLORS.surfaceLight]}
            style={styles.profileCard}
          >
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={40} color={COLORS.primary} />
              </View>
              <View style={styles.avatarBadge}>
                <Ionicons name="star" size={12} color={COLORS.background} />
              </View>
            </View>
            <Text style={styles.guestTitle}>Welcome, Guest!</Text>
            <Text style={styles.guestSubtitle}>Explore premium cars at CS Motors</Text>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>Favorites</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>5</Text>
                <Text style={styles.statLabel}>Viewed</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>2</Text>
                <Text style={styles.statLabel}>Inquiries</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => navigation.navigate('Inventory')}
              accessible={true}
              accessibilityLabel="Browse Cars"
              accessibilityRole="button"
            >
              <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(212, 175, 55, 0.1)' }]}>
                <Ionicons name="car-sport" size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.quickActionText}>Browse</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => handleMenuPress('favorites')}
              accessible={true}
              accessibilityLabel="View Favorites"
              accessibilityRole="button"
            >
              <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(231, 76, 60, 0.1)' }]}>
                <Ionicons name="heart" size={24} color={COLORS.accent} />
              </View>
              <Text style={styles.quickActionText}>Favorites</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => handleMenuPress('contact')}
              accessible={true}
              accessibilityLabel="Contact Us"
              accessibilityRole="button"
            >
              <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(37, 211, 102, 0.1)' }]}>
                <Ionicons name="chatbubbles" size={24} color="#25D366" />
              </View>
              <Text style={styles.quickActionText}>Contact</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => handleMenuPress('share')}
              accessible={true}
              accessibilityLabel="Share App"
              accessibilityRole="button"
            >
              <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(29, 161, 242, 0.1)' }]}>
                <Ionicons name="share-social" size={24} color="#1DA1F2" />
              </View>
              <Text style={styles.quickActionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.menuContainer}>
            <MenuItem
              icon="heart-outline"
              title="My Favorites"
              subtitle="View saved cars"
              onPress={() => handleMenuPress('favorites')}
              showBadge
              badgeText="3"
            />
            <MenuItem
              icon="call-outline"
              title="Contact Us"
              subtitle="Get in touch"
              onPress={() => handleMenuPress('contact')}
            />
            <MenuItem
              icon="star-outline"
              title="Rate App"
              subtitle="Share your feedback"
              onPress={() => handleMenuPress('rate')}
            />
            <MenuItem
              icon="share-social-outline"
              title="Share App"
              subtitle="Tell your friends"
              onPress={() => handleMenuPress('share')}
            />
          </View>
        </View>

        {/* Legal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          <View style={styles.menuContainer}>
            <MenuItem
              icon="document-text-outline"
              title="Privacy Policy"
              onPress={() => handleMenuPress('privacy')}
            />
            <MenuItem
              icon="shield-checkmark-outline"
              title="Terms of Service"
              onPress={() => handleMenuPress('terms')}
            />
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <View style={styles.appLogo}>
            <Ionicons name="car-sport" size={32} color={COLORS.primary} />
          </View>
          <Text style={styles.appName}>CS Motors</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appCopyright}>© 2024 CS Motors. All rights reserved.</Text>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
  },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '800',
  },
  profileSection: {
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.paddingLarge,
  },
  profileCard: {
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.paddingLarge,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  guestTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  guestSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.border,
  },
  section: {
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.paddingLarge,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    alignItems: 'center',
    width: '22%',
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  menuContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: {
    flex: 1,
    marginLeft: 14,
  },
  menuTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
  },
  menuSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: '700',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: SIZES.paddingLarge,
  },
  appLogo: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  appName: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  appVersion: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },
  appCopyright: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: 8,
  },
  bottomSpacer: {
    height: 100,
  },
});

export default ProfileScreen;
