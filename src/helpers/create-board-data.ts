import {noOfRows} from '../constants/board-constant';
import {BOARD_GRID_TYPE} from '../enums';
import {getRowColGridValue} from './get-row-col-grid-value';

export default function createBoardData() {
  const initialGridData = Array.from(
    {length: noOfRows * noOfRows},
    (_, index) => {
      const {key} = getRowColGridValue({id: index});

      return {
        [key]: BOARD_GRID_TYPE.EMPTY,
      };
    },
  ).reduce((acc, curr) => ({...acc, ...curr}), {});

  return initialGridData;
}
