import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { COLORS, SIZES } from '../constants/colors';
import { BRANDS } from '../data/cars';

const BrandFilter = ({ selectedBrand, onSelectBrand }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Browse by Brand</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={[
            styles.brandItem,
            !selectedBrand && styles.brandItemActive,
          ]}
          onPress={() => onSelectBrand(null)}
          accessible={true}
          accessibilityLabel="Show all brands"
          accessibilityRole="button"
        >
          <Text style={styles.brandLogo}>🚗</Text>
          <Text style={[
            styles.brandName,
            !selectedBrand && styles.brandNameActive,
          ]}>All</Text>
        </TouchableOpacity>
        
        {BRANDS.map((brand) => (
          <TouchableOpacity
            key={brand.id}
            style={[
              styles.brandItem,
              selectedBrand === brand.name && styles.brandItemActive,
            ]}
            onPress={() => onSelectBrand(brand.name)}
            accessible={true}
            accessibilityLabel={`Filter by ${brand.name}`}
            accessibilityRole="button"
          >
            <Text style={styles.brandLogo}>{brand.logo}</Text>
            <Text style={[
              styles.brandName,
              selectedBrand === brand.name && styles.brandNameActive,
            ]} numberOfLines={1}>{brand.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SIZES.padding,
  },
  title: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    paddingHorizontal: SIZES.padding,
  },
  scrollContent: {
    paddingHorizontal: SIZES.padding,
    gap: 10,
  },
  brandItem: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: 80,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  brandItemActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  brandLogo: {
    fontSize: 24,
    marginBottom: 4,
  },
  brandName: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  brandNameActive: {
    color: COLORS.background,
  },
});

export default BrandFilter;
