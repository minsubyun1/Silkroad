import React, { useEffect, useState } from 'react';
import { View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity, } from 'react-native';
import MainProductList from './components/MainProductList';
import { fetchAllProducts, fetchSearchProducts } from '@/src/api/product';
import BottomBanner from '@/src/screens/main/components/BottomBanner';
import HomeHeader from '@/src/screens/main/components/HomeHeader';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const categoryMap = {
  "디지털 기기": "DIGITAL",
  "의류": "FASHION",
  "뷰티": "BEAUTY",
  "스포츠": "SPORTS",
  "기타": "ETC",
} as const;

export default function HomeScreen() {
  const [keyword, setKeyword] = useState('');
  type CategoryKey = keyof typeof categoryMap;
  const [category, setCategory] = useState<CategoryKey | "">(""); // ""은 전체
  const [products, setProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // 최초 전체 상품 조회
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetchAllProducts();
      setProducts(res.data); // 응답 구조에 따라 수정
    };
    fetchProducts();
  }, []);

  // 검색 버튼 클릭 시
  const handleSearch = async () => {
    
    setIsSearching(true);
    const categoryEnum = category ? categoryMap[category as CategoryKey] : undefined;
    console.log('검색 요청:', { keyword, categoryEnum });
    const res = await fetchSearchProducts({ keyword, category: categoryEnum });
    setProducts(res.data);
  };

  // 검색어/카테고리 초기화 시 전체 상품 다시 조회
  const handleReset = async () => {
    setIsSearching(false);
    setKeyword('');
    setCategory('');
    const res = await fetchAllProducts();
    setProducts(res.data);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HomeHeader />
        <View style = {styles.middle}> 
          <Text style={styles.title}>신길동에서{"\n"}어떤 보물을 찾고 계신가요?</Text>

          {/* 검색영역 */}
          <View style={styles.searchWrapper}>
            <Text style={styles.categoryText}>중고거래</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="검색어를 입력해주세요"
              placeholderTextColor="#999"
              value={keyword}
              onChangeText={setKeyword}
            />
            <TouchableOpacity style={styles.searchIconWrap} onPress={handleSearch}>
              <Ionicons name="search" size={18} color="#222" />
            </TouchableOpacity>
            {isSearching && (
              <TouchableOpacity onPress={handleReset}>
                <Text style={{ marginLeft: 8, color: 'blue' }}>돌아가기</Text>
              </TouchableOpacity>
            )}
          </View>
        
          <View style={{ flexDirection: 'row', marginVertical: 10 }}>
              {(Object.keys(categoryMap) as CategoryKey[]).map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setCategory(cat)}
                  style={{
                    padding: 8,
                    backgroundColor: category === cat ? '#EBDDCD' : '#eee',
                    borderRadius: 8,
                    marginRight: 8,
                  }}
                >
                <Text>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.title}>오늘의 추천 상품</Text>
        </View>
        <MainProductList products={products} />
      </View>
      <BottomBanner />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      
      backgroundColor: 'white',
      paddingBottom: 90,
    },
    middle: {
      paddingHorizontal:16,
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
    safeArea: {
      flex: 1,
      backgroundColor: '#F5F0E9', // 원하는 배경색
      position: 'relative'
    },
    scrollContent: {
      flexGrow: 1,
    },
});