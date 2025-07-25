import React, {useEffect} from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './src/screens/common/LoadingScreen';



export default function App() {

  useEffect(() => {
    const clearAsyncStorage = async () => {
      try {
        await AsyncStorage.clear(); // 모든 저장된 항목 제거
        console.log('✅ AsyncStorage cleared on app start');
      } catch (e) {``
        console.error('❌ Failed to clear AsyncStorage', e);
      }
    };

    clearAsyncStorage();
  }, []);

  
  return (
      <AuthProvider>
        <RootNavigator />
        
      </AuthProvider>

  )
}

