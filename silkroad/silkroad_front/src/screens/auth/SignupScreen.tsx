import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Silkroad</Text>
      <TextInput style={styles.input} placeholder="예: silkroad123" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="비밀번호" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="비밀번호 확인" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      <TextInput style={styles.input} placeholder="예: 홍길동" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="예: 강남구" value={district} onChangeText={setDistrict} />
      <TextInput style={styles.input} placeholder="예: 양녕로 22길 대박주택 104호" value={address} onChangeText={setAddress} />

      <TouchableOpacity style={styles.photoButton}>
        <Text style={styles.photoText}>사진 선택</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>작성 완료</Text>
      </TouchableOpacity>

      <Text style={styles.loginText} onPress={() => navigation.goBack()}>
        이미 계정이 있으신가요? 로그인하기
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: '#fff' },
  logo: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  photoButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 24,
    alignItems: 'center',
  },
  photoText: { color: '#625B52' },
  submitButton: {
    backgroundColor: '#625B52',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitText: { color: 'white', fontWeight: 'bold' },
  loginText: { marginTop: 20, textAlign: 'center', color: '#625B52' },
});
