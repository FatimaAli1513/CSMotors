import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { CARS, formatPrice } from '../data/cars';

const CarsScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const filteredCars = CARS.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase()) ||
    car.brand.toLowerCase().includes(search.toLowerCase())
  );

  const renderCar = ({ item }) => (
    <TouchableOpacity
      style={styles.carCard}
      onPress={() => navigation.navigate('CarDetails', { car: item })}
    >
      <Image source={item.image} style={styles.carImage} resizeMode="cover" />
      <View style={styles.carOverlay}>
        <Text style={styles.carPrice}>{formatPrice(item.price)}</Text>
      </View>
      <View style={styles.carInfo}>
        <Text style={styles.carBrand}>{item.brand} • {item.year}</Text>
        <Text style={styles.carName}>{item.name}</Text>
        <View style={styles.carSpecs}>
          <Text style={styles.specText}>{item.color}</Text>
          <Text style={styles.specDot}>•</Text>
          <Text style={styles.specText}>{item.mileage}</Text>
          <Text style={styles.specDot}>•</Text>
          <Text style={styles.specText}>{item.fuelType}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Our Cars</Text>
          <Text style={styles.subtitle}>{filteredCars.length} cars available</Text>
        </View>
        <Image 
          source={require('../../assets/icon.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or brand..."
          placeholderTextColor={COLORS.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Car List */}
      <FlatList
        data={filteredCars}
        renderItem={renderCar}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="car-outline" size={60} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>No cars found</Text>
          </View>
        }
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
    padding: 20,
    paddingBottom: 10,
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
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 48,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: 15,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  carCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  carImage: {
    width: '100%',
    height: 180,
  },
  carOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  carPrice: {
    color: COLORS.background,
    fontSize: 13,
    fontWeight: 'bold',
  },
  carInfo: {
    padding: 16,
  },
  carBrand: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  carName: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  carSpecs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  specText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  specDot: {
    color: COLORS.textSecondary,
    marginHorizontal: 8,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    marginTop: 12,
  },
});

export default CarsScreen;
