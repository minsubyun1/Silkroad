import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import ProductItemCard from '@/src/screens/mypage/components/ProductItemCard';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { fetchMyBookmarks } from '@/src/api/bookmark';



export default function WishlistScreen() {
  const navigation = useNavigation();
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const res = await fetchMyBookmarks();
        setBookmarks(res);
      } catch (err) {
        console.error('찜 목록 조회 실패:', err);
      } finally {
        setLoading(false);
      }
    };
    loadBookmarks();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>마이페이지</Text>
        <View style={{ width: 34 }} />
      </View>

      <Text style={styles.title}>나의 찜 목록</Text>

      {bookmarks.map((item) => (
        <ProductItemCard
          key={item.productId}
          image={{ uri: item.imageUrl }}
          title={item.title}
          price={`${Number(item.price).toLocaleString()}원`}
          dateLabel="찜한 날짜"
          date={item.bookmarkedAt}
          status={item.isSold ? '판매 완료' : '판매 중'}
          showCancelButton
          onCancelPress={() => console.log('찜 취소 기능 필요')}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height:1000,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    marginTop:60,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    marginLeft:10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  title: {
    marginLeft:135,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    color:'#625B52'
  },
});