import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/colors';
import { CARS, BRANDS } from '../data/cars';
import CarListCard from '../components/CarListCard';
import SearchBar from '../components/SearchBar';

const FUEL_TYPES = ['All', 'Petrol', 'Diesel', 'Hybrid', 'Electric'];
const TRANSMISSIONS = ['All', 'Automatic', 'Manual', 'CVT'];
const SORT_OPTIONS = [
  { id: 'default', label: 'Default' },
  { id: 'price_low', label: 'Price: Low to High' },
  { id: 'price_high', label: 'Price: High to Low' },
  { id: 'year_new', label: 'Year: Newest First' },
  { id: 'year_old', label: 'Year: Oldest First' },
];

const InventoryScreen = ({ navigation, route }) => {
  const initialBrand = route?.params?.selectedBrand || null;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedFuel, setSelectedFuel] = useState('All');
  const [selectedTransmission, setSelectedTransmission] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [favorites, setFavorites] = useState([]);

  const filteredCars = useMemo(() => {
    let result = [...CARS];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (car) =>
          car.name.toLowerCase().includes(query) ||
          car.brand.toLowerCase().includes(query) ||
          car.model.toLowerCase().includes(query)
      );
    }

    // Brand filter
    if (selectedBrand) {
      result = result.filter((car) => car.brand === selectedBrand);
    }

    // Fuel type filter
    if (selectedFuel !== 'All') {
      result = result.filter((car) => car.fuelType === selectedFuel);
    }

    // Transmission filter
    if (selectedTransmission !== 'All') {
      result = result.filter((car) => car.transmission === selectedTransmission);
    }

    // Sorting
    switch (sortBy) {
      case 'price_low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'year_new':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'year_old':
        result.sort((a, b) => a.year - b.year);
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedBrand, selectedFuel, selectedTransmission, sortBy]);

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

  const handleClearFilters = useCallback(() => {
    setSelectedBrand(null);
    setSelectedFuel('All');
    setSelectedTransmission('All');
    setSortBy('default');
  }, []);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedBrand) count++;
    if (selectedFuel !== 'All') count++;
    if (selectedTransmission !== 'All') count++;
    if (sortBy !== 'default') count++;
    return count;
  }, [selectedBrand, selectedFuel, selectedTransmission, sortBy]);

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
      <Ionicons name="car-outline" size={64} color={COLORS.textMuted} />
      <Text style={styles.emptyTitle}>No Cars Found</Text>
      <Text style={styles.emptyText}>Try adjusting your filters or search</Text>
      <TouchableOpacity
        style={styles.clearButton}
        onPress={handleClearFilters}
        accessible={true}
        accessibilityLabel="Clear all filters"
        accessibilityRole="button"
      >
        <Text style={styles.clearButtonText}>Clear Filters</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFilterChip = (label, isActive, onPress) => (
    <TouchableOpacity
      style={[styles.filterChip, isActive && styles.filterChipActive]}
      onPress={onPress}
      accessible={true}
      accessibilityLabel={`Filter by ${label}`}
      accessibilityRole="button"
    >
      <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Inventory</Text>
        <View style={styles.headerRight}>
          <Text style={styles.countText}>{filteredCars.length} Cars</Text>
        </View>
      </View>

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search by name, brand..."
        onFilterPress={() => setShowFilter(true)}
      />

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <View style={styles.activeFilters}>
          <Text style={styles.activeFiltersText}>
            {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
          </Text>
          <TouchableOpacity 
            onPress={handleClearFilters}
            accessible={true}
            accessibilityLabel="Clear all filters"
            accessibilityRole="button"
          >
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Car List */}
      <FlatList
        data={filteredCars}
        renderItem={renderCarItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyList}
      />

      {/* Filter Modal */}
      <Modal
        visible={showFilter}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilter(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity
                onPress={() => setShowFilter(false)}
                accessible={true}
                accessibilityLabel="Close filters"
                accessibilityRole="button"
              >
                <Ionicons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            {/* Brand Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Brand</Text>
              <View style={styles.filterChips}>
                {renderFilterChip('All', !selectedBrand, () => setSelectedBrand(null))}
                {BRANDS.map((brand) =>
                  renderFilterChip(brand.name, selectedBrand === brand.name, () =>
                    setSelectedBrand(brand.name)
                  )
                )}
              </View>
            </View>

            {/* Fuel Type Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Fuel Type</Text>
              <View style={styles.filterChips}>
                {FUEL_TYPES.map((fuel) =>
                  renderFilterChip(fuel, selectedFuel === fuel, () =>
                    setSelectedFuel(fuel)
                  )
                )}
              </View>
            </View>

            {/* Transmission Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Transmission</Text>
              <View style={styles.filterChips}>
                {TRANSMISSIONS.map((trans) =>
                  renderFilterChip(trans, selectedTransmission === trans, () =>
                    setSelectedTransmission(trans)
                  )
                )}
              </View>
            </View>

            {/* Sort By */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Sort By</Text>
              <View style={styles.filterChips}>
                {SORT_OPTIONS.map((option) =>
                  renderFilterChip(option.label, sortBy === option.id, () =>
                    setSortBy(option.id)
                  )
                )}
              </View>
            </View>

            {/* Apply Button */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleClearFilters}
                accessible={true}
                accessibilityLabel="Reset filters"
                accessibilityRole="button"
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setShowFilter(false)}
                accessible={true}
                accessibilityLabel="Apply filters"
                accessibilityRole="button"
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  activeFilters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: 8,
    backgroundColor: COLORS.surface,
    marginHorizontal: SIZES.padding,
    borderRadius: SIZES.radiusSmall,
    marginBottom: SIZES.paddingSmall,
  },
  activeFiltersText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  clearText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  listContent: {
    paddingTop: SIZES.paddingSmall,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 16,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 8,
  },
  clearButton: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
  },
  clearButtonText: {
    color: COLORS.background,
    fontSize: 14,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '700',
  },
  filterSection: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.paddingSmall,
  },
  filterLabel: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterChipText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  filterChipTextActive: {
    color: COLORS.background,
    fontWeight: '600',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: SIZES.padding,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: SIZES.padding,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  resetButtonText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
  },
  applyButton: {
    flex: 2,
    paddingVertical: 16,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  applyButtonText: {
    color: COLORS.background,
    fontSize: 15,
    fontWeight: '700',
  },
});

export default InventoryScreen;
