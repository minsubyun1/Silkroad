import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createChatRoom, getChatRoomDetail, getChatMessages, sendChatMessage, markAsComplete } from '@/src/api/chat';
import { formatDateLabel, formatTime } from '../../utils/date';

export default function ChatDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { productId, roomId: initialRoomId } = route.params as { productId?: number; roomId?: number };

  const [roomId, setRoomId] = useState<number | null>(initialRoomId ?? null);
  const [chatRoom, setChatRoom] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        let resolvedRoomId = initialRoomId;
        if (!resolvedRoomId && productId) {
          resolvedRoomId = await createChatRoom(productId);
          if (resolvedRoomId !== undefined) {
            setRoomId(resolvedRoomId);
          }
        }

        if (resolvedRoomId) {

          const roomDetail = await getChatRoomDetail(resolvedRoomId);
          setChatRoom(roomDetail);

          if(roomDetail.sold) {
            Alert.alert(
              '알림',
              '이미 판매 완료된 상품입니다.',
              [{text: '확인', onPress: () => navigation.goBack() }]
            )
          }

          const msgList = await getChatMessages(resolvedRoomId);
          setMessages(msgList);
        }
      } catch (err) {
        console.error('채팅방 초기화 실패:', err);
      }
    };
    init();
  }, [productId, initialRoomId]);

  const isSeller = chatRoom?.seller;

  const handleSendMessage = async () => {
    if (!roomId || !message.trim()) return;
    try {
      await sendChatMessage(roomId, message);
      setMessage('');
      const msgList = await getChatMessages(roomId);
      setMessages(msgList);
    } catch (err) {
      console.log('메시지 전송 실패:', err);
    }
  };

  const handleMarkAsComplete = async () => {
    Alert.alert(
      '판매 완료 처리',
      '정말로 이 상품을 판매 완료 처리하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '확인',
          style: 'destructive',
          onPress: async () => {
            if (!roomId) return;
            try {
              await markAsComplete(roomId);
              await sendChatMessage(roomId, '판매가 완료되었습니다.');
              const updatedMessages = await getChatMessages(roomId);
              setMessages(updatedMessages);
              const updatedRoom = await getChatRoomDetail(roomId); // 최신 상태 조회
              if (updatedRoom.sold) {
                Alert.alert(
                  '알림',
                  '이미 판매 완료된 상품입니다.',
                  [{ text: '확인', onPress: () => navigation.goBack() }]
                );
              }
            } catch (err) {
              console.log('판매 완료 처리 실패:', err);
            }
          },
        },
      ]
    );
  };

  return (
      <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* 헤더 */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color="#222" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{chatRoom?.opponentName}</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* 상품 요약 정보 */}
          <View style={styles.productInfoWrapper}>
            <View style={styles.productInfo}>
              <Image source={{ uri: chatRoom?.productImageUrl }} style={styles.productImage} />
              <View>
                <Text style={styles.productTitle}>{chatRoom?.productTitle}</Text>
                <Text style={styles.productPrice}>
                  {chatRoom?.productPrice.toLocaleString()}원
                </Text>
              </View>
            </View>
          </View>

          {/* 채팅 메시지 리스트 */}
          <ScrollView contentContainerStyle={styles.chatWrapper}>
            {messages.length > 0 &&
              (() => {
                let lastDate = '';
                return messages.map((msg, index) => {
                  const currentDate = formatDateLabel(msg.sentAt);
                  const showDate = currentDate !== lastDate;
                  lastDate = currentDate;

                  return (
                    <View key={index}>
                      {showDate && (
                        <View style={styles.dateWrapper}>
                          <Text style={styles.dateText}>{currentDate}</Text>
                        </View>
                      )}
                      {msg.me ? (
                        <View style={styles.myMessageWrapper}>
                          <Text style={styles.time}>{formatTime(msg.sentAt)}</Text>
                          <View style={styles.myMessage}>
                            <Text style={styles.myMessageText}>{msg.message}</Text>
                          </View>
                        </View>
                      ) : (
                        <View style={styles.otherMessageWrapper}>
                          <Image
                            source={{ uri: msg.senderProfileImage }}
                            style={styles.avatar}
                          />
                          <View style={styles.bubbleWithTime}>
                            <View style={styles.otherMessage}>
                              <Text style={styles.otherMessageText}>{msg.message}</Text>
                            </View>
                            <Text style={styles.timeLeft}>{formatTime(msg.sentAt)}</Text>
                          </View>
                        </View>
                      )}
                    </View>
                  );
                });
              })()}
          </ScrollView>

          {/* 입력창 + 옵션 버튼 */}
          <View>
            <View style={styles.inputWrapper}>
              <TouchableOpacity
                onPress={() => setShowOptions(!showOptions)}
                style={{ marginRight: 10 }}
              >
                <Ionicons name={showOptions ? 'close' : 'add'} size={24} color="#625B52" />
              </TouchableOpacity>
              <TextInput
                placeholder="메세지 보내기"
                style={styles.input}
                value={message}
                onChangeText={setMessage}
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                <Ionicons name="send" size={20} color="#625B52" />
              </TouchableOpacity>
            </View>

            {/* 판매자만 보이는 옵션 */}
            {showOptions && isSeller && (
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => {
                    Alert.alert(
                      '판매 처리',
                      '정말로 이 상품을 판매 완료 처리하시겠습니까?',
                      [
                        { text: '취소', style: 'cancel' },
                        {
                          text: '확인',
                          onPress: handleMarkAsComplete,
                        },
                      ]
                    );
                  }}
                >
                  <Text style={styles.optionText}>판매 처리</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    marginTop: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  productInfoWrapper: {
    marginTop: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  productInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  productImage: { width: 60, height: 60, borderRadius: 8 },
  productTitle: { fontSize: 13, color: '#222', fontWeight: '500', marginBottom: 6 },
  productPrice: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  optionsContainer: {
    bottom:0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 5,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#EEE',
    borderRadius: 8,
  },
  optionText: {
    fontSize: 16,
  },
  completeButton: {
    marginTop: 10,
    backgroundColor: '#625B52',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  completeButtonText: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  dateWrapper: { alignItems: 'center', marginVertical: 14, marginBottom: 20 },
  dateText: { fontSize: 12, color: '#888' },
  chatWrapper: { paddingHorizontal: 16, paddingBottom: 90 },
  otherMessageWrapper: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 23, gap: 8 },
  bubbleWithTime: { flexDirection: 'row', alignItems: 'flex-end' },
  timeLeft: { fontSize: 11, color: '#888', marginLeft: 6, alignSelf: 'flex-end' },
  avatar: { width: 40, height: 40, borderRadius: 16 },
  otherMessage: { backgroundColor: '#eee', padding: 10, borderRadius: 16, maxWidth: 250, marginRight: 4 },
  otherMessageText: { fontSize: 14, color: '#222' },
  myMessageWrapper: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 23 },
  myMessage: { backgroundColor: '#F6E4D7', padding: 10, borderRadius: 16, maxWidth: 250, marginRight: 4 },
  myMessageText: { fontSize: 14, color: '#222' },
  time: { fontSize: 11, color: '#888', marginTop: 4, marginHorizontal: 4 },
  inputWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    fontSize: 14,
  },
  sendButton:{
    marginLeft:5,
  }
});
