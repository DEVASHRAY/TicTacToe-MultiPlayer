import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {Grid} from './';
import {maxBoardSize, noOfRows} from '../../../constants/board-constant';
import {GetBoxTypeProps} from '../interface/board-interface';
import {BOARD_GRID_TYPE, USER_TYPE} from '../../../enums/board-grid-type';
import {getRowColGridValue} from '../../../helpers/get-row-col-grid-value';
import {checkWinner} from '../../../helpers/winner';
import {useRoute} from '@react-navigation/native';
import {AppNavigatorScreenRoute} from '../../../types/app-types';
import {color} from '../../../utils';
import {Copy} from '../../../svg';
import {firestore} from '../../../firebase';
import {FIREBASE_COLLECTION} from '../../../enums';
import boardVM from '../board-vm/board-vm';

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
  const {params: {roomId = '', userType} = {}} =
    useRoute<AppNavigatorScreenRoute<'GameBoard'>>();

  const {showLoader, updateMove, fetchBoardData} = boardVM();

  const [boardData, setBoardData] = useState<{
    [key: string]: BOARD_GRID_TYPE | USER_TYPE;
  }>({});
  const [currentMove, setCurrentMove] = useState<USER_TYPE>(USER_TYPE.USER_X);
  const [gameOver, setGameOver] = useState(false);
  const [infoText, setInfoText] = useState('Loading');

  const disableMove = userType !== currentMove;

  useEffect(() => {
    const subscriber = firestore()
      .collection(FIREBASE_COLLECTION.ROOM)
      .doc(roomId)
      .onSnapshot(documentSnapshot => {
        const {
          boardData: {
            currentMove: updatedCurrentMove = BOARD_GRID_TYPE.EMPTY,
            moves = {},
          } = {},
        } = documentSnapshot?.data() || {};

        let isWinner = checkWinner({updatedBoardData: moves, currentMove});

        if (isWinner) {
          setGameOver(isWinner);
          setBoardData(moves);
          return;
        }

        setCurrentMove(updatedCurrentMove);
        setBoardData(moves);
      });

    return () => subscriber();
  }, [roomId]);

  useEffect(() => {
    let text = '';

    if (Object.entries(boardData || {}).length <= 0) {
      text = 'Loading';
    } else if (gameOver && !disableMove) {
      text = 'You Won';
    } else if (gameOver && disableMove) {
      text = 'You Lost';
    } else if (!disableMove) {
      text = 'Your Turn';
    } else if (disableMove) {
      text = 'Please Wait';
    }

    let isDraw = Object.values(boardData || {}).filter(
      item => item === USER_TYPE.USER_O || item === USER_TYPE.USER_X,
    );
    if (isDraw.length === 9) {
      text = 'Draw!';
    }

    setInfoText(text);
  }, [boardData]);

  const handleGridPress = async ({id}: GetBoxTypeProps) => {
    const {key} = getRowColGridValue({id});

    let gridValue = boardData[key];

    if (gameOver || gridValue !== BOARD_GRID_TYPE.EMPTY) {
      return;
    }

    let isMoveUpdated = await updateMove({
      currentMove,
      gridKey: key,
      roomId: roomId,
    });

    setBoardData(prev => ({...prev, [key]: currentMove}));
  };

  const roomIdView = useMemo(() => {
    return (
      <View style={[styles.roomIdView]}>
        <Text
          numberOfLines={1}
          style={[styles.roomIdText]}>{`Room id : ${roomId}`}</Text>
        <TouchableOpacity style={[styles.roomIdCopyButton]}>
          <Copy />
        </TouchableOpacity>
      </View>
    );
  }, [roomId]);

  return (
    <View style={styles.container}>
      <View>{roomIdView}</View>

      <View style={[styles.gameBoardView]}>
        <View style={{minHeight: 80, marginTop: -60}}>
          <Text style={{marginTop: 0}}>{infoText || ''}</Text>
        </View>

        <View style={styles.board}>
          {Object.entries(boardData || {})?.map(([key, value], id) => (
            <Grid
              key={JSON.stringify(key)}
              id={id}
              boxType={getBoxType({
                boardData: boardData,
                id,
                disableMove,
              })}
              handleGridPress={handleGridPress}
              disableMove={disableMove}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const getBoxType = ({boardData, id, disableMove}: GetBoxTypeProps) => {
  const {key} = getRowColGridValue({id});

  if (boardData[key] === USER_TYPE.USER_X) {
    return USER_TYPE.USER_X;
  } else if (boardData[key] === USER_TYPE.USER_O) {
    return USER_TYPE.USER_O;
  } else if (disableMove) {
    return BOARD_GRID_TYPE.DISABLED;
  }
  return BOARD_GRID_TYPE.EMPTY;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameBoardView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    width: maxBoardSize,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  roomIdView: {
    backgroundColor: color['#212835'],
    borderRadius: 4,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    width: maxBoardSize,
  },
  roomIdText: {
    flex: 1,
    marginLeft: 16,
    color: color['#FFFFFF'],
  },
  roomIdCopyButton: {
    // flex: 0.4,
    width: 60,
    height: 46,
    backgroundColor: color['#575757'],
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
