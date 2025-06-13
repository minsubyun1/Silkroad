import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { uploadProfileImage } from '@/src/api/upload';
import { singup } from '@/src/api/auth';
import { CommonActions } from '@react-navigation/native';

export default function SignupScreen() {
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickProfileImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('권한 필요', '프로필 이미지를 선택하려면 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsMultipleSelection: false,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
  if (password !== confirmPassword) {
    Alert.alert('비밀번호 불일치', '비밀번호가 일치하지 않습니다.');
    return;
  }

  if(!profileImage) {
    Alert.alert('프로필 이미지 누락', '프로필 이미지를 선택해주세요.');
    return;
  }

  try {
    const uploadedUrl = await uploadProfileImage({
      uri: profileImage,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });

    console.log('업로드된 이미지 URL:', uploadedUrl);

    await singup({
      username,
      password,
      name,
      location: region,
      profileImageUrl: uploadedUrl,
    });

    console.log('회원가입 요청 바디:',{
      username,
      password,
      name,
      location: region,
      profileImage: uploadedUrl,
    });

    Alert.alert('회원가입 완료!');
    rootNavigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Welcome'}],
      })
    );
  } catch (err) {
    console.log(err);
    Alert.alert('회원가입 실패', '입력값 또는 이미지 업로드를 확인해주세요.')
  }
};
  return (
    <ScrollView style={styles.container}>

      <Text style={styles.firstText}>아이디</Text>
      <TextInput
        style={styles.input}
        placeholder="예: silkroad123"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>비밀번호</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.label}>비밀번호 확인</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Text style={styles.label}>이름</Text>
      <TextInput
        style={styles.input}
        placeholder="예: 홍길동"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>지역 선택</Text>
      <TextInput
        style={styles.input}
        placeholder="예: 강남구"
        value={region}
        onChangeText={setRegion}
      />

      <Text style={styles.label}>상세주소</Text>
      <TextInput
        style={styles.input}
        placeholder="예: 양녕로 22길 대박주택 104호"
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>프로필 이미지</Text>
      <TouchableOpacity onPress={pickProfileImage} style={styles.imagePicker}>
        <Text style={styles.imagePickerText}>사진 선택</Text>
      </TouchableOpacity>

      {profileImage && (
        <Image source={{ uri: profileImage }} style={styles.previewImage} />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>작성 완료</Text>
      </TouchableOpacity>

      <Text style={styles.loginText} onPress={() => navigation.goBack()}>
        이미 계정이 있으신가요? 로그인하기
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff'},
  
  firstText:{
    marginTop:70,
    fontSize:15,
    marginBottom: 7,
    fontWeight: 'bold',
    color: '#222',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  
  label: {
    fontSize: 15,
    marginTop: 12,
    marginBottom: 7,
    fontWeight: 'bold',
    color: '#222',
  },
  imagePicker: {
    marginTop: 8,
    backgroundColor: '#ccc',
    padding: 10,
    width:90,
    opacity: 0.8,
    borderRadius: 6,
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#444',
  },
  previewImage: {
    marginTop: 10,
    width: 80,
    height: 80,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  submitButton: {
    marginTop:10,
    backgroundColor: '#625B52',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitText: { color: 'white', fontWeight: 'bold' },
  loginText: { marginTop: 20, textAlign: 'center', color: '#625B52' },
});
