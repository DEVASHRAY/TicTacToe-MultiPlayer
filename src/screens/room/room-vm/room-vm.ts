import uuid from 'react-native-uuid';
import {firestore} from '../../../firebase';
import {FIREBASE_COLLECTION, USER_TYPE} from '../../../enums';
import {useState} from 'react';
import createBoardData from '../../../helpers/create-board-data';
import {JoinRoomParams} from '../interface/room-interface';
import {errorToast} from '../../../helpers/toast';

export default function roomVM() {
  const [showLoader, setShowLoader] = useState(false);

  const joinRoom = async ({roomId}: JoinRoomParams) => {
    let doesRoomExist = false;
    setShowLoader(true);

    try {
      const seacrhRoomIdres = await firestore()
        .collection(FIREBASE_COLLECTION.ROOM)
        .doc(roomId)
        .get();

      const {_exists, _data}: any = seacrhRoomIdres || {};

      const {isUser1active, isUser2active} = _data?.boardData || {};

      doesRoomExist = await new Promise((resolve, reject) => {
        setTimeout(async () => {
          await firestore()
            .collection(FIREBASE_COLLECTION.ROOM)
            .doc(roomId)
            .update({
              [`boardData.isUser2active`]: true,
            });
          if (isUser1active && isUser2active) {
            reject(false);
            return;
          }
          resolve(_exists || false);
        }, 1500);
      });
    } catch (err) {
      console.log('Error in joinRoom Fn', err);
      return doesRoomExist;
    } finally {
      setShowLoader(false);
    }

    return doesRoomExist;
  };

  const createRoom = async () => {
    let roomId = null;
    setShowLoader(true);

    try {
      let generateRoomID = uuid.v4();

      let initialMoves = createBoardData();

      const roomCreationRes = await firestore()
        .collection(FIREBASE_COLLECTION.ROOM)
        .doc(String(generateRoomID))
        .set({
          boardData: {
            currentMove: USER_TYPE.USER_X,
            playAgain: false,
            moves: initialMoves,
            isUser1active: true,
            isUser2active: false,
          },
        });

      console.log('Room created successfully', roomCreationRes);

      roomId = await new Promise(resolve => {
        setTimeout(() => {
          resolve(String(generateRoomID));
        }, 2000);
      });
    } catch (err: unknown) {
      errorToast({
        toastTitle: 'Unable to create room at the moment.',
        toastDescription: 'Please try after sometime.',
      });
      console.log('Error in createRoom Function', err);
    } finally {
      setShowLoader(false);
    }

    return roomId;
  };

  return {
    showLoader,
    createRoom,
    joinRoom,
  };
}
