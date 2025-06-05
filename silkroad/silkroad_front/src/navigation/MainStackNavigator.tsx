// src/navigation/MainStackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/src/screens/main/HomeScreen';
import ProductDetailScreen from '@/src/screens/ProductDetailScreen';
import ProductRegisterScreen from '@/src/screens/ProductRegisterScreen';

export type MainStackParamList = {
  Home: undefined;
  ProductDetail: { id: string };
  ProductRegister: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="ProductRegister" component={ProductRegisterScreen} />
    </Stack.Navigator>
  );
}