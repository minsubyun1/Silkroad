import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MainStackNavigator from './MainStackNavigator';
import MyPageStackNavigator from './MyPageStackNavigator';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: { display: 'none' },
                tabBarActiveTintColor: '#625B52',
                tabBarInactiveBackgroundColor: 'gray',
                tabBarIcon: ({ focused, color, size}) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'MyPage') {
                        iconName = focused ? 'person' : 'person-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />
                },
            })}
        >
            <Tab.Screen name="HomeTab" component={MainStackNavigator} />
            <Tab.Screen name="MyPageTab" component={MyPageStackNavigator} />
        </Tab.Navigator>
    );
}