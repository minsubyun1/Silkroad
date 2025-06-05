import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import HomeHeader from '@/src/components/home/HomeHeader';
import ProductDetailContent from '@/src/components/product/ProductDetailContent';
import ProductChatBanner from '../components/product/ProductChatBanner';

export default function ProductDetailScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeHeader />
      <ScrollView>
        <ProductDetailContent />
      </ScrollView>
      <ProductChatBanner />
    </SafeAreaView>
  );
}