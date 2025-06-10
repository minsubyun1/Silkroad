import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

export default function SideDrawer({ navigation }: DrawerContentComponentProps) {
  return (
    <View style={styles.container}>
      {/* 헤더: 로고 + 닫기 버튼 */}
      <View style={styles.header}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
        />
        <TouchableOpacity onPress={() => navigation.closeDrawer()}>
          <Ionicons name="close" size={24} color="#222" />
        </TouchableOpacity>
      </View>

      {/* 메뉴 항목 */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} 
        onPress={() => {
          navigation.closeDrawer(); 
          navigation.navigate('MainTab', {
            screen: 'MyPageTab', // 탭 이름
            params: {
              screen: 'MyPage', // 스택 안의 화면
            },
          });
        }}>
          <Text style={styles.menuText}>마이페이지</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => console.log('채팅 목록')}>
          <Text style={styles.menuText}>채팅 목록</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => console.log('AI 라밀과 대화')}>
          <Text style={styles.menuText}>AI 라밀과 대화</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => console.log('로그아웃')}>
          <Text style={styles.menuText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    marginTop:12,
    width: 65,
    height: 45,
  },
  menuContainer: {
    marginTop: 40,
  },
  menuItem: {
    marginBottom: 30,
  },
  menuText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
});