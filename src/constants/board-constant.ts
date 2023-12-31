import {width} from '../utils';

const noOfRows = 3;
const noOfColumns = 3;
const spacing = 14;

const maxBoardSize = Math.min(width - 40, 324);

const totalSpacing = (noOfColumns - 1) * spacing;

const gridSize = (maxBoardSize - totalSpacing) / noOfColumns;

export {noOfColumns, noOfRows, maxBoardSize, gridSize, spacing};
