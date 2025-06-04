import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import HomeHeader from '@/src/components/home/HomeHeader';
import MainProductList from '@/src/components/home/MainProductList';
import BottomBanner from '@/src/components/home/BottomBanner';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeHeader />
      <ScrollView>
        <MainProductList />
      </ScrollView>
      <BottomBanner />
    </SafeAreaView>
  );
}