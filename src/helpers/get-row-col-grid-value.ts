import {noOfColumns} from '../constants/board-constant';
import {GetRowColGridValueInterface} from '../interface/app-interface';

export function getRowColGridValue({id}: GetRowColGridValueInterface) {
  const rowIndex = Math.floor(id / noOfColumns);
  const colIndex = id % noOfColumns;

  const key = `${rowIndex}${colIndex}`;

  return {
    rowIndex,
    colIndex,
    key,
  };
}
