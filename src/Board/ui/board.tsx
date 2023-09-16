import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {CSSProperties} from 'react';
import {BoxStyle, GetBoxTypeProps} from '../interface/board-interface';
import {color, rgba} from '../../utils/color';

export default function Board() {
  return (
    <TouchableOpacity
      style={[styles.boardBox, getBoxStyle({boxType: 'USER_X'})]}>
      <Text>X</Text>
    </TouchableOpacity>
  );
}

const getBoxStyle = ({boxType}: GetBoxTypeProps): BoxStyle => {
  switch (boxType) {
    case 'USER_X':
      return {
        borderColor: color['#2475C5'],
        backgroundColor: rgba['rgba(36, 117, 197, 0.20)'],
      };
    case 'USER_O':
      return {
        borderColor: color['#E45651'],
        backgroundColor: rgba['rgba(228, 86, 81, 0.20));'],
      };
    case 'DISABLED':
      return {
        borderColor: color['#12161F'],
        backgroundColor: color['#12161F'],
      };
    default:
      return {
        borderColor: color['#212835'],
        backgroundColor: color['#212835'],
      };
  }
};

const styles = StyleSheet.create({
  boardBox: {
    width: 112,
    height: 112,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
