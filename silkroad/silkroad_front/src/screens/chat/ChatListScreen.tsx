import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const dummyChats = [
  {
    id: '1',
    name: '킬리안 음바페',
    message: '축구용품 싹 다 팝니다 진짜...',
    time: '2일 전',
    image: require('../../../assets/images/avatar1.png'),
  },
  {
    id: '2',
    name: '데클런 라이스',
    message: '제 감아차기 보셨습니까 ㅋㅋ',
    time: '4일 전',
    image: require('../../../assets/images/avatar2.png'),
  },
  {
    id: '3',
    name: '김원훈',
    message: '2만원에 거래 할래말래',
    time: '10일 전',
    image: require('../../../assets/images/avatar3.png'),
  },
  {
    id: '4',
    name: '윤브라보',
    message: '유기농 오리 슬라이스 10만원에 살게요 제발..',
    time: '14일 전',
    image: require('../../../assets/images/avatar4.jpg'),
  },
  // 필요한 만큼 추가
];

export default function ChatListScreen() {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState<'전체' | '판매' | '구매'>('전체');

  return (
    <ScrollView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.title}>채팅 목록</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* 카테고리 필터 */}
      <View style={styles.filterRow}>
        {['전체', '판매', '구매'].map((label) => (
            <TouchableOpacity
            key={label}
            style={[
                styles.filterButton,
                selectedFilter === label && styles.filterButtonActive
            ]}
            onPress={() => setSelectedFilter(label as '전체' | '판매' | '구매')}
            >
            <Text
                style={[
                styles.filterText,
                selectedFilter === label && styles.filterTextActive
                ]}
            >
                {label}
            </Text>
            </TouchableOpacity>
            ))}
        </View>

      {/* 채팅 목록 */}
      {dummyChats.map((chat) => (
        <TouchableOpacity key={chat.id} style={styles.chatItem}>
          <Image source={chat.image} style={styles.avatar} />
          <View style={styles.chatContent}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatName}>{chat.name}</Text>
              <Text style={styles.chatTime}>{chat.time}</Text>
            </View>
            <Text style={styles.chatMessage} numberOfLines={1}>{chat.message}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  header: {
    marginTop:10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  filterRow: {
  marginTop:15,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  marginBottom: 16,
  gap: 8,
    },

    filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    },

    filterButtonActive: {
    backgroundColor: '#625B52',
    borderColor: '#625B52',
    },

    filterText: {
    fontSize: 13,
    color: '#625B52',
    fontWeight: 'bold',
    },

    filterTextActive: {
    color: '#fff',
    },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    marginTop:8,
  },
  chatName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
  },
  chatTime: {
    marginLeft:5,
    fontSize: 12,
    color: '#999',
  },
  chatMessage: {
    marginTop: 5,
    fontSize: 13,
    color: '#555',
  },
});