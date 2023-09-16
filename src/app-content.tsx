import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Board} from './Board/ui';
import {color} from './utils/color';

export default function AppContent() {
  return (
    <View style={[styles.appContainer]}>
      <Board />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: color['#0C1017'],
  },
});
