import React from 'react';
import AppContent from './src/app-content';
import {StyleSheet} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {color} from './src/utils';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: color['#0C1017'],
  },
};

function App() {
  return (
    <SafeAreaView style={[styles.appSafeAreaView]}>
      <NavigationContainer theme={appTheme}>
        <AppContent />
        <Toast position="bottom" bottomOffset={20} />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appSafeAreaView: {
    flex: 1,
  },
});

export default App;
