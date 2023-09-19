import {useState} from 'react';
import {
  FetchBoardDataProps,
  UpdateMoveProps,
} from '../interface/board-interface';
import {firestore} from '../../../firebase';
import {FIREBASE_COLLECTION, USER_TYPE} from '../../../enums';
import {errorToast} from '../../../helpers/toast';

export default function boardVM() {
  const [showLoader, setShowLoader] = useState(false);

  const fetchBoardData = async ({roomId}: FetchBoardDataProps) => {
    let boardData: Array<{}> = [];

    setShowLoader(true);
    try {
      const boardDataRes = await firestore()
        .collection(FIREBASE_COLLECTION.ROOM)
        .doc(roomId)
        .get();

      const {_data}: any = boardDataRes || {};

      console.log('boardDataRes', _data);
    } catch (error) {
      errorToast({
        toastTitle: 'Something went wrong.Please try after sometime.',
      });
      console.log('Error in fetchBoardData Fn', error);
    } finally {
      setShowLoader(false);
    }

    return boardData;
  };

  const updateMove = async ({
    roomId,
    gridKey,
    currentMove,
  }: UpdateMoveProps) => {
    setShowLoader(true);
    let isMoveUpdated = false;
    try {
      let isMoveUpdatedRes = await firestore()
        .collection(FIREBASE_COLLECTION.ROOM)
        .doc(roomId)
        .update({
          [`boardData.currentMove`]:
            currentMove === USER_TYPE.USER_X
              ? USER_TYPE.USER_O
              : USER_TYPE.USER_X,
          [`boardData.moves.${gridKey}`]: currentMove,
        });

      console.log('isMoveUpdatedRes', isMoveUpdatedRes);

      isMoveUpdated = true;
    } catch (err) {
      console.log('Err in updateMove Fn', err);
      isMoveUpdated = false;
    } finally {
      setShowLoader(false);
    }

    return isMoveUpdated;
  };

  return {
    showLoader,
    updateMove,
    fetchBoardData,
  };
}
