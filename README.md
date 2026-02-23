# 🚗 CS Motors - Premium Car Dealership App

A beautiful and elegant React Native Expo app for a car dealership. Features a luxurious dark theme with gold accents, smooth animations, and a modern UI.

## ✨ Features

- **Home Screen** - Featured cars, quick stats, brand filters, hero banner
- **Car Inventory** - Full car listing with search, filters, and sorting
- **Car Details** - Detailed car info with specs, features, WhatsApp & call integration
- **Favorites** - Save and manage your favorite cars
- **Contact** - Contact form, location, WhatsApp, call, and social links
- **Profile** - Quick actions, app info, and settings

## 🎨 Design

- **Theme**: Luxury Dark Mode
- **Primary Color**: Gold (#D4AF37)
- **Background**: Deep Black (#0A0A0A)
- **Smooth animations and transitions**
- **Accessible and user-friendly UI**

## 📱 Screens

1. **Home** - Welcome banner, featured cars, brand filters
2. **Inventory** - Car listings with filters
3. **Car Details** - Full specifications and inquiry options
4. **Favorites** - Saved cars
5. **Contact** - Business info and inquiry form
6. **Profile** - User preferences and app info

## 🛠 Tech Stack

- React Native with Expo SDK 54
- React Navigation (Stack + Bottom Tabs)
- Expo Linear Gradient
- Expo Vector Icons (Ionicons)
- React Native Reanimated
- React Native Safe Area Context

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Yarn
- Expo CLI
- Expo Go app (for testing)

### Installation

```bash
# Navigate to project
cd CSMotors

# Install dependencies
yarn install

# Start development server
yarn start
```

### Running on Device

```bash
# Android
yarn android

# iOS
yarn ios

# Web
yarn web
```

## 📦 Building for Production

### Setup EAS Build

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure project
eas build:configure
```

### Build for Play Store

```bash
# Build APK (for testing)
yarn build:android --profile preview

# Build AAB (for Play Store)
yarn build:android --profile production
```

### Build for App Store

```bash
yarn build:ios --profile production
```

## 🏪 Play Store Submission Checklist

- [x] App Icon (512x512)
- [x] Splash Screen
- [x] App Name: CS Motors
- [x] Package Name: com.csmotors.app
- [x] Version Code: 1
- [x] Version Name: 1.0.0
- [ ] Privacy Policy URL
- [ ] Feature Graphic (1024x500)
- [ ] Screenshots (Phone & Tablet)
- [ ] Short Description
- [ ] Full Description

## 📁 Project Structure

```
CSMotors/
├── App.js                 # Main app entry
├── app.json              # Expo config
├── eas.json              # EAS Build config
├── babel.config.js       # Babel config
├── package.json          # Dependencies
├── assets/               # Icons & splash
└── src/
    ├── components/       # Reusable components
    │   ├── CarCard.js
    │   ├── CarListCard.js
    │   ├── SearchBar.js
    │   └── BrandFilter.js
    ├── constants/        # Theme & colors
    │   └── colors.js
    ├── data/            # Sample data
    │   └── cars.js
    ├── navigation/       # Navigation setup
    │   └── AppNavigator.js
    └── screens/          # App screens
        ├── HomeScreen.js
        ├── InventoryScreen.js
        ├── CarDetailsScreen.js
        ├── FavoritesScreen.js
        ├── ContactScreen.js
        └── ProfileScreen.js
```

## 🔧 Configuration

### Update Contact Info

Edit `src/screens/ContactScreen.js`:

```javascript
const CONTACT_INFO = {
  phone: '+92 300 1234567',
  email: 'info@csmotors.pk',
  address: 'Your Address Here',
  whatsapp: '+923001234567',
};
```

### Update Car Data

Edit `src/data/cars.js` to add your own car inventory.

### Update App Info

Edit `app.json`:
- Change `name`, `slug`
- Update `ios.bundleIdentifier`
- Update `android.package`

## 📄 License

MIT License - feel free to use for your business!

## 👨‍💻 Developer

Built with ❤️ for CS Motors

---

**Happy Selling! 🚗✨**
# CSMotors
