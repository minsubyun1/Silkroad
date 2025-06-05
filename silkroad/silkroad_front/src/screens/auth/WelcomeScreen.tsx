import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';

export default function WelcomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

    return (
        <View style={styles.container}>
            <Image
                    source={require('../../../assets/images/logo.png')}
                    style={styles.logo}
            />
            <Text style={styles.title}>실크로드에 오신 것을 환영합니다.</Text>
            <View style={styles.menuSection}>
                <TouchableOpacity style={styles.menuButton} 
                        onPress={() => {
                        navigation.navigate('Login')
                        }}>
                        <Text style={styles.menuText}>로그인하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuButton} 
                        onPress={() => {
                        navigation.navigate('Signup')
                        }}>
                        <Text style={styles.menuText}>회원가입</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
        container: { flex: 1, alignItems: 'center'},
        logo: {
            marginTop:100,
            width: 200,
            height: 200,
        },
        title: { fontSize: 18, marginBottom: 100, fontWeight: 'bold', color:'#625B52'},
        buttonWrapper: { gap: 12 },
        menuSection: {
            gap: 25,
        },
        menuButton: {
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