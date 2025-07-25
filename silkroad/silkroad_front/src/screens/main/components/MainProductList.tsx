import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

const getRelativeDate = (dateString: string) => {
  return dayjs(dateString).fromNow();
};

const formatPrice = (price: number) => {
  return price.toLocaleString();
};

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 48) / 2;

export default function MainProductList({
  products,
  refreshing = false,
  onRefresh,
}: {
  products: any[];
  refreshing?: boolean;
  onRefresh?: () => void;
}) {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 100, }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
            style={styles.card}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />

            <View style={styles.metaRow}>
              <Text style={styles.productTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.productLikes}>♡ {item.bookmarkCount}</Text>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.price}>{formatPrice(item.price)}원</Text>
              <Text style={styles.productDate}>{getRelativeDate(item.createdAt)}</Text>
            </View>
          </TouchableOpacity>
        )}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : undefined
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
    paddingBottom: 90,
  },
  row: {
    gap:10,
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