import {BOARD_GRID_TYPE, USER_TYPE} from '../enums/board-grid-type';

export interface GetRowColGridValueInterface {
  id: number;
}

export interface CheckWinnerProps {
  currentMove: USER_TYPE.USER_X | USER_TYPE.USER_O;
  updatedBoardData: {[key: string]: USER_TYPE | BOARD_GRID_TYPE}[];
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
