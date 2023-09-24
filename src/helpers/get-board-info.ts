import {GAME_STATUS, USER_TYPE} from '../enums';
import {GameStatusText} from '../screens/Board/interface/board-interface';

export default function getBoardInfo({
  boardData,
  isBothUsersActive,
  disableMove,
  gameOver,
  currentMove,
}: any) {
  let text: GameStatusText = GAME_STATUS.EMPTY;
  let descriptionText = '';
  let isDraw: any = [];

  if (Object.entries(boardData || {}).length <= 0) {
    text = GAME_STATUS.LOADING;
  } else if (!isBothUsersActive) {
    text = GAME_STATUS.PLEASE_WAIT;
    descriptionText = 'Waiting for other player to join...';
  } else if (gameOver && !disableMove) {
    text = GAME_STATUS.YOU_WON;
    descriptionText = 'Congratulations';
  } else if (gameOver && disableMove) {
    text = GAME_STATUS.YOU_LOST;
    descriptionText = 'Better luck next time';
  } else if (!disableMove) {
    text = GAME_STATUS.YOUR_TURN;
  } else if (disableMove) {
    text = GAME_STATUS.PLEASE_WAIT;
    descriptionText = `${
      currentMove === USER_TYPE.USER_X ? 'User X' : 'User O'
    } Move`;
  }

  isDraw = Object.values(boardData || {}).filter(
    item => item === USER_TYPE.USER_O || item === USER_TYPE.USER_X,
  );

  if (
    isDraw.length === 9 &&
    text !== GAME_STATUS.YOU_WON &&
    text !== GAME_STATUS.YOU_LOST
  ) {
    text = GAME_STATUS.DRAW;
    descriptionText = `It's a draw`;
  }

  return {
    text,
    descriptionText,
    isDraw,
  };
}
