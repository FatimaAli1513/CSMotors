import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../constants/colors';
import { formatPrice } from '../data/cars';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

const CarCard = ({ car, onPress, onFavoritePress, isFavorite = false, style }) => {
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
        return 'Available';
      case 'sold':
        return 'Sold';
      case 'reserved':
        return 'Reserved';
      default:
        return status;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.9}
      accessible={true}
      accessibilityLabel={`View ${car.name} details`}
      accessibilityRole="button"
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: car.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />
        
        {/* Status Badge */}
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(car.status) }]}>
          <Text style={styles.statusText}>{getStatusText(car.status)}</Text>
        </View>
        
        {/* Favorite Button */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onFavoritePress}
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
        
        {/* Featured Badge */}
        {car.featured && (
          <View style={styles.featuredBadge}>
            <Ionicons name="star" size={12} color={COLORS.background} />
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.brand}>{car.brand}</Text>
          <Text style={styles.year}>{car.year}</Text>
        </View>
        
        <Text style={styles.name} numberOfLines={1}>{car.name}</Text>
        
        <View style={styles.specs}>
          <View style={styles.specItem}>
            <Ionicons name="speedometer-outline" size={14} color={COLORS.textSecondary} />
            <Text style={styles.specText}>{car.horsepower} HP</Text>
          </View>
          <View style={styles.specItem}>
            <Ionicons name="water-outline" size={14} color={COLORS.textSecondary} />
            <Text style={styles.specText}>{car.fuelType}</Text>
          </View>
          <View style={styles.specItem}>
            <Ionicons name="cog-outline" size={14} color={COLORS.textSecondary} />
            <Text style={styles.specText}>{car.transmission}</Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(car.price)}</Text>
          <View style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View Details</Text>
            <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLarge,
    marginRight: SIZES.padding,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  imageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  statusBadge: {
    position: 'absolute',
    top: SIZES.padding,
    left: SIZES.padding,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  favoriteButton: {
    position: 'absolute',
    top: SIZES.padding,
    right: SIZES.padding,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredBadge: {
    position: 'absolute',
    bottom: SIZES.padding,
    left: SIZES.padding,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  featuredText: {
    color: COLORS.background,
    fontSize: 11,
    fontWeight: '700',
  },
  content: {
    padding: SIZES.padding,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  brand: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  year: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  name: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  specs: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  specText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  price: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewButtonText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },
});

export default CarCard;
