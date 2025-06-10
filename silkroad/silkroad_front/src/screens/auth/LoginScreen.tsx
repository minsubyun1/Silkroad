import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { RootStackParamList } from '../../navigation/types';




export default function LoginScreen() {
    const navigation = useNavigation();
    const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const authNavigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <TouchableOpacity  onPress={() => navigation.goBack()}>
              <Image
                        source={require('../../../assets/images/logo.png')}
                        style={styles.logo}
                      
                      />
            </TouchableOpacity>

            <Text style={styles.label}>아이디</Text>
            <TextInput 
                style={styles.input}
                placeholder='예: silkroad123'
                value={email}
                onChangeText={setEmail}
            />
            <Text style={styles.label}>비밀번호</Text>
            <TextInput 
                style={styles.input}
                placeholder='비밀번호'
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => {
              rootNavigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
              });
            }}
            >
                <Text style={styles.loginButtonText}>로그인</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signupButton} onPress={() => authNavigation.navigate('Signup')}>
                <Text style={styles.signupButtonText}>회원 가입</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.kakaoButton}>
                <Text style={styles.kakaoText}>카카오 로그인</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: '#fff' },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom:50,
  },
  label: {
    fontSize: 15,
    marginTop: 12,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#222',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  loginButton: {
    marginTop:50,
    backgroundColor: '#625B52',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 25,
  },
  loginButtonText: { color: 'white', fontWeight: 'bold' },
  signupButton: {
    backgroundColor: '#625B52',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 25,
  },
  signupButtonText: { color: 'white', fontWeight: 'bold', },
  kakaoButton: {
    backgroundColor: '#FEE500',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  kakaoText: { color: '#3C1E1E', fontWeight: 'bold' },
});