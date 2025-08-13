import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface ProductItemCardProps {
    image: any;
    title: string;
    price: string;
    dateLabel: string;
    date: string;
    likes?: number;
    status: '판매 중' | '판매 완료';
    showCancelButton?: boolean;
    onCancelPress?: () => void;
}

export default function ProductItemCard({
    image,
    title,
    price,
    dateLabel,
    date,
    likes,
    status,
    showCancelButton = false,
    onCancelPress,
} : ProductItemCardProps) {
    const isSold = status === '판매 완료';

    const getRelativeDate = (dateString: string) => {
          return dayjs(dateString).fromNow();
      };
    

    return (
        <View style={styles.card}>
            <Image source={image} style={styles.image} />
            <View style={styles.info}>
                <View style={styles.row}>
                <Text style={styles.title}>{title}</Text>
                <View style={[styles.statusBadge, { backgroundColor: isSold ? '#FF6B6B' : '#4CAF50' }]}>
                    <Text style={styles.statusText}>{status}</Text>
                </View>
                </View>
                <Text style={styles.price}>{price}</Text>
                {likes !== undefined && (
                <Text style={styles.likes}>♡ {likes}</Text>
                )}
                <Text style={styles.date}>{getRelativeDate(date)}</Text>
                {showCancelButton && (
                <TouchableOpacity style={styles.cancelButton} onPress={onCancelPress}>
                    <Text style={styles.cancelText}>취소하기</Text>
                </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    card: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    flexShrink: 1,
  },
  price: {
    fontWeight: 'bold',
    marginVertical: 4,
  },
  likes: {
    fontSize: 12,
    color: '#888',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    color: '#fff',
  },
  cancelButton: {
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#625B52',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  cancelText: {
    color: '#fff',
    fontSize: 12,
  },
});