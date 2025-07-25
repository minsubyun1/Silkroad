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
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface Props {
  product: any;
}

export default function ProductDetailContent({ product }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const screenWidth = Dimensions.get('window').width;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
    setCurrentIndex(index);
  };

  const getRelativeDate = (dateString: string) => {
    return dayjs(dateString).fromNow();
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
          {product.imageUrls && product.imageUrls.length > 0 ? (
            product.imageUrls.map((img: string, idx: number) => (
              <Image key={idx} source={{ uri: img }} style={styles.image} />
            ))
          ) : (
            <Image source={require('../../../../assets/images/shoes.png')} style={styles.image} />
          )}
        </ScrollView>
        {/* 인디케이터 점 */}
        <View style={styles.dotsContainer}>
          {(product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls : [1]).map(
            (_: any, idx: number) => (
              <View
                key={idx}
                style={[styles.dot, currentIndex === idx && styles.activeDot]}
              />
            )
          )}
        </View>
      </View>

      {/* 상품 상세 설명 영역 */}
      <View style={styles.metaSection}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{Number(product.price).toLocaleString()}원</Text>
        <Text style={styles.date}>
          {getRelativeDate(product.createdAt)} · ♡ {product.bookmarkCount}
        </Text>
        <Text style={styles.description}>{product.description || '상품 설명이 없습니다.'}</Text>

        <View style={styles.sellerInfo}>
          <Image
            source={
              product.sellerProfileImage
                ? { uri: product.sellerProfileImage }
                : require('../../../../assets/images/avatar1.png')
            }
            style={styles.avatar}
          />
          <View>
            <Text style={styles.sellerName}>
              {product.sellerName || product.sellerUsername || '판매자'}
            </Text>
            <Text style={styles.sellerLocation}>{product.sellerLocation || '위치 정보 없음'}</Text>
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
    height: 220,
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
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
});