import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

const productImages = [
  require('../../../assets/images/shoes.png'),
  require('../../../assets/images/shoes.png'),
  require('../../../assets/images/shoes.png'),
  require('../../../assets/images/shoes.png'),
];

export default function ProductDetailContent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const screenWidth = Dimensions.get('window').width;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      {/* 이미지 캐러셀 */}
      <View style={styles.carouselContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          ref={scrollRef}
        >
          {productImages.map((img, idx) => (
            <Image key={idx} source={img} style={styles.image} />
          ))}
        </ScrollView>

        {/* 인디케이터 점 */}
        <View style={styles.dotsContainer}>
          {productImages.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                currentIndex === idx && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>

      {/* 상품 상세 설명 영역 */}
      <View style={styles.metaSection}>
        <Text style={styles.title}>나이키 에어포스</Text>
        <Text style={styles.price}>100,000원</Text>
        <Text style={styles.date}>3일 전 · ♡ 12</Text>

        <Text style={styles.description}>
          2025년 발롱도르 후보에 함께 오른 상품으로, 하피냐 형이 이거 신고 발롱도로 탔습니다. {"\n\n"}
          협의받은 사이즈에 싸게 받았는데 사이즈가 안 맞아서 팝니다. 265이신 분 있으시면 강추드립니다. {"\n\n"}
          원래 더 비싸게 팔려다가 저번주 풋살에서 3골 넣어서 10만원으로 책정했습니다.
          {"\n\n"}
          📌 모델명: 나이키 에어포스 (발롱도르 후보)
        </Text>

        <View style={styles.sellerInfo}>
          <Image source={require('../../../assets/images/seller.png')} style={styles.avatar} />
          <View>
            <Text style={styles.sellerName}>라민 야말</Text>
            <Text style={styles.sellerLocation}>신길동</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 120,
    backgroundColor: '#fff',
  },
  carouselContainer: {
    position: 'relative',
  },
  image: {
    width: Dimensions.get('window').width,
    height: 280,
    resizeMode: 'cover',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#222',
  },
  metaSection: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: '#222',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginVertical: 4,
  },
  description: {
    fontSize: 16,
    color: '#444',
    fontWeight: '500',
    lineHeight: 20,
    marginTop: 8,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  sellerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
  },
  sellerLocation: {
    fontSize: 12,
    color: '#666',
  },
});