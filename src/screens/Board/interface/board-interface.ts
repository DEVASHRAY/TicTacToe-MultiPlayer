import {BOARD_GRID_TYPE, GAME_STATUS, USER_TYPE} from '../../../enums';

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
  boardData?: {
    [key: string]: BOARD_GRID_TYPE | USER_TYPE;
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

export interface UpdateMoveProps {
  roomId: string;
  currentMove: USER_TYPE.USER_X | USER_TYPE.USER_O;
  gridKey: string;
}

export interface FetchBoardDataProps {
  roomId: string;
}

export interface ResetBoardProps {
  roomId: string;
  currentMove: USER_TYPE.USER_X | USER_TYPE.USER_O;
}

export interface UpdateUserActiveStatus {
  roomId: string;
  userType: string;
  activeStatus: boolean;
}

export type GameStatusText =
  | GAME_STATUS.EMPTY
  | GAME_STATUS.LOADING
  | GAME_STATUS.PLEASE_WAIT
  | GAME_STATUS.YOUR_TURN
  | GAME_STATUS.YOU_LOST
  | GAME_STATUS.YOU_WON
  | GAME_STATUS.DRAW;
