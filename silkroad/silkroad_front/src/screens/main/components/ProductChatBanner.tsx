import React, { useEffect, useState } from 'react';
import { MainStackParamList } from '@/src/navigation/MainStackNavigator';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MyPageStackParamList } from '@/src/navigation/MyPageStackNavigator';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getMyProfile } from '@/src/api/auth';
interface Props {
  productId: number;
  username: string;
  price: number;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export default function ProductChatBanner({
  productId,
  username,
  price,
  isBookmarked,
  onToggleBookmark
}: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const [profile, setProfile] = useState<{
          username: string;
          name: string;
          location: string;
          profileImageUrl: string;
      } | null>(null);

  useEffect(() => {
        const fetchUser = async () => {
          const res = await getMyProfile();
          setProfile(res);
        };
        fetchUser();
  }, []);
  const isMyProduct = profile?.username === username;

  const handlePress = () => {
    if (isMyProduct) {
      navigation.navigate('ChatList');
    } else {
      navigation.navigate('ChatDetail', { productId });
    }
  };
  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={onToggleBookmark}>
      <Text style={styles.likes}>{isBookmarked ? '♥' : '♡'}</Text>
    </TouchableOpacity>
    <Text style={styles.price}>{Number(price).toLocaleString()}원</Text>
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>
        {isMyProduct ? '채팅 목록 보기' : '거래 채팅하기'}
      </Text>
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