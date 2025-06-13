import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const dummyData = [
  { id: '1', title: '나이키 에어포스', price: '100,000원', image: require('../../../../assets/images/shoes.png'), likes: 12, date: '3일 전' },
  { id: '2', title: '아이묭 내한 티켓', price: '250,000원', image: require('../../../../assets/images/ticket.png'), likes: 197, date: '1주일 전' },
  { id: '3', title: '맥북 프로', price: '1,500,000원', image: require('../../../../assets/images/macbook.png'), likes: 2, date: '2일 전' },
  { id: '4', title: '베켄바우어 트랙탑', price: '120,000원', image: require('../../../../assets/images/cloth.png'), likes: 98, date: '4일 전' },
];


const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 48) / 2;

export default function MainProductList() {
  const navigation = useNavigation<any>();
  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>신길동에서{"\n"}어떤 보물을 찾고 계신가요?</Text>

      {/* 검색영역 */}
      <View style={styles.searchWrapper}>
        <Text style={styles.categoryText}>중고거래</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="검색어를 입력해주세요"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.searchIconWrap}>
          <Ionicons name="search" size={18} color="#222" />
        </TouchableOpacity>
      </View>
      <Text style={styles.categorySelection}>전자기기, 가전제품, 옷, 화장품</Text>

      <Text style={styles.title}>오늘의 추천 상품</Text>

      <FlatList
        data={dummyData}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('ProductDetail', { id:item.id })}
          style={styles.card}>
            <Image source={item.image} style={styles.image} />

            <View style={styles.metaRow}>
              <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.productLikes}>♡ {item.likes}</Text>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.productDate}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: 'white',
    paddingBottom: 90,
  },
  searchWrapper: {
    marginTop: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  categoryText: {
    color: '#222222',
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 14,
  },
  categorySelection: {
    color: '#999',
    marginLeft:90,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 4,
  },
  searchIconWrap: {
    marginLeft: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222222',
    marginTop: 16,
    marginBottom: 12,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: cardWidth,
    backgroundColor: 'transparent',
    borderRadius: 0,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    resizeMode: 'cover',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222222',
    flexShrink: 1,
    marginRight: 4,
  },
  productLikes: {
    fontSize: 12,
    color: 'red',
  },
  price: {
    fontSize: 13,
    color: '#222222',
    fontWeight: 'bold',
  },
  productDate: {
    fontSize: 12,
    color: '#6B6B6B',
  },
});
