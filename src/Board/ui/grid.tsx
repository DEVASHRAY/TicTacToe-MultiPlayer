import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  BoxStyle,
  GetBoxStyleProps,
  GridProps,
} from '../interface/board-interface';
import {color, rgba} from '../../utils/color';
import USER_X_SVG from '../../svg/user-x';
import USER_O_SVG from '../../svg/user-o';
import {BOARD_GRID_TYPE, USER_TYPE} from '../../enums/board-grid-type';
import {gridSize, noOfColumns, spacing} from '../../constants/board-constant';

export default function Grid({
  id,
  boxType,
  cellData,
  handleGridPress,
}: GridProps) {
  return (
    <TouchableOpacity
      style={[
        styles.boardBox,
        {width: gridSize, height: gridSize},
        {
          marginRight: id % noOfColumns < noOfColumns - 1 ? spacing : 0,
          marginBottom:
            Math.floor(id / noOfColumns) < noOfColumns - 1 ? spacing : 0,
        },
        getBoxStyle({boxType: boxType}),
      ]}
      onPress={() => handleGridPress({cellData, id})}>
      {renderUserMove({boxType})}
    </TouchableOpacity>
  );
}

const renderUserMove = ({boxType}: GetBoxStyleProps) => {
  switch (boxType) {
    case USER_TYPE.USER_X:
      return <USER_X_SVG />;
    case USER_TYPE.USER_O:
      return <USER_O_SVG />;
    default:
      return <></>;
  }
};

const getBoxStyle = ({boxType}: GetBoxStyleProps): BoxStyle => {
  switch (boxType) {
    case USER_TYPE.USER_X:
      return {
        borderColor: color['#2475C5'],
        backgroundColor: rgba['rgba(36, 117, 197, 0.20)'],
      };
    case USER_TYPE.USER_O:
      return {
        borderColor: color['#E55F22'],
        backgroundColor: rgba['rgba(229, 95, 34, 0.20));'],
      };
    case BOARD_GRID_TYPE.DISABLED:
      return {
        borderColor: color['#12161F'],
        backgroundColor: color['#12161F'],
      };
    default:
      return {
        borderColor: 'rgba(255,255,255,0.3)',
        backgroundColor: color['#212835'],
      };
  }
};

const styles = StyleSheet.create({
  boardBox: {
    aspectRatio: 1,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
