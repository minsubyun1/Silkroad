import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';

export default function WelcomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>실크로드에 오신 것을 환영합니다.</Text>
            <View style={styles.buttonWrapper}>
                <Button title="로그인하기" onPress={() => navigation.navigate('Login')} />
                <Button title="회원가입" onPress={() => navigation.navigate('Signup')} />    
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
        container: { flex: 1, justifyContent: 'center', alignItems: 'center'},
        title: { fontSize: 18, marginBottom: 20 },
        buttonWrapper: { gap: 12 },
});