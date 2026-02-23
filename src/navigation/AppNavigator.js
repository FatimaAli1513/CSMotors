import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { COLORS } from '../constants/colors';

// Import Screens
import HomeScreen from '../screens/HomeScreen';
import CarsScreen from '../screens/CarsScreen';
import CarDetailsScreen from '../screens/CarDetailsScreen';
import ContactScreen from '../screens/ContactScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CarsTab"
        component={CarsScreen}
        options={{
          tabBarLabel: 'Cars',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'car-sport' : 'car-sport-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ContactTab"
        component={ContactScreen}
        options={{
          tabBarLabel: 'Contact',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'call' : 'call-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name="Main" component={HomeTabs} />
      <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
