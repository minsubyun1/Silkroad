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
import { fetchBookmarkStatus, toggleBookmark } from '@/src/api/bookmark';

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: number };

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [bookmarkCount, setBookmarkCount] = useState<number>(0);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await fetchProductDetail(id);
        setProduct(res.data);
        setBookmarkCount(res.data.bookmarkCount);

        const bookmarkRes = await fetchBookmarkStatus(id);
        setIsBookmarked(bookmarkRes.data.isBookmarked);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getProductData();
  }, [id]);

  const handleToggleBookmark = async () => {
    try {
      const res = await toggleBookmark(id);
      const newStatus = res.data;
      setIsBookmarked(newStatus);
      setBookmarkCount((prev: number) => (newStatus ? prev + 1 : prev - 1));
    } catch (err) {
      console.error('찜 토글 실패:', err);
    }
  };

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
        <ProductDetailContent 
          product={product} 
          isBookmarked = {isBookmarked}
          bookmarkCount = {bookmarkCount}
          onToggleBookmark = {handleToggleBookmark}
        />
      </ScrollView>
      <ProductChatBanner 
        price = {product.price}
        isBookmarked={isBookmarked}
        onToggleBookmark = {handleToggleBookmark}
      />
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