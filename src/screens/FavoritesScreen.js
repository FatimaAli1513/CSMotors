import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/colors';
import { CARS } from '../data/cars';
import CarListCard from '../components/CarListCard';

const FavoritesScreen = ({ navigation }) => {
  // For demo purposes, showing some sample favorites
  const [favorites, setFavorites] = useState(['1', '3', '5']);
  
  const favoriteCars = CARS.filter((car) => favorites.includes(car.id));

  const handleToggleFavorite = useCallback((carId) => {
    setFavorites((prev) =>
      prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId]
    );
  }, []);

  const handleCarPress = useCallback((car) => {
    navigation.navigate('CarDetails', { car });
  }, [navigation]);

  const handleBrowsePress = useCallback(() => {
    navigation.navigate('Inventory');
  }, [navigation]);

  const renderCarItem = useCallback(({ item }) => (
    <CarListCard
      car={item}
      onPress={() => handleCarPress(item)}
      onFavoritePress={() => handleToggleFavorite(item.id)}
      isFavorite={favorites.includes(item.id)}
    />
  ), [favorites, handleCarPress, handleToggleFavorite]);

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="heart-outline" size={64} color={COLORS.textMuted} />
      </View>
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptyText}>
        Start adding cars to your favorites by tapping the heart icon
      </Text>
      <TouchableOpacity
        style={styles.browseButton}
        onPress={handleBrowsePress}
        accessible={true}
        accessibilityLabel="Browse inventory"
        accessibilityRole="button"
      >
        <Text style={styles.browseButtonText}>Browse Cars</Text>
        <Ionicons name="arrow-forward" size={18} color={COLORS.background} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <View style={styles.headerRight}>
          <Text style={styles.countText}>{favoriteCars.length} Cars</Text>
        </View>
      </View>

      {/* Favorites List */}
      <FlatList
        data={favoriteCars}
        renderItem={renderCarItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyList}
      />
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
    paddingVertical: SIZES.padding,
  },
  title: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '800',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  listContent: {
    paddingTop: SIZES.paddingSmall,
    paddingBottom: 100,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.paddingLarge,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.surface,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  browseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 30,
  },
  browseButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default FavoritesScreen;
