import {BOARD_GRID_TYPE, USER_TYPE} from '../../enums/board-grid-type';

export interface GetBoxStyleProps {
  boxType:
    | USER_TYPE.USER_X
    | USER_TYPE.USER_O
    | BOARD_GRID_TYPE.DISABLED
    | BOARD_GRID_TYPE.EMPTY;
}

export interface BoxStyle {
  borderColor: string;
  backgroundColor: string;
}

export interface GetBoxTypeProps {
  cellData: {
    [key: string]:
      | USER_TYPE.USER_X
      | USER_TYPE.USER_O
      | BOARD_GRID_TYPE.DISABLED
      | BOARD_GRID_TYPE.EMPTY;
  };
  id: number;
}
export interface GridProps extends GetBoxTypeProps {
  boxType:
    | USER_TYPE.USER_X
    | USER_TYPE.USER_O
    | BOARD_GRID_TYPE.DISABLED
    | BOARD_GRID_TYPE.EMPTY;
  handleGridPress({}: GetBoxTypeProps): void;
}
