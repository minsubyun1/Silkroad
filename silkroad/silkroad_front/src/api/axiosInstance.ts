import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.219.102:3002';

const instance = axios.create({
   baseURL: BASE_URL,
   timeout: 15000,
});

// 요청 인터셉터 - accessToken 자동 부착
instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 - 401 에러 처리
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if(error.response?.status === 401) {
            Alert.alert('세션 만료', '로그인이 필요합니다.');
            await AsyncStorage.clear(); // 토큰 제거
            // 전역 상태에서 로그인 false로 바꾸고 RootNavigator 재렌더 필요
        }
        return Promise.reject(error);
    }
)

export default instance;