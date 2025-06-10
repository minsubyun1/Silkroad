import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ProductItemCard from '@/src/screens/mypage/components/ProductItemCard';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function WishlistScreen() {
  const navigation = useNavigation();
  const dummyData = [
    {
      id: '1',
      title: '아이몽 내한 티켓 5/12',
      price: '₩250,000',
      date: '2024.04.10',
      image: require('../../../assets/images/ticket.png'),
      status: '판매 중',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#222"  />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>마이페이지</Text>
        <View style={{ width: 34 }} /> 
      </View>
      <Text style={styles.title}>나의 찜 목록</Text>
      {dummyData.map((item) => (
        <ProductItemCard
          key={item.id}
          image={item.image}
          title={item.title}
          price={item.price}
          dateLabel="찜한 날짜"
          date={item.date}
          status={item.status as '판매 중' | '판매 완료'}
          showCancelButton
          onCancelPress={() => console.log('찜 취소')}
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