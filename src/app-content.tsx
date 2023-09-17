import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {color} from './utils/color';
import {Room} from './screens/room/ui';

export default function AppContent() {
  return (
    <View style={[styles.appContainer]}>
      <Room />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: color['#0C1017'],
  },
});
