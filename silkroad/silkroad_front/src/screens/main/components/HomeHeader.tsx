import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

export default function HomeHeader() {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../../../assets/images/logo.png')}
        style={styles.logo}
      />

      <TouchableOpacity style={styles.locationContainer}>
        <Ionicons name="location-sharp" size={16} color="white" style={styles.locationIcon} />
        <Text style={styles.locationText}>신길동</Text>
        <Ionicons name="chevron-down" size={14} color="white" style={styles.chevron} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Ionicons name="menu" size={24} color="#625B52" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#F4EFE9', // 피그마 상단 배경색
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
  logo: {
    width: 70,
    height: 60,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#625B52',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginLeft: 160
  },
  locationIcon: {
    marginRight: 4,
  },
  locationText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  chevron: {
    marginLeft: 4,
  },
  menuButton: {
    padding: 4,
  },
});
