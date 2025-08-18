import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { fetchChats, fetchSellChats, fetchBuyChats } from '../../api/chat';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

const getRelativeDate = (dateString: string) => {
  return dayjs(dateString).fromNow(); // ex: "3시간 전"
};

type ChatRoom = {
  roomId: number;
  opponentImageUrl: string;
  opponentName: string;
  lastMessage: string;
  lastMessageTime: string;
};

export default function ChatListScreen() {
  const navigation = useNavigation<any>();
  const [selectedFilter, setSelectedFilter] = useState<'전체' | '판매' | '구매'>('전체');
  const [chatList, setChatList] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      let data: ChatRoom[] = [];
      if (selectedFilter === '전체') {
        data = await fetchChats();
      } else if (selectedFilter === '판매') {
        data = await fetchSellChats();
      } else if (selectedFilter === '구매') {
        data = await fetchBuyChats();
      }
      setChatList(data);
    } catch (error) {
      console.error('채팅 목록 불러오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedFilter]);

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

      {/* 필터 버튼 */}
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

      {loading ? (
        <ActivityIndicator size="large" color="#888" style={{ marginTop: 30 }} />
      ) : (
        <>
          {chatList.map((chat) => (
            <TouchableOpacity
              key={chat.roomId}
              style={styles.chatItem}
              onPress={() =>
                navigation.navigate('ChatDetail', { roomId: chat.roomId })
              }
            >
              <Image source={{ uri: chat.opponentImageUrl }} style={styles.avatar} />
              <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                  <Text style={styles.chatName}>{chat.opponentName}</Text>
                  <Text style={styles.chatTime}>{getRelativeDate(chat.lastMessageTime)}</Text>
                </View>
                <Text style={styles.chatMessage} numberOfLines={1}>
                  {chat.lastMessage}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </>
      )}
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
    marginTop: 10,
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
    marginTop: 15,
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
    marginTop: 8,
  },
  chatName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
  },
  chatTime: {
    marginLeft: 5,
    fontSize: 12,
    color: '#999',
  },
  chatMessage: {
    marginTop: 5,
    fontSize: 13,
    color: '#555',
  },
});