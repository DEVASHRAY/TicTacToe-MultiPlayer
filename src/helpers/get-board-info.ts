import {USER_TYPE} from '../enums';

export default function getBoardInfo({
  boardData,
  isBothUsersActive,
  disableMove,
  gameOver,
}: any) {
  let text = '';
  let descriptionText = '';
  let isDraw: any = [];

  console.log('getBoardInfo', gameOver, boardData);

  if (Object.entries(boardData || {}).length <= 0) {
    text = 'Loading';
  } else if (!isBothUsersActive) {
    text = 'Player 2 Disconnected';
    descriptionText = 'Waiting for other player to join...';
  } else if (gameOver && !disableMove) {
    text = 'You Won';
    descriptionText = 'Congratulations';
  } else if (gameOver && disableMove) {
    text = 'You Lost!';
    descriptionText = 'Better luck next time';
  } else if (!disableMove) {
    text = 'Your Turn';
  } else if (disableMove) {
    text = 'Please Wait';
  }

  if (!gameOver) {
    isDraw = Object.values(boardData || {}).filter(
      item => item === USER_TYPE.USER_O || item === USER_TYPE.USER_X,
    );

    if (isDraw.length === 9) {
      text = 'Draw!';
      descriptionText = `It's a draw`;
    }
  }

  return {
    text,
    descriptionText,
    isDraw,
  };
}
