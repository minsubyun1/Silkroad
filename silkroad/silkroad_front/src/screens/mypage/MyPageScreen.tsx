import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MyPageStackParamList } from '@/src/navigation/MyPageStackNavigator';
import { getMyProfile } from '@/src/api/auth';
import LoadingScreen from '../common/LoadingScreen';
import { useFocusEffect } from '@react-navigation/native';

export default function MyPageScreen() {
  const navigation = useNavigation();
  const mypageNavigation = useNavigation<NativeStackNavigationProp<MyPageStackParamList>>();

  const [profile, setProfile] = useState<{
    username: string;
    name: string;
    location: string;
    profileImageUrl: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setProfile(data);
      } catch (error) {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();

    return () => {
      isActive = false;
    };
  }, [])
);

  if (loading) {
     return <LoadingScreen />;
  }

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ margin: 20 }}>프로필 정보를 불러올 수 없습니다.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#222" style={{marginLeft:10}} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{profile.name}</Text>
        <View style={{ width: 34 }} /> 
      </View>

      {/* 인삿말 */}
      <Text style={styles.greeting}>{profile.name}님의 실크로드</Text>

      {/* 프로필 카드 */}
      <View style={styles.profileCard}>
        <Image
          source={
            profile.profileImageUrl
              ? { uri: profile.profileImageUrl }
              : require('../../../assets/images/seller.png')
          }
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.location}>{profile.location}</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={() => mypageNavigation.navigate('ProfileEdit')}>
          <Text style={styles.editButtonText}>프로필 수정</Text>
        </TouchableOpacity>
      </View>

      {/* 메뉴 버튼들 */}
      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuButton} onPress={() => mypageNavigation.navigate('SaleHistory')}>
          <Text style={styles.menuText}>판매 내역 보기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}  onPress={() => mypageNavigation.navigate('Wishlist')}>
          <Text style={styles.menuText}>찜 목록 보기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}  onPress={() => mypageNavigation.navigate('ChatList')}>
          <Text style={styles.menuText}>채팅 목록 보기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>개척한 땅 확인하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:10,
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  greeting: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#222',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginLeft:23,
    width:350,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 100,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
  },
  location: {
    marginTop:5,
    fontSize: 12,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editButtonText: {
    fontSize: 12,
    color: '#444',
  },
  menuSection: {
    gap: 25,
  },
  menuButton: {
    marginLeft:22,
    width:350,
    backgroundColor: '#625B52',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  menuText: {
    fontSize:15,
    color: '#fff',
    fontWeight: 'bold',
  },
});