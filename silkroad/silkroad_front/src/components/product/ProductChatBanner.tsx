import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function ProductChatBanner() {
  return (
    <View style={styles.container}>
      <Text style={styles.likes}>♡</Text>
      <Text style={styles.price}>100,000원</Text>
      <TouchableOpacity style={styles.button}>
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