import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '@/src/navigation/MainStackNavigator';

export default function BottomBanner() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  return (
    
    <View style={styles.bannerContainer}>
      <View style={styles.leftSection}>
        <Text style={styles.description}>실크로드의 상인으로 함께해요.{"\n"}지금 바로 등록하기</Text>
        
      </View>
      
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('ProductRegister')}  
      >
        
        <Text style={styles.buttonText}>상품 등록</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    flexDirection: 'row',
    backgroundColor: '#F4EFE9',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  leftSection: {
    flex: 1,
    marginRight: 12,
  },
  description: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222222',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#625B52',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logo: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
