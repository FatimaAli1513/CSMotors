import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
  Linking,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../constants/colors';
import { formatPrice } from '../data/cars';

const { width } = Dimensions.get('window');

const CarDetailsScreen = ({ navigation, route }) => {
  const { car } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = useCallback(() => {
    setIsFavorite((prev) => !prev);
  }, []);

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        message: `Check out this ${car.name} at CS Motors! Price: ${formatPrice(car.price)}`,
        title: car.name,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  }, [car]);

  const handleCall = useCallback(() => {
    Linking.openURL('tel:+923001234567');
  }, []);

  const handleWhatsApp = useCallback(() => {
    const message = encodeURIComponent(`Hi, I'm interested in the ${car.name} (${car.year}). Is it still available?`);
    Linking.openURL(`whatsapp://send?phone=923001234567&text=${message}`);
  }, [car]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return COLORS.success;
      case 'sold':
        return COLORS.accent;
      case 'reserved':
        return COLORS.warning;
      default:
        return COLORS.textMuted;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available':
        return 'Available Now';
      case 'sold':
        return 'Sold Out';
      case 'reserved':
        return 'Reserved';
      default:
        return status;
    }
  };

  const SpecItem = ({ icon, label, value }) => (
    <View style={styles.specItem}>
      <View style={styles.specIconContainer}>
        <Ionicons name={icon} size={20} color={COLORS.primary} />
      </View>
      <Text style={styles.specLabel}>{label}</Text>
      <Text style={styles.specValue}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: car.image }}
            style={styles.carImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.8)']}
            style={styles.imageGradient}
          />
          
          {/* Back Button */}
          <SafeAreaView style={styles.headerButtons} edges={['top']}>
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => navigation.goBack()}
              accessible={true}
              accessibilityLabel="Go back"
              accessibilityRole="button"
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.headerBtn}
                onPress={handleShare}
                accessible={true}
                accessibilityLabel="Share car"
                accessibilityRole="button"
              >
                <Ionicons name="share-outline" size={24} color={COLORS.text} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerBtn}
                onPress={handleToggleFavorite}
                accessible={true}
                accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                accessibilityRole="button"
              >
                <Ionicons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={24}
                  color={isFavorite ? COLORS.accent : COLORS.text}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          {/* Status Badge */}
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(car.status) }]}>
            <Text style={styles.statusText}>{getStatusText(car.status)}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <View style={styles.brandYearRow}>
              <Text style={styles.brand}>{car.brand}</Text>
              <Text style={styles.year}>{car.year}</Text>
            </View>
            <Text style={styles.name}>{car.name}</Text>
            <Text style={styles.model}>{car.model}</Text>
          </View>

          {/* Price Section */}
          <View style={styles.priceSection}>
            <View>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.price}>{formatPrice(car.price)}</Text>
            </View>
            {car.mileage > 0 && (
              <View style={styles.mileageContainer}>
                <Ionicons name="speedometer-outline" size={16} color={COLORS.textSecondary} />
                <Text style={styles.mileage}>{car.mileage.toLocaleString()} km</Text>
              </View>
            )}
          </View>

          {/* Specifications Grid */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            <View style={styles.specsGrid}>
              <SpecItem icon="hardware-chip-outline" label="Engine" value={car.engine} />
              <SpecItem icon="flash-outline" label="Power" value={`${car.horsepower} HP`} />
              <SpecItem icon="cog-outline" label="Transmission" value={car.transmission} />
              <SpecItem icon="water-outline" label="Fuel Type" value={car.fuelType} />
              <SpecItem icon="color-palette-outline" label="Exterior" value={car.color} />
              <SpecItem icon="people-outline" label="Seats" value={`${car.seats} Seats`} />
            </View>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featuresGrid}>
              {car.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{car.description}</Text>
          </View>

          {/* Interior Color */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interior</Text>
            <View style={styles.interiorRow}>
              <View style={styles.interiorColor} />
              <Text style={styles.interiorText}>{car.interiorColor}</Text>
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPrice}>
          <Text style={styles.bottomPriceLabel}>Total Price</Text>
          <Text style={styles.bottomPriceValue}>{formatPrice(car.price)}</Text>
        </View>
        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={styles.callButton}
            onPress={handleCall}
            accessible={true}
            accessibilityLabel="Call dealer"
            accessibilityRole="button"
          >
            <Ionicons name="call" size={22} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.whatsappButton}
            onPress={handleWhatsApp}
            accessible={true}
            accessibilityLabel="Message on WhatsApp"
            accessibilityRole="button"
          >
            <Ionicons name="logo-whatsapp" size={22} color={COLORS.text} />
            <Text style={styles.whatsappText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  imageContainer: {
    width: width,
    height: 320,
    position: 'relative',
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerButtons: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding,
  },
  headerBtn: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  statusBadge: {
    position: 'absolute',
    bottom: 20,
    left: SIZES.padding,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '700',
  },
  content: {
    backgroundColor: COLORS.background,
    marginTop: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: SIZES.paddingLarge,
    paddingHorizontal: SIZES.padding,
  },
  titleSection: {
    marginBottom: SIZES.padding,
  },
  brandYearRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  brand: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  year: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  name: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: '800',
    marginTop: 4,
  },
  model: {
    color: COLORS.textSecondary,
    fontSize: 16,
    marginTop: 4,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.paddingLarge,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  priceLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  price: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: '800',
  },
  mileageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  mileage: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  section: {
    marginBottom: SIZES.paddingLarge,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  specItem: {
    width: '47%',
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  specIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  specLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  specValue: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
  },
  featuresGrid: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: SIZES.radiusSmall,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  featureText: {
    color: COLORS.text,
    fontSize: 14,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 24,
  },
  interiorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  interiorColor: {
    width: 24,
    height: 24,
    backgroundColor: '#2D2D2D',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  interiorText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 100,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SIZES.padding,
    paddingVertical: 16,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  bottomPrice: {
    flex: 1,
  },
  bottomPriceLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  bottomPriceValue: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: '800',
  },
  bottomActions: {
    flexDirection: 'row',
    gap: 12,
  },
  callButton: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#25D366',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 25,
  },
  whatsappText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '700',
  },
});

export default CarDetailsScreen;
