import {CheckWinnerProps} from '../interface/app-interface';

const winnerMoves = [
  ['00', '01', '02'],
  ['10', '11', '12'],
  ['20', '21', '22'],
  ['00', '10', '20'],
  ['01', '11', '21'],
  ['02', '12', '22'],
  ['00', '11', '22'],
  ['02', '11', '20'],
];

export function checkWinner({
  updatedBoardData,
  currentMove,
}: CheckWinnerProps): boolean {
  let isWinner: boolean = false;



  winnerMoves.forEach((item: string[]) => {
    let isWinnerFound = checkIfKeysMatch(item, currentMove, updatedBoardData);

    if (isWinnerFound) {
      isWinner = true;
    }
  });

  return isWinner;
}

function checkIfKeysMatch(
  keys: string[],
  currentMove = '',
  updatedBoardData = {},
) {
  return keys.every(key => {
   
    return updatedBoardData[key] === currentMove;
  });
}
