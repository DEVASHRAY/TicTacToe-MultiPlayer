import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {color} from '../utils/color';
import {ButtonProps} from '../interface/app-interface';

export default function Button({
  title,
  buttonStyle,
  buttonTitleStyle,
  ...props
}: ButtonProps) {
  const buttonStyles = Array.isArray(buttonStyle) ? buttonStyle : [buttonStyle];
  const buttonTitleStyles = Array.isArray(buttonTitleStyle)
    ? buttonTitleStyle
    : [buttonTitleStyle];

  return (
    <TouchableOpacity style={[styles.button, ...buttonStyles]} {...props}>
      <Text style={[styles.buttonTitle, ...buttonTitleStyles]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color['#ADADAD'],
    overflow: 'hidden',
    borderRadius: 6,
  },
  buttonTitle: {
    fontSize: 16,
    color: color['#ADADAD'],
    fontWeight: '700',
  },
});
