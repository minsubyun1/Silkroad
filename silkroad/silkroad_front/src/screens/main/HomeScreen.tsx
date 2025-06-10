import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import HomeHeader from '@/src/screens/main/components/HomeHeader';
import MainProductList from '@/src/screens/main/components/MainProductList';
import BottomBanner from '@/src/screens/main/components/BottomBanner';

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