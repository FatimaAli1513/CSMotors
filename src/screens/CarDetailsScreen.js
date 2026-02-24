import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Linking,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { SHOP_INFO, formatPrice } from '../data/cars';

const { width } = Dimensions.get('window');

const CarDetailsScreen = ({ navigation, route }) => {
  const { car } = route.params;

  const handleGetDirections = () => {
    Linking.openURL(SHOP_INFO.mapLink);
  };

  const handleCall = () => {
    Linking.openURL(`tel:${SHOP_INFO.phone}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Image */}
      <Image source={car.image} style={styles.image} resizeMode="contain" />
      
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={COLORS.text} />
      </TouchableOpacity>

      {/* Price Badge */}
      <View style={styles.priceBadge}>
        <Text style={styles.priceText}>{formatPrice(car.price)}</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.brand}>{car.brand} • {car.year}</Text>
        <Text style={styles.name}>{car.name}</Text>

        {/* Specs Grid */}
        <View style={styles.specsGrid}>
          <View style={styles.specItem}>
            <Ionicons name="color-palette-outline" size={20} color={COLORS.primary} />
            <Text style={styles.specLabel}>Color</Text>
            <Text style={styles.specValue}>{car.color}</Text>
          </View>
          <View style={styles.specItem}>
            <Ionicons name="speedometer-outline" size={20} color={COLORS.primary} />
            <Text style={styles.specLabel}>Mileage</Text>
            <Text style={styles.specValue}>{car.mileage}</Text>
          </View>
          <View style={styles.specItem}>
            <Ionicons name="water-outline" size={20} color={COLORS.primary} />
            <Text style={styles.specLabel}>Fuel</Text>
            <Text style={styles.specValue}>{car.fuelType}</Text>
          </View>
          <View style={styles.specItem}>
            <Ionicons name="cog-outline" size={20} color={COLORS.primary} />
            <Text style={styles.specLabel}>Transmission</Text>
            <Text style={styles.specValue}>{car.transmission}</Text>
          </View>
          <View style={styles.specItem}>
            <Ionicons name="hardware-chip-outline" size={20} color={COLORS.primary} />
            <Text style={styles.specLabel}>Engine</Text>
            <Text style={styles.specValue}>{car.engine}</Text>
          </View>
          <View style={styles.specItem}>
            <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
            <Text style={styles.specLabel}>Year</Text>
            <Text style={styles.specValue}>{car.year}</Text>
          </View>
        </View>

        {/* Purchase Info */}
        <View style={styles.purchaseCard}>
          <View style={styles.purchaseHeader}>
            <Ionicons name="storefront" size={24} color={COLORS.primary} />
            <Text style={styles.purchaseTitle}>Want to Buy?</Text>
          </View>
          <Text style={styles.purchaseText}>
            Visit our shop to see this car in person and make your purchase.
          </Text>
          
          <View style={styles.shopDetails}>
            <View style={styles.shopRow}>
              <Ionicons name="location-outline" size={18} color={COLORS.textSecondary} />
              <Text style={styles.shopText}>{SHOP_INFO.address}</Text>
            </View>
            <View style={styles.shopRow}>
              <Ionicons name="time-outline" size={18} color={COLORS.textSecondary} />
              <Text style={styles.shopText}>{SHOP_INFO.timing}</Text>
            </View>
            <View style={styles.shopRow}>
              <Ionicons name="call-outline" size={18} color={COLORS.textSecondary} />
              <Text style={styles.shopText}>{SHOP_INFO.phone}</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
          <Ionicons name="call" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.directionsBtn} onPress={handleGetDirections}>
          <Ionicons name="navigate" size={22} color={COLORS.background} />
          <Text style={styles.directionsText}>Get Directions to Shop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  image: {
    width: width,
    height: 280,
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceBadge: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  priceText: {
    color: COLORS.background,
    fontSize: 15,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: -20,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  brand: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  name: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 4,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    gap: 10,
  },
  specItem: {
    width: '31%',
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  specLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 6,
  },
  specValue: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
  purchaseCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  purchaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  purchaseTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  purchaseText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  shopDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: 10,
  },
  shopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  shopText: {
    color: COLORS.text,
    fontSize: 13,
    flex: 1,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 36,
    backgroundColor: COLORS.surface,
    gap: 12,
  },
  callBtn: {
    width: 56,
    height: 56,
    backgroundColor: COLORS.background,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  directionsBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    gap: 10,
  },
  directionsText: {
    color: COLORS.background,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default CarDetailsScreen;
