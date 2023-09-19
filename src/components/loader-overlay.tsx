import React from 'react';
import Modal from 'react-native-modal';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {color} from '../utils';
import {LoaderOverlayProps} from '../interface/app-interface';

export default function LoaderOverlay({
  visible,
  overlayColor,
  children,
  customIndicator,
  indicatorStyle,
  textStyle,
  activityIndicatorColor = color['#FFFFFF'],
  activityIndicatorSize = 'large',
  textContent = '',
}: LoaderOverlayProps) {
  const renderDefaultContent = () => {
    return (
      <View style={styles.background}>
        {customIndicator || (
          <ActivityIndicator
            color={activityIndicatorColor}
            size={activityIndicatorSize}
            style={[styles.activityIndicator, {...indicatorStyle}]}
          />
        )}
        <View style={[styles.textContainer, {...indicatorStyle}]}>
          <Text style={[styles.textContent, textStyle]}>{textContent}</Text>
        </View>
      </View>
    );
  };

  return (
    <Modal
      supportedOrientations={['landscape', 'portrait']}
      isVisible={visible}
      backdropColor={color['#FFFFFF']}
      backdropOpacity={0.15}
      animationIn="slideInUp"
      animationOut="slideOutDown">
      <View
        style={[styles.container, {backgroundColor: overlayColor}]}
        key={`spinner_${Date.now()}`}>
        {children || renderDefaultContent()}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {},
  activityIndicator: {},
  textContainer: {},
  textContent: {
    fontSize: 20,
    fontWeight: 'bold',
    color: color['#FFFFFF'],
    marginTop: 8,
  },
});
