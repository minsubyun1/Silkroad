import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ModalSelector from 'react-native-modal-selector';
import { useNavigation } from '@react-navigation/native';

export default function ProfileEditScreen() {
  const [nickname, setNickname] = useState('');
  const [region, setRegion] = useState('강남구'); // 기본값
  const [profileImage, setProfileImage] = useState('https://example.com/profile.png'); // 기존 프로필 이미지 URL

  const navigation = useNavigation();
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('권한 필요', '이미지를 선택하려면 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri); // UI에서 즉시 반영
    }
  };

  const handleSave = () => {
    Alert.alert('저장 완료', '프로필이 수정되었습니다.');

    navigation.goBack();
  };

  const regionOptions = [
    { key: '강남구', label: '강남구' },
    { key: '서초구', label: '서초구' },
    { key: '마포구', label: '마포구' },
    { key: '신길동', label: '신길동' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: profileImage }} style={styles.profileImage} />

      <Text style={styles.label}>이미지 변경</Text>
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Text style={styles.imagePickerText}>사진 선택</Text>
      </TouchableOpacity>

      <Text style={styles.label}>닉네임 수정 입력창</Text>
      <TextInput
        style={styles.input}
        placeholder="예: 윤민섭의 충성스런 강아지"
        value={nickname}
        onChangeText={setNickname}
      />

      <Text style={styles.label}>지역변경</Text>
      <ModalSelector
        data={regionOptions}
        initValue={region}
        onChange={(option) => setRegion(option.label)}
        cancelText="취소"
        accessible={false}
      >
        <View style={styles.selector}>
          <Text style={styles.selectorText}>{region}</Text>
          <Text>▼</Text>
        </View>
      </ModalSelector>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>저장하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 170,
    paddingHorizontal: 16,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 20,
    color: '#222',
  },
  imagePicker: {
    marginTop: 8,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    width: 90,
    alignItems: 'center',
  },
  imagePickerText: {
    fontSize: 14,
    color: '#444',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 8,
  },
  selector: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    width: '100%',
  },
  selectorText: {
    fontSize: 14,
    color: '#222',
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: '#625B52',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});