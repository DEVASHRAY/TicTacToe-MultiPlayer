import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Grid} from './';
import {maxBoardSize, noOfRows} from '../../constants/board-constant';
import {GetBoxTypeProps} from '../interface/board-interface';
import {BOARD_GRID_TYPE, USER_TYPE} from '../../enums/board-grid-type';
import {getRowColGridValue} from '../../helpers/get-row-col-grid-value';
import {checkWinner} from '../../helpers/winner';

const initialGridData = Array.from(
  {length: noOfRows * noOfRows},
  (_, index) => {
    const {key} = getRowColGridValue({id: index});

    return {
      [key]: BOARD_GRID_TYPE.EMPTY,
    };
  },
);

export default function Board() {
  const [boardData, setBoardData] =
    useState<Array<{[key: string]: BOARD_GRID_TYPE | USER_TYPE}>>(
      initialGridData,
    );
  const [currentMove, setCurrentMove] = useState<USER_TYPE>(USER_TYPE.USER_X);
  const [gameOver, setGameOver] = useState(false);

  const handleGridPress = ({cellData, id}: GetBoxTypeProps) => {
    const {key} = getRowColGridValue({id});

    let gridValue = boardData[id][key];

    if (gameOver || gridValue !== BOARD_GRID_TYPE.EMPTY) {
      return;
    }

    let updatedBoardData = boardData.map(item => {
      if (key in item) {
        return {[key]: currentMove};
      }
      return item;
    });

    setBoardData(updatedBoardData);

    let isWinner = checkWinner({updatedBoardData, currentMove});

    setCurrentMove(prev =>
      prev === USER_TYPE.USER_X ? USER_TYPE.USER_O : USER_TYPE.USER_X,
    );

    if (isWinner) {
      setGameOver(isWinner);
      console.log('Won', currentMove);
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {boardData?.map((cellData, id) => (
          <Grid
            key={JSON.stringify(cellData)}
            id={id}
            boxType={getBoxType({cellData, id})}
            cellData={cellData}
            handleGridPress={handleGridPress}
          />
        ))}
      </View>
    </View>
  );
}

const getBoxType = ({cellData, id}: GetBoxTypeProps) => {
  const {key} = getRowColGridValue({id});

  if (cellData[key] === USER_TYPE.USER_X) {
    return USER_TYPE.USER_X;
  } else if (cellData[key] === USER_TYPE.USER_O) {
    return USER_TYPE.USER_O;
  }
  return BOARD_GRID_TYPE.EMPTY;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    width: maxBoardSize,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
