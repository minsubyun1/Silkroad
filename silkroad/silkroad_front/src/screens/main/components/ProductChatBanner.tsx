import { MainStackParamList } from '@/src/navigation/MainStackNavigator';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface Props {
  price: number;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export default function ProductChatBanner({
  price,
  isBookmarked,
  onToggleBookmark
}: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggleBookmark}>
        <Text style={styles.likes}>{isBookmarked ? '♥' : '♡'}</Text>
      </TouchableOpacity>
      <Text style={styles.price}>{Number(price).toLocaleString()}원</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChatDetail')}>
        <Text style={styles.buttonText}>거래 채팅하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#F4EFE9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  likes: {
    color:'red',
    fontSize:20,
  },
  price: {
    marginLeft:10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
  },
  logo: {
    width: 50,
    height: 18,
    resizeMode: 'contain',
  },
  button: {
    marginLeft:150,
    backgroundColor: '#625B52',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
});