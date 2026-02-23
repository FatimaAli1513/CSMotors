import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { CARS, SHOP_INFO, formatPrice } from '../data/cars';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.shopName}>{SHOP_INFO.name}</Text>
          <Text style={styles.tagline}>Premium Car Shop</Text>
        </View>
        <View style={styles.logo}>
          <Ionicons name="car-sport" size={28} color={COLORS.primary} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Shop Address Card */}
        <TouchableOpacity 
          style={styles.addressCard}
          onPress={() => navigation.navigate('ContactTab')}
        >
          <Ionicons name="location" size={24} color={COLORS.primary} />
          <View style={styles.addressInfo}>
            <Text style={styles.addressTitle}>Visit Our Shop</Text>
            <Text style={styles.addressText}>{SHOP_INFO.address}</Text>
            <Text style={styles.timing}>{SHOP_INFO.timing}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>

        {/* Cars Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Cars</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CarsTab')}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        
        {CARS.slice(0, 4).map((car) => (
          <TouchableOpacity
            key={car.id}
            style={styles.carCard}
            onPress={() => navigation.navigate('CarDetails', { car })}
          >
            <Image source={{ uri: car.image }} style={styles.carImage} />
            <View style={styles.carInfo}>
              <Text style={styles.carBrand}>{car.brand}</Text>
              <Text style={styles.carName}>{car.name}</Text>
              <Text style={styles.carYear}>{car.year} • {car.color}</Text>
              <Text style={styles.carPrice}>{formatPrice(car.price)}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Bottom Info */}
        <View style={styles.bottomInfo}>
          <Ionicons name="storefront-outline" size={40} color={COLORS.textSecondary} />
          <Text style={styles.bottomText}>Visit our shop to purchase</Text>
          <Text style={styles.bottomAddress}>{SHOP_INFO.address}</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  shopName: {
    color: COLORS.primary,
    fontSize: 26,
    fontWeight: 'bold',
  },
  tagline: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  logo: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.surface,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  addressInfo: {
    flex: 1,
    marginLeft: 12,
  },
  addressTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: 'bold',
  },
  addressText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  timing: {
    color: COLORS.primary,
    fontSize: 12,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  carCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  carImage: {
    width: 120,
    height: 90,
  },
  carInfo: {
    flex: 1,
    padding: 12,
  },
  carBrand: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '600',
  },
  carName: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
  },
  carYear: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  carPrice: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 6,
  },
  bottomInfo: {
    alignItems: 'center',
    padding: 30,
    marginTop: 10,
  },
  bottomText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  bottomAddress: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
});

export default HomeScreen;
