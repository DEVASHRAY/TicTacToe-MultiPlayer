import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {color} from './utils/color';
import {Room} from './screens/room/ui';
import AppNavigation from './navigation/app-navigation';

export default function AppContent() {
  return (
    <>
      <AppNavigation />
    </>
  );
}
