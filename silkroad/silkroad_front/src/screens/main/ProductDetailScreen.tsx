import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import ProductDetailContent from './components/ProductDetailContent';
import ProductChatBanner from './components/ProductChatBanner';
import { fetchProductDetail } from '@/src/api/product';
import LoadingScreen from '@/src/screens/common/LoadingScreen';

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: number };

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const res = await fetchProductDetail(id);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getProductDetail();
  }, [id]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={40} color="#999" />
        <Text>상품 정보를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#222" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <ProductDetailContent product={product} />
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
    marginTop: 10,
    marginBottom: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});