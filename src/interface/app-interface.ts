import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {BOARD_GRID_TYPE, USER_TYPE} from '../enums/board-grid-type';
import {CSSProperties} from 'react';

export interface GetRowColGridValueInterface {
  id: number;
}

export interface CheckWinnerProps {
  currentMove: USER_TYPE.USER_X | USER_TYPE.USER_O;
  updatedBoardData: {[key: string]: USER_TYPE | BOARD_GRID_TYPE};
}

export interface CellDataInterface {
  cellData: {
    [key: string]:
      | USER_TYPE.USER_X
      | USER_TYPE.USER_O
      | BOARD_GRID_TYPE.DISABLED
      | BOARD_GRID_TYPE.EMPTY;
  };
}

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  buttonStyle?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
  buttonTitleStyle?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
}

export interface LoaderOverlayProps {
  visible: boolean;
  overlayColor?: string;
  children?: React.ReactNode;
  customIndicator?: React.ReactNode;
  activityIndicatorColor?: string;
  activityIndicatorSize?: 'small' | 'large' | number;
  indicatorStyle?: any;
  textContent?: string;
  textStyle?: TextStyle;
}
