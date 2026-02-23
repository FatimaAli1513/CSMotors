import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../constants/colors';
import { CARS } from '../data/cars';
import CarCard from '../components/CarCard';
import BrandFilter from '../components/BrandFilter';

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const featuredCars = CARS.filter((car) => car.featured);
  const latestCars = CARS.filter((car) => car.status === 'available').slice(0, 4);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const handleToggleFavorite = useCallback((carId) => {
    setFavorites((prev) =>
      prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId]
    );
  }, []);

  const handleCarPress = useCallback((car) => {
    navigation.navigate('CarDetails', { car, favorites, setFavorites: handleToggleFavorite });
  }, [navigation, favorites, handleToggleFavorite]);

  const handleBrandSelect = useCallback((brand) => {
    setSelectedBrand(brand);
    navigation.navigate('Inventory', { selectedBrand: brand });
  }, [navigation]);

  const handleViewAllPress = useCallback(() => {
    navigation.navigate('Inventory');
  }, [navigation]);

  const renderFeaturedCar = useCallback(({ item }) => (
    <CarCard
      car={item}
      onPress={() => handleCarPress(item)}
      onFavoritePress={() => handleToggleFavorite(item.id)}
      isFavorite={favorites.includes(item.id)}
    />
  ), [favorites, handleCarPress, handleToggleFavorite]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome to</Text>
          <Text style={styles.title}>CS Motors</Text>
        </View>
        <TouchableOpacity
          style={styles.notificationBtn}
          accessible={true}
          accessibilityLabel="Notifications"
          accessibilityRole="button"
        >
          <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
      >
        {/* Hero Banner */}
        <TouchableOpacity 
          style={styles.heroBanner}
          onPress={handleViewAllPress}
          activeOpacity={0.9}
          accessible={true}
          accessibilityLabel="Browse our collection of luxury cars"
          accessibilityRole="button"
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Find Your{'\n'}Dream Car</Text>
              <Text style={styles.heroSubtitle}>Premium selection of luxury vehicles</Text>
              <View style={styles.heroButton}>
                <Text style={styles.heroButtonText}>Browse Collection</Text>
                <Ionicons name="arrow-forward" size={18} color={COLORS.background} />
              </View>
            </View>
            <View style={styles.heroDecor}>
              <Ionicons name="car-sport" size={100} color="rgba(255,255,255,0.15)" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{CARS.length}+</Text>
            <Text style={styles.statLabel}>Total Cars</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{CARS.filter(c => c.status === 'available').length}</Text>
            <Text style={styles.statLabel}>Available</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>7+</Text>
            <Text style={styles.statLabel}>Brands</Text>
          </View>
        </View>

        {/* Brand Filter */}
        <BrandFilter
          selectedBrand={selectedBrand}
          onSelectBrand={handleBrandSelect}
        />

        {/* Featured Cars */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Cars</Text>
            <TouchableOpacity 
              onPress={handleViewAllPress}
              accessible={true}
              accessibilityLabel="View all featured cars"
              accessibilityRole="button"
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={featuredCars}
            renderItem={renderFeaturedCar}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          />
        </View>

        {/* Latest Arrivals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest Arrivals</Text>
            <TouchableOpacity 
              onPress={handleViewAllPress}
              accessible={true}
              accessibilityLabel="View all latest arrivals"
              accessibilityRole="button"
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.latestGrid}>
            {latestCars.map((car) => (
              <TouchableOpacity
                key={car.id}
                style={styles.latestCard}
                onPress={() => handleCarPress(car)}
                activeOpacity={0.9}
                accessible={true}
                accessibilityLabel={`View ${car.name}`}
                accessibilityRole="button"
              >
                <View style={styles.latestImagePlaceholder}>
                  <Ionicons name="car-sport-outline" size={32} color={COLORS.primary} />
                </View>
                <Text style={styles.latestBrand}>{car.brand}</Text>
                <Text style={styles.latestName} numberOfLines={1}>{car.model}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Contact Banner */}
        <TouchableOpacity 
          style={styles.contactBanner}
          onPress={() => navigation.navigate('ContactTab')}
          activeOpacity={0.9}
          accessible={true}
          accessibilityLabel="Contact us for inquiries"
          accessibilityRole="button"
        >
          <LinearGradient
            colors={[COLORS.surfaceLight, COLORS.surface]}
            style={styles.contactGradient}
          >
            <View style={styles.contactIcon}>
              <Ionicons name="call" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.contactContent}>
              <Text style={styles.contactTitle}>Need Assistance?</Text>
              <Text style={styles.contactSubtitle}>Our team is here to help you</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={COLORS.textMuted} />
          </LinearGradient>
        </TouchableOpacity>

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.paddingSmall,
  },
  greeting: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  title: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    backgroundColor: COLORS.accent,
    borderRadius: 4,
  },
  heroBanner: {
    marginHorizontal: SIZES.padding,
    marginTop: SIZES.padding,
    borderRadius: SIZES.radiusLarge,
    overflow: 'hidden',
  },
  heroGradient: {
    padding: SIZES.paddingLarge,
    minHeight: 160,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
  },
  heroTitle: {
    color: COLORS.background,
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 32,
  },
  heroSubtitle: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 13,
    marginTop: 8,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 16,
    gap: 6,
  },
  heroButtonText: {
    color: COLORS.background,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  heroDecor: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: SIZES.padding,
    marginTop: SIZES.padding,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: '800',
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
  },
  section: {
    marginTop: SIZES.paddingLarge,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    marginBottom: 12,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
  },
  viewAllText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  featuredList: {
    paddingHorizontal: SIZES.padding,
  },
  latestGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SIZES.padding,
    gap: 12,
  },
  latestCard: {
    width: '47%',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  latestImagePlaceholder: {
    width: '100%',
    height: 80,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: SIZES.radiusSmall,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  latestBrand: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  latestName: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  contactBanner: {
    marginHorizontal: SIZES.padding,
    marginTop: SIZES.paddingLarge,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  contactGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
  },
  contactIcon: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactContent: {
    flex: 1,
    marginLeft: 12,
  },
  contactTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },
  contactSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  bottomSpacer: {
    height: 100,
  },
});

export default HomeScreen;
