import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ChatDetailScreen() {
  const navigation = useNavigation();

  const messages = [
    { id: 1, sender: 'other', text: '혹시 지금 판매됐을까요?', time: '오전 3:03' },
    { id: 2, sender: 'me', text: '바로 구매 가능하신가요~?', time: '오전 9:05' },
    { id: 3, sender: 'other', text: '네 멍멍페이 가능합니다.', time: '오전 3:03' },
    { id: 4, sender: 'me', text: '아, 그러면 다시 연락드릴게요요요요요요요요요ㅛ.', time: '오전 9:05' },
    { id: 5, sender: 'other', text: '혹시 애누리 가능할까요..', time: '오전 3:03' },
    { id: 6, sender: 'me', text: '얼마나 원하시는 건데요?', time: '오전 9:05' },
  ];

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>윤브라보</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* 상품 정보 */}
      <View style={styles.productInfoWrapper}>
        <View style={styles.productInfo}>
          <Image
            source={require('../../../assets/images/duck.png')}
            style={styles.productImage}
          />
          <View>
            <Text style={styles.productTitle}>백년애 육풍 무첨가 강아지 간식 오리 슬라이스</Text>
            <Text style={styles.productPrice}>100,000원</Text>
          </View>
        </View>
      </View>

      {/* 날짜 */}
      <View style={styles.dateWrapper}>
        <Text style={styles.dateText}>2025년 4월 30일</Text>
      </View>

      {/* 채팅 목록 */}
      <ScrollView contentContainerStyle={styles.chatWrapper}>
        {messages.map((msg) => (
          msg.sender === 'me' ? (
            <View key={msg.id} style={styles.myMessageWrapper}>
              <Text style={styles.time}>{msg.time}</Text>
              <View style={styles.myMessage}>
                <Text style={styles.myMessageText}>{msg.text}</Text>
              </View>
            </View>
          ) : (
            <View key={msg.id} style={styles.otherMessageWrapper}>
              <Image
                source={require('../../../assets/images/seller.png')}
                style={styles.avatar}
              />
              <View style={styles.bubbleWithTime}>
                <View style={styles.otherMessage}>
                  <Text style={styles.otherMessageText}>{msg.text}</Text>
                </View>
                <Text style={styles.timeLeft}>{msg.time}</Text>
              </View>
            </View>
          )
        ))}
      </ScrollView>

      {/* 입력창 */}
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="메세지 보내기"
          style={styles.input}
        />
        <TouchableOpacity>
          <Ionicons name="send" size={20} color="#625B52" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  productInfoWrapper: {
    marginTop: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 13,
    color: '#222',
    fontWeight: '500',
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  dateWrapper: {
    alignItems: 'center',
    marginVertical: 14,
    marginBottom:20,
  },
  dateText: {
    fontSize: 12,
    color: '#888',
  },
  chatWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 90,
  },
    otherMessageWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 23,
        gap: 8,
    },
    bubbleWithTime: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    },

    timeLeft: {
    fontSize: 11,
    color: '#888',
    marginLeft: 6,
    alignSelf: 'flex-end',
    },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 16,
  },
  otherMessage: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 16,
    maxWidth: 250,
    marginRight: 4,
  },
  otherMessageText: {
    fontSize: 14,
    color: '#222',
  },
  myMessageWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 23,
  },
  myMessage: {
    backgroundColor: '#F6E4D7',
    padding: 10,
    borderRadius: 16,
    maxWidth: 250,
    marginRight: 4,
  },
  myMessageText: {
    fontSize: 14,
    color: '#222',
  },
  time: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
    marginHorizontal: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
    fontSize: 14,
  },
});
