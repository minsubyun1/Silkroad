import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyPageScreen from '../screens/mypage/MyPageScreen';
import ProfileEditScreen from '../screens/mypage/ProfileEditScreen';
import WishlistScreen from '../screens/mypage/WishlistScreen';
import SalesHistoryScreen from '../screens/mypage/SaleHistoryScreen';
import ChatListScreen from '../screens/chat/ChatListScreen';

export type MyPageStackParamList = {
    MyPage: undefined;
    ProfileEdit: undefined;
    Wishlist: undefined;
    SaleHistory: undefined;
    ChatList: undefined;
}

const Stack = createNativeStackNavigator<MyPageStackParamList>();

export default function MyPageStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown : false}}>
            <Stack.Screen name="MyPage" component={MyPageScreen} />
            <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
            <Stack.Screen name="Wishlist" component={WishlistScreen} />
            <Stack.Screen name="SaleHistory" component={SalesHistoryScreen} />
            <Stack.Screen name="ChatList" component={ChatListScreen} />
        </Stack.Navigator>
    );
}