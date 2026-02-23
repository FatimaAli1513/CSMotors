import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Linking,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { SHOP_INFO } from '../data/cars';

const ContactScreen = () => {
  const handleCall = () => {
    Linking.openURL(`tel:${SHOP_INFO.phone}`);
  };

  const handleGetDirections = () => {
    Linking.openURL(SHOP_INFO.mapLink);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Our Shop</Text>
          <Text style={styles.subtitle}>Visit us to purchase your dream car</Text>
        </View>

        {/* Shop Card */}
        <View style={styles.shopCard}>
          <View style={styles.logoCircle}>
            <Ionicons name="storefront" size={40} color={COLORS.primary} />
          </View>
          <Text style={styles.shopName}>{SHOP_INFO.name}</Text>
          <Text style={styles.shopTagline}>Premium Car Shop</Text>
        </View>

        {/* Address Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop Address</Text>
          <View style={styles.addressCard}>
            <Ionicons name="location" size={28} color={COLORS.primary} />
            <View style={styles.addressInfo}>
              <Text style={styles.addressText}>{SHOP_INFO.address}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.directionsBtn} onPress={handleGetDirections}>
            <Ionicons name="navigate" size={20} color={COLORS.background} />
            <Text style={styles.directionsBtnText}>Get Directions on Google Maps</Text>
          </TouchableOpacity>
        </View>

        {/* Timing Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Hours</Text>
          <View style={styles.timingCard}>
            <View style={styles.timingRow}>
              <Ionicons name="time" size={22} color={COLORS.primary} />
              <Text style={styles.timingText}>{SHOP_INFO.timing}</Text>
            </View>
            <View style={styles.timingRow}>
              <Ionicons name="close-circle" size={22} color="#EF4444" />
              <Text style={styles.timingText}>Sunday: Closed</Text>
            </View>
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Number</Text>
          <TouchableOpacity style={styles.phoneCard} onPress={handleCall}>
            <View style={styles.phoneIcon}>
              <Ionicons name="call" size={24} color={COLORS.text} />
            </View>
            <View style={styles.phoneInfo}>
              <Text style={styles.phoneNumber}>{SHOP_INFO.phone}</Text>
              <Text style={styles.phoneLabel}>Tap to call</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Info Note */}
        <View style={styles.infoNote}>
          <Ionicons name="information-circle" size={24} color={COLORS.primary} />
          <Text style={styles.infoText}>
            All purchases are made at our shop location. Please visit us during business hours to view and buy cars.
          </Text>
        </View>

        <View style={{ height: 100 }} />
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
    padding: 20,
  },
  title: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: 'bold',
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  shopCard: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: 20,
    padding: 30,
    borderRadius: 20,
    marginBottom: 20,
  },
  logoCircle: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.background,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  shopName: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  shopTagline: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  addressInfo: {
    flex: 1,
  },
  addressText: {
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 22,
  },
  directionsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    gap: 10,
  },
  directionsBtnText: {
    color: COLORS.background,
    fontSize: 15,
    fontWeight: 'bold',
  },
  timingCard: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  timingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timingText: {
    color: COLORS.text,
    fontSize: 15,
  },
  phoneCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
  },
  phoneIcon: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneInfo: {
    flex: 1,
    marginLeft: 14,
  },
  phoneNumber: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: 'bold',
  },
  phoneLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  infoNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(212,175,55,0.1)',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
});

export default ContactScreen;
