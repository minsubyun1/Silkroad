import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStackNavigator from './AuthStackNavigator';
import DrawerNavigator from "./DrawerNavigator";
import { RootStackParamList } from '../navigation/types';
import LoadingScreen from "../screens/common/LoadingScreen";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  
  const {isLoggedIn} = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Loading" component={LoadingScreen} /> */}
        {isLoggedIn ? (
          <Stack.Screen name="Main" component={DrawerNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStackNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}