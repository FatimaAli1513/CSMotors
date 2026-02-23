import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/colors';
import { formatPrice } from '../data/cars';

const CarListCard = ({ car, onPress, onFavoritePress, isFavorite = false }) => {
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

  return (
    <TouchableOpacity
      style={styles.container}
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
        <View style={[styles.statusDot, { backgroundColor: getStatusColor(car.status) }]} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.brand}>{car.brand}</Text>
          <TouchableOpacity
            onPress={onFavoritePress}
            accessible={true}
            accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            accessibilityRole="button"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={20}
              color={isFavorite ? COLORS.accent : COLORS.textMuted}
            />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.name} numberOfLines={1}>{car.name}</Text>
        
        <View style={styles.specs}>
          <Text style={styles.specText}>{car.year}</Text>
          <View style={styles.dot} />
          <Text style={styles.specText}>{car.fuelType}</Text>
          <View style={styles.dot} />
          <Text style={styles.specText}>{car.mileage.toLocaleString()} km</Text>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(car.price)}</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.paddingSmall,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    width: 120,
    height: 110,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  statusDot: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  name: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  specs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  specText: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: COLORS.textMuted,
    marginHorizontal: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '800',
  },
});

export default CarListCard;
