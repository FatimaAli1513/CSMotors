// Car Shop Inventory
export const CARS = [
  {
    id: '1',
    name: 'Mercedes-Benz S-Class',
    brand: 'Mercedes',
    year: 2024,
    price: 15500000,
    color: 'Black',
    mileage: '0 KM',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '3.0L V6',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
  },
  {
    id: '2',
    name: 'BMW 7 Series',
    brand: 'BMW',
    year: 2024,
    price: 14500000,
    color: 'White',
    mileage: '500 KM',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '3.0L Twin-Turbo',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
  },
  {
    id: '3',
    name: 'Toyota Land Cruiser',
    brand: 'Toyota',
    year: 2024,
    price: 18500000,
    color: 'White Pearl',
    mileage: '1000 KM',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    engine: '3.3L V6 Diesel',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
  },
  {
    id: '4',
    name: 'Honda Civic',
    brand: 'Honda',
    year: 2024,
    price: 7500000,
    color: 'Red',
    mileage: '0 KM',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '1.5L Turbo',
    image: 'https://images.unsplash.com/photo-1597404294360-feeeda04612e?w=800',
  },
  {
    id: '5',
    name: 'Toyota Corolla',
    brand: 'Toyota',
    year: 2024,
    price: 5500000,
    color: 'Silver',
    mileage: '0 KM',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '1.8L',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
  },
  {
    id: '6',
    name: 'Suzuki Alto',
    brand: 'Suzuki',
    year: 2024,
    price: 2800000,
    color: 'White',
    mileage: '0 KM',
    fuelType: 'Petrol',
    transmission: 'Manual',
    engine: '660cc',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800',
  },
];

// Shop Info
export const SHOP_INFO = {
  name: 'Capital Smart Motors',
  fullName: 'CAPITAL SMART MOTORS (PRIVATE) LIMITED',
  address: '13-H, Gulberg II, Lahore, 54000 Pakistan',
  phone: '+92 300 1234567',
  mapLink: 'https://maps.google.com/?q=13-H+Gulberg+II+Lahore+Pakistan',
};

export const formatPrice = (price) => {
  if (price >= 10000000) {
    return `Rs. ${(price / 10000000).toFixed(1)} Crore`;
  } else if (price >= 100000) {
    return `Rs. ${(price / 100000).toFixed(1)} Lac`;
  }
  return `Rs. ${price.toLocaleString()}`;
};
