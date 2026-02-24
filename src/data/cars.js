// Car Shop Inventory - Complete Pakistan Market Cars 2024
// All popular cars available in Pakistan with real prices

export const CARS = [
  // ───────────────────── SUZUKI ─────────────────────
  {
    id: '1',
    name: 'Suzuki Jimny JLSX AT',
    brand: 'Suzuki',
    year: 2024,
    price: 7999000,
    color: 'Kinetic Yellow',
    mileage: '0 KM',
    fuelType: 'Petrol',
    transmission: '4-Speed Automatic',
    engine: '1462cc',
    location: 'Lahore',
    image: require('../../assets/cars/jimmy.png'),
  },
  {
    id: '2',
    name: 'Suzuki Wagon R VXL AGS',
    brand: 'Suzuki',
    year: 2024,
    price: 3299000,
    color: 'Pearl White',
    mileage: '0 KM',
    fuelType: 'Petrol',
    transmission: 'AGS Automatic',
    engine: '1000cc',
    location: 'Lahore',
    image: require('../../assets/cars/wagonR.png'),
  },
  {
    id: '3',
    name: 'Suzuki Mehran VXR',
    brand: 'Suzuki',
    year: 2019,
    price: 1150000,
    color: 'White',
    mileage: '45000 KM',
    fuelType: 'Petrol',
    transmission: 'Manual',
    engine: '800cc',
    location: 'Islamabad',
    image: require('../../assets/cars/mehran.png'),
  },
  {
    id: '4',
    name: 'Suzuki Every Join',
    brand: 'Suzuki',
    year: 2024,
    price: 3850000,
    color: 'White',
    mileage: '0 KM',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '660cc',
    location: 'Lahore',
    image: require('../../assets/cars/every.jpg'),
  },
  {
    id: '5',
    name: 'Suzuki APV GLX',
    brand: 'Suzuki',
    year: 2024,
    price: 4599000,
    color: 'Silver',
    mileage: '0 KM',
    fuelType: 'Petrol',
    transmission: 'Manual',
    engine: '1600cc',
    location: 'Lahore',
    image: require('../../assets/cars/suzukiAPV.png'),
  },
  {
    id: '6',
    name: 'Suzuki Cultus VXL AGS',
    brand: 'Suzuki',
    year: 2024,
    price: 3249000,
    color: 'Graphite Gray',
    mileage: '0 KM',
    fuelType: 'Petrol',
    transmission: 'AGS Automatic',
    engine: '1000cc',
    location: 'Lahore',
    image: require('../../assets/cars/Suzuki-Cultus-Pakistan-June-2021.webp'),
  },
  {
    id: '7',
    name: 'Premium Sedan',
    brand: 'Premium',
    year: 2024,
    price: 5500000,
    color: 'Black',
    mileage: '0 KM',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '1800cc',
    location: 'Islamabad',
    image: require('../../assets/cars/car_2.jpg'),
  },
];

// Shop Info
export const SHOP_INFO = {
  name: 'Capital Smart Motors',
  fullName: 'CAPITAL SMART MOTORS (PRIVATE) LIMITED',
  address: '13-H, Gulberg II, Lahore, 54000 Pakistan',
  phone: '+92 300 1234567',
  whatsapp: '+923001234567',
  email: 'info@csmotors.pk',
  mapLink: 'https://maps.google.com/?q=13-H+Gulberg+II+Lahore+Pakistan',
};

// Get unique brands for filtering
export const BRANDS = [...new Set(CARS.map(car => car.brand))];

// Get unique locations
export const LOCATIONS = [...new Set(CARS.map(car => car.location))];

export const formatPrice = (price) => {
  if (price >= 10000000) {
    return `PKR ${(price / 10000000).toFixed(1)} Crore`;
  } else if (price >= 100000) {
    return `PKR ${(price / 100000).toFixed(1)} Lac`;
  }
  return `PKR ${price.toLocaleString()}`;
};
