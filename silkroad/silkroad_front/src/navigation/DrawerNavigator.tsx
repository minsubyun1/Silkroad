import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabNavigator from './MainTabNavigator';
import SideDrawer from '../components/drawer/SideDrawer';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <SideDrawer {...props} />}
      screenOptions={{ drawerPosition: 'right', headerShown: false }}
    >
      <Drawer.Screen name="MainTab" component={MainTabNavigator} />
    </Drawer.Navigator>
  );
}