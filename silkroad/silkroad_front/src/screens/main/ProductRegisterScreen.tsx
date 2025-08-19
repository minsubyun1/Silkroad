import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ModalSelector from 'react-native-modal-selector';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { registerProduct } from '@/src/api/product';
import { getMyProfile } from '@/src/api/auth';

export default function ProductRegisterScreen() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('DIGITAL');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const navigation = useNavigation();

  const [profile, setProfile] = useState<{
        username: string;
        name: string;
        location: string;
        profileImageUrl: string;
    } | null>(null);

  const pickImages = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('권한 필요', '사진 라이브러리 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 4,
      quality: 0.7,
    });

    if (!result.canceled && result.assets) {
      const selected = result.assets.map((asset) => asset.uri);
      setImages(selected.slice(0, 4)); // 최대 4장
    }
  };

  const categoryOptions = [
  { key: 'DIGITAL', label: '디지털 기기' },
  { key: 'FASHION', label: '의류' },
  { key: 'BEAUTY', label: '뷰티' },
  { key: 'SPORTS', label: '스포츠' },
  { key: 'ETC', label: '기타' },

  
];



  const handleSubmit = async() => {
    if (!title || !price || !description || images.length === 0) {
      Alert.alert('입력 오류', '모든 항목을 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', selectedCategory);

    images.forEach((uri, index) => {
      const fileName = uri.split('/').pop() || `image${index}.jpg`;
      formData.append('imageFiles', {
        uri,
        type: 'image/jpeg',
        name: fileName,
      } as any);
    });

    try {
      await registerProduct(formData);
      Alert.alert('등록 성공', '상품이 등록되었습니다.');
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert('등록 실패', '다시 시도해주세요.');
    }
  }

  useEffect(() => {
      const fetchUser = async () => {
        const res = await getMyProfile();
        setProfile(res);
      };
      fetchUser();
    }, []);

  return ( 
    <ScrollView style={styles.container}>
      <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="#222" />
              </TouchableOpacity>
              <Text style={styles.headerText}>{profile?.name}</Text>
              <View style={{ width: 24 }} /> {/* 오른쪽 여백 맞추기 */}
      </View>

      <Text style={styles.label}>제목</Text>
      <TextInput
        style={styles.input}
        placeholder="글 제목"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>가격</Text>
      <TextInput
        style={styles.input}
        placeholder="₩ 가격을 입력해주세요."
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>카테고리</Text>
      <ModalSelector
        data={categoryOptions}
        initValue="카테고리 선택"
        onChange={(option) => setSelectedCategory(option.key)}
        cancelText="취소"
      >
        <View style={styles.selector}>
          <Text style={styles.selectorText}>
            {categoryOptions.find(c => c.key === selectedCategory)?.label ?? '카테고리 선택'}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#999" />
        </View>
      </ModalSelector>



      <Text style={styles.label}>상품 설명</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="게시글 내용을 작성해주세요."
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={5}
      />

      <Text style={styles.label}>상품 이미지</Text>
      <TouchableOpacity onPress={pickImages} style={styles.imagePicker}>
        <Text style={styles.imagePickerText}>이미지 선택하기</Text>
      </TouchableOpacity>

      <ScrollView horizontal style={styles.imagePreviewContainer}>
        {images.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.previewImage} />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>작성 완료</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop:50,
    marginBottom: 30
  },
  headerText:{
    fontSize:18,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 4,
    fontWeight: 'bold',
    color: '#222',
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
    selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 8,
    backgroundColor: '#f8f8f8',
  },
  selectorText: {
    fontSize: 14,
    color: '#222',
  },
  imagePicker: {
    marginTop: 8,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#444',
  },
  imagePreviewContainer: {
    marginTop: 10,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
  },
  pickerWrapper:{
    borderWidth:1,
    borderColor: '#ddd',
    borderRadius: 8,
    transform: [{ scaleY: 0.9 }],
  },
  pickCategory: {
    fontSize: 14,
  },
  submitButton: {
    marginTop: 24,
    backgroundColor: '#625B52',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});