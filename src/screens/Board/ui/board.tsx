import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  AppState,
  AppStateStatus,
  BackHandler,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {DropGameAlert, Grid} from './';
import {maxBoardSize, noOfRows} from '../../../constants/board-constant';
import {GetBoxTypeProps} from '../interface/board-interface';
import {BOARD_GRID_TYPE, USER_TYPE} from '../../../enums/board-grid-type';
import {getRowColGridValue} from '../../../helpers/get-row-col-grid-value';
import {checkWinner} from '../../../helpers/winner';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {AppNavigatorScreenRoute} from '../../../types/app-types';
import {color, width} from '../../../utils';
import {Copy} from '../../../svg';
import {firestore} from '../../../firebase';
import {FIREBASE_COLLECTION} from '../../../enums';
import boardVM from '../board-vm/board-vm';
import {Button} from '../../../components';
import Clipboard from '@react-native-community/clipboard';
import {successToast} from '../../../helpers/toast';
import getBoardInfo from '../../../helpers/get-board-info';

export default function Board() {
  const navigation = useNavigation();

  const {params: {roomId = '', userType} = {}} =
    useRoute<AppNavigatorScreenRoute<'GameBoard'>>();

  const isFocused = useIsFocused();

  const {updateMove, resetBoard, updateUserActiveStatus} = boardVM();

  const [boardData, setBoardData] = useState<{
    [key: string]: BOARD_GRID_TYPE | USER_TYPE;
  }>({});
  const [currentMove, setCurrentMove] = useState<USER_TYPE>(USER_TYPE.USER_X);
  const [gameOver, setGameOver] = useState(false);
  const [infoText, setInfoText] = useState('Loading');
  const [descriptionText, setDescriptionText] = useState('');
  const [isBothUsersActive, setIsBothUsersActive] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleBackPress = () => {
    setModalVisible(true);

    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [isModalVisible]);

  const disableMove = userType !== currentMove || !isBothUsersActive;

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    let activeStatus = false;

    if (nextAppState === 'active' && isFocused) {
      activeStatus = true;
    } else {
      activeStatus = false;
    }

    await updateUserActiveStatus({
      activeStatus: activeStatus,
      roomId,
      userType:
        userType === USER_TYPE.USER_X ? 'isUser1active' : 'isUser2active',
    });
  };

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return async () => {
      await updateUserActiveStatus({
        activeStatus: false,
        roomId,
        userType:
          userType === USER_TYPE.USER_X ? 'isUser1active' : 'isUser2active',
      });
      appStateListener.remove(); // Remove the listener
    };
  }, [isFocused]);

  useEffect(() => {
    const subscriber = firestore()
      .collection(FIREBASE_COLLECTION.ROOM)
      .doc(roomId)
      .onSnapshot(documentSnapshot => {
        const {
          boardData: {
            currentMove: updatedCurrentMove = BOARD_GRID_TYPE.EMPTY,
            moves = {},
            playAgain = false,
            isUser1active = false,
            isUser2active = false,
          } = {},
        } = documentSnapshot?.data() || {};

        setIsBothUsersActive(isUser1active && isUser2active);

        let isWinner = checkWinner({updatedBoardData: moves, currentMove});

        console.log('isWinner', isWinner);

        if (isWinner) {
          setGameOver(isWinner);
          setBoardData(moves);
          return;
        }

        if (playAgain) {
          setGameOver(false);
        }

        setCurrentMove(updatedCurrentMove);
        setBoardData(moves);
      });

    return () => subscriber();
  }, [roomId, currentMove]);

  useEffect(() => {
    const {descriptionText, isDraw, text} = getBoardInfo({
      boardData,
      isBothUsersActive,
      disableMove,
      gameOver,
      currentMove,
    });

    if (isDraw.length === 9) {
      setGameOver(true);
    }

    setInfoText(text);
    setDescriptionText(descriptionText);
  }, [boardData]);

  const handleGridPress = async ({id}: GetBoxTypeProps) => {
    const {key} = getRowColGridValue({id});

    let gridValue = boardData[key];

    if (gameOver || gridValue !== BOARD_GRID_TYPE.EMPTY) {
      return;
    }

    await updateMove({
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
        <TouchableOpacity
          style={[styles.roomIdCopyButton]}
          onPress={() => {
            Clipboard.setString(`${roomId}`);
            successToast({toastDescription: 'Room Id copied to clipboard.'});
          }}>
          <Copy />
        </TouchableOpacity>
      </View>
    );
  }, [roomId]);

  const renderInfoDescription = useMemo(
    () => (
      <>
        <View style={[styles.infoDescriptionView]}>
          <Text
            style={[
              styles.infoTextStyle,
              (infoText === 'You Won' || infoText === 'You Lost!') && {
                color:
                  userType === USER_TYPE.USER_X
                    ? color['#2475C5']
                    : color['#E55F22'],
              },
            ]}>
            {infoText || ''}
          </Text>
          {descriptionText ? (
            <Text style={[styles.descriptionTextStyle]}>
              {descriptionText || ''}
            </Text>
          ) : null}
        </View>
      </>
    ),
    [infoText, descriptionText],
  );

  return (
    <View style={styles.container}>
      <View>{roomIdView}</View>

      <View style={[styles.gameBoardView]}>
        {renderInfoDescription}

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

      <View style={[styles.buttonStyle]}>
        {gameOver && (
          <Button
            title="Play Agian"
            // buttonStyle={styles.buttonStyle}
            onPress={async () => {
              await resetBoard({roomId, currentMove});
            }}
          />
        )}
      </View>

      <DropGameAlert
        isVisible={isModalVisible}
        onCancel={toggleModal}
        onConfirm={() => navigation.goBack()}
      />
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
    paddingVertical: 16,
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
    width: 60,
    height: 46,
    backgroundColor: color['#575757'],
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTextStyle: {
    fontSize: 24,
    color: color['#ADADAD'],
    fontWeight: '500',
    textAlign: 'center',
  },
  descriptionTextStyle: {
    fontSize: 18,
    color: color['#575757'],
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 4,
  },
  infoDescriptionView: {
    // marginBottom: 48,
    minHeight: 100,
  },
  buttonStyle: {
    width: width - 32,
    height: 54,
  },
});
