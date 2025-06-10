import React from 'react';
import { SafeAreaView, ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native';
import HomeHeader from '@/src/screens/main/components/HomeHeader';
import ProductDetailContent from '@/src/screens/main/components/ProductDetailContent';
import ProductChatBanner from './components/ProductChatBanner';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function ProductDetailScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#222" style={{marginLeft:10}} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <ProductDetailContent />
      </ScrollView>
      <ProductChatBanner />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:10,
    marginBottom: 20,
  },
})