import AsyncStorage from "@react-native-async-storage/async-storage";

export const logout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('username');
}