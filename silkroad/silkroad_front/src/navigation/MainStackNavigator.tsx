// src/navigation/MainStackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/src/screens/main/HomeScreen';
import ProductDetailScreen from '@/src/screens/main/ProductDetailScreen';
import ProductRegisterScreen from '@/src/screens/main/ProductRegisterScreen';
import ChatDetailScreen from '../screens/chat/ChatDetailScreen';

export type MainStackParamList = {
  Home: undefined;
  ProductDetail: { id: string };
  ProductRegister: undefined;
  ChatDetail: {productId: number};
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="ProductRegister" component={ProductRegisterScreen} />
      <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
    </Stack.Navigator>
  );
}